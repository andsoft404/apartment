"use client";

import {
  type CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type TourHotspot = {
  id: string;
  targetId: string;
  panoramaX: number;
  panoramaY: number;
  label: string;
};

export type TourScene = {
  id: string;
  name: string;
  imageSrc: string;
  area: string;
  floor: string;
  initialYaw: number;
  initialPitch: number;
  hotspots: TourHotspot[];
};

type PanoramaViewerProps = {
  scenes: TourScene[];
};

type ViewerState = {
  yaw: number;
  pitch: number;
  fov: number;
  isAuto: boolean;
  isDragging: boolean;
  lastX: number;
  lastY: number;
};

type HotspotPosition = {
  id: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  visible: boolean;
};

type ZoomTransition = {
  x: number;
  y: number;
  imageSrc: string;
  panoramaX: number;
  panoramaY: number;
};

type Vec3 = [number, number, number];

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

const normalize = (vector: Vec3) => {
  const length = Math.hypot(vector[0], vector[1], vector[2]) || 1;

  return [vector[0] / length, vector[1] / length, vector[2] / length] as Vec3;
};

const cross = (a: Vec3, b: Vec3) =>
  [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ] as Vec3;

const directionFromAngles = (yaw: number, pitch: number) =>
  normalize([
    Math.cos(pitch) * Math.sin(yaw),
    Math.sin(pitch),
    -Math.cos(pitch) * Math.cos(yaw),
  ]);

const anglesFromPanoramaPoint = (x: number, y: number) => ({
  yaw: Math.PI / 2 - x * Math.PI * 2,
  pitch: Math.PI / 2 - y * Math.PI,
});

const panoramaPointFromAngles = (yaw: number, pitch: number) => ({
  x: (((Math.PI / 2 - yaw) / (Math.PI * 2)) % 1 + 1) % 1,
  y: clamp((Math.PI / 2 - pitch) / Math.PI, 0.18, 0.86),
});

const createShader = (
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) => {
  const shader = gl.createShader(type);

  if (!shader) {
    throw new Error("Unable to create WebGL shader.");
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) ?? "Unknown shader error.";
    gl.deleteShader(shader);
    throw new Error(message);
  }

  return shader;
};

const createProgram = (gl: WebGLRenderingContext) => {
  const vertexShader = createShader(
    gl,
    gl.VERTEX_SHADER,
    `
      attribute vec3 aPosition;
      attribute vec2 aUv;
      uniform mat4 uProjection;
      uniform mat4 uView;
      varying vec2 vUv;

      void main() {
        vUv = aUv;
        gl_Position = uProjection * uView * vec4(aPosition, 1.0);
      }
    `,
  );
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    `
      precision mediump float;
      uniform sampler2D uTexture;
      varying vec2 vUv;

      void main() {
        gl_FragColor = texture2D(uTexture, vUv);
      }
    `,
  );
  const program = gl.createProgram();

  if (!program) {
    throw new Error("Unable to create WebGL program.");
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) ?? "Unknown WebGL error.";
    gl.deleteProgram(program);
    throw new Error(message);
  }

  return program;
};

const createSphere = (radius = 500, widthSegments = 96, heightSegments = 48) => {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let y = 0; y <= heightSegments; y += 1) {
    const v = y / heightSegments;
    const phi = v * Math.PI;

    for (let x = 0; x <= widthSegments; x += 1) {
      const u = x / widthSegments;
      const theta = u * Math.PI * 2;
      const sinPhi = Math.sin(phi);

      positions.push(
        radius * sinPhi * Math.cos(theta),
        radius * Math.cos(phi),
        radius * sinPhi * Math.sin(theta),
      );
      uvs.push(1 - u, v);
    }
  }

  for (let y = 0; y < heightSegments; y += 1) {
    for (let x = 0; x < widthSegments; x += 1) {
      const a = y * (widthSegments + 1) + x;
      const b = a + widthSegments + 1;

      indices.push(a, b, a + 1);
      indices.push(b, b + 1, a + 1);
    }
  }

  return {
    positions: new Float32Array(positions),
    uvs: new Float32Array(uvs),
    indices: new Uint16Array(indices),
  };
};

const perspective = (
  fovRadians: number,
  aspect: number,
  near: number,
  far: number,
) => {
  const f = 1 / Math.tan(fovRadians / 2);
  const nf = 1 / (near - far);

  return new Float32Array([
    f / aspect,
    0,
    0,
    0,
    0,
    f,
    0,
    0,
    0,
    0,
    (far + near) * nf,
    -1,
    0,
    0,
    2 * far * near * nf,
    0,
  ]);
};

const lookAt = (yaw: number, pitch: number) => {
  const forward = directionFromAngles(yaw, pitch);
  const zAxis = normalize([-forward[0], -forward[1], -forward[2]]);
  const xAxis = normalize(cross([0, 1, 0], zAxis));
  const yAxis = cross(zAxis, xAxis);

  return new Float32Array([
    xAxis[0],
    yAxis[0],
    zAxis[0],
    0,
    xAxis[1],
    yAxis[1],
    zAxis[1],
    0,
    xAxis[2],
    yAxis[2],
    zAxis[2],
    0,
    0,
    0,
    0,
    1,
  ]);
};

const getHotspotPositions = (
  hotspots: TourHotspot[],
  state: ViewerState,
  width: number,
  height: number,
) => {
  if (!width || !height) {
    return [];
  }

  const forward = directionFromAngles(state.yaw, state.pitch);
  const right = normalize(cross(forward, [0, 1, 0]));
  const up = normalize(cross(right, forward));
  const aspect = width / height;
  const f = 1 / Math.tan((state.fov * Math.PI) / 360);

  return hotspots.map((hotspot) => {
    const hotspotAngles = anglesFromPanoramaPoint(
      hotspot.panoramaX,
      hotspot.panoramaY,
    );
    const direction = directionFromAngles(
      hotspotAngles.yaw,
      hotspotAngles.pitch,
    );
    const depth = dot(direction, forward);
    const projectedX = depth > 0 ? (dot(direction, right) * f) / aspect / depth : 0;
    const projectedY = depth > 0 ? (dot(direction, up) * f) / depth : 0;
    const x = ((projectedX + 1) / 2) * width;
    const y = ((1 - projectedY) / 2) * height;
    const horizonY = height * 0.48;
    const visible =
      depth > 0.18 &&
      x > -90 &&
      x < width + 90 &&
      y > -90 &&
      y < height + 90;

    return {
      id: hotspot.id,
      x,
      y,
      scale: clamp(0.7 + (y / height - 0.5) * 1.15, 0.58, 1.18),
      rotation: Math.atan2(width / 2 - x, y - horizonY),
      visible,
    };
  });
};

const hotspotSignature = (positions: HotspotPosition[]) =>
  positions
    .map(
      (position) =>
        `${position.id}:${Math.round(position.x)}:${Math.round(
          position.y,
        )}:${Math.round(position.rotation * 100)}:${position.visible ? 1 : 0}`,
    )
    .join("|");

const getTextureSource = (
  image: HTMLImageElement,
  maxTextureSize: number,
): HTMLImageElement | HTMLCanvasElement => {
  if (image.naturalWidth <= maxTextureSize && image.naturalHeight <= maxTextureSize) {
    return image;
  }

  const scale = Math.min(
    maxTextureSize / image.naturalWidth,
    maxTextureSize / image.naturalHeight,
  );
  const canvas = document.createElement("canvas");

  canvas.width = Math.max(1, Math.floor(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.floor(image.naturalHeight * scale));
  canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);

  return canvas;
};

const getSceneFromLocation = (scenes: TourScene[]) => {
  if (typeof window === "undefined") {
    return null;
  }

  const params = new URLSearchParams(window.location.search);
  const mediaIndex = params.get("media-index");
  const mediaName = params.get("media-name") ?? params.get("scene");

  if (mediaIndex) {
    const index = Number(mediaIndex);

    if (Number.isInteger(index) && scenes[index]) {
      return scenes[index];
    }
  }

  if (mediaName) {
    const normalizedName = mediaName.toLowerCase();

    return (
      scenes.find(
        (scene) =>
          scene.id.toLowerCase() === normalizedName ||
          scene.name.toLowerCase() === normalizedName,
      ) ?? null
    );
  }

  return null;
};

const updateSceneInUrl = (scene: TourScene, index: number) => {
  if (typeof window === "undefined") {
    return;
  }

  const url = new URL(window.location.href);

  url.searchParams.set("media-index", String(index));
  url.searchParams.set("media-name", scene.id);
  window.history.replaceState(null, "", url);
};

export default function PanoramaViewer({ scenes }: PanoramaViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const [activeSceneId, setActiveSceneId] = useState(scenes[0]?.id ?? "");
  const activeScene = useMemo(
    () => scenes.find((scene) => scene.id === activeSceneId) ?? scenes[0],
    [activeSceneId, scenes],
  );
  const activeSceneIndex = Math.max(
    scenes.findIndex((scene) => scene.id === activeScene?.id),
    0,
  );
  const stateRef = useRef<ViewerState>({
    yaw: activeScene?.initialYaw ?? 0,
    pitch: activeScene?.initialPitch ?? 0,
    fov: 72,
    isAuto: false,
    isDragging: false,
    lastX: 0,
    lastY: 0,
  });
  const hotspotSignatureRef = useRef("");
  const copyTimerRef = useRef<number | null>(null);
  const zoomTimerRef = useRef<number | null>(null);
  const [hotspotPositions, setHotspotPositions] = useState<HotspotPosition[]>(
    [],
  );
  const [viewerMode, setViewerMode] = useState<"webgl" | "flat">("webgl");
  const [flatView, setFlatView] = useState({
    yaw: activeScene?.initialYaw ?? 0,
    pitch: activeScene?.initialPitch ?? 0,
  });
  const [isReady, setIsReady] = useState(false);
  const [isAuto, setIsAuto] = useState(false);
  const [fov, setFov] = useState(72);
  const [showHotspots, setShowHotspots] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [isVrMode, setIsVrMode] = useState(false);
  const [isGyroEnabled, setIsGyroEnabled] = useState(false);
  const [isSceneMenuOpen, setIsSceneMenuOpen] = useState(false);
  const [isFloorMenuOpen, setIsFloorMenuOpen] = useState(false);
  const [isAudioPromptOpen, setIsAudioPromptOpen] = useState(false);
  const [zoomTransition, setZoomTransition] = useState<ZoomTransition | null>(
    null,
  );

  const syncFlatView = useCallback(() => {
    setFlatView({
      yaw: stateRef.current.yaw,
      pitch: stateRef.current.pitch,
    });
  }, []);

  const goToScene = useCallback(
    (
      sceneId: string,
      options?: { zoomFrom?: { x: number; y: number } },
    ) => {
      const nextScene = scenes.find((scene) => scene.id === sceneId);

      if (!nextScene || nextScene.id === activeScene?.id || zoomTransition) {
        return;
      }

      const nextIndex = Math.max(
        scenes.findIndex((scene) => scene.id === nextScene.id),
        0,
      );

      const applySceneChange = (showLoader: boolean) => {
        if (showLoader) {
          setIsReady(false);
        }

        setIsAuto(false);
        setFlatView({
          yaw: nextScene.initialYaw,
          pitch: nextScene.initialPitch,
        });
        setIsSceneMenuOpen(false);
        setIsFloorMenuOpen(false);
        setActiveSceneId(nextScene.id);
        updateSceneInUrl(nextScene, nextIndex);
      };

      if (options?.zoomFrom && !isVrMode) {
        const nextPreviewPoint = panoramaPointFromAngles(
          nextScene.initialYaw,
          nextScene.initialPitch,
        );

        stateRef.current.isDragging = false;
        setIsAuto(false);
        setZoomTransition({
          x: options.zoomFrom.x,
          y: options.zoomFrom.y,
          imageSrc: nextScene.imageSrc,
          panoramaX: nextPreviewPoint.x,
          panoramaY: nextPreviewPoint.y,
        });

        zoomTimerRef.current = window.setTimeout(() => {
          applySceneChange(false);
          zoomTimerRef.current = window.setTimeout(() => {
            setZoomTransition(null);
            zoomTimerRef.current = null;
          }, 220);
        }, 860);
        return;
      }

      applySceneChange(true);
    },
    [activeScene?.id, isVrMode, scenes, zoomTransition],
  );

  useEffect(() => {
    const sceneFromLocation = getSceneFromLocation(scenes);

    if (sceneFromLocation && sceneFromLocation.id !== activeSceneId) {
      queueMicrotask(() => {
        setIsReady(false);
        setActiveSceneId(sceneFromLocation.id);
      });
    }

    const handlePopState = () => {
      const nextScene = getSceneFromLocation(scenes);

      if (nextScene) {
        setIsReady(false);
        setActiveSceneId(nextScene.id);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, [activeSceneId, scenes]);

  useEffect(() => {
    scenes.forEach((scene) => {
      const image = new Image();
      image.src = scene.imageSrc;
    });
  }, [scenes]);

  useEffect(() => {
    stateRef.current.isAuto = isAuto;
  }, [isAuto]);

  useEffect(() => {
    stateRef.current.fov = fov;
  }, [fov]);

  useEffect(() => {
    if (!activeScene) {
      return;
    }

    hotspotSignatureRef.current = "";
    stateRef.current.yaw = activeScene.initialYaw;
    stateRef.current.pitch = activeScene.initialPitch;
    stateRef.current.isDragging = false;
  }, [activeScene]);

  const updateFov = useCallback((nextFov: number) => {
    const normalizedFov = clamp(nextFov, 42, 88);

    stateRef.current.fov = normalizedFov;
    setFov(normalizedFov);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLSelectElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        stateRef.current.yaw += 0.12;
        syncFlatView();
      }

      if (event.key === "ArrowRight") {
        stateRef.current.yaw -= 0.12;
        syncFlatView();
      }

      if (event.key === "ArrowUp") {
        stateRef.current.pitch = clamp(stateRef.current.pitch + 0.08, -1.25, 1.25);
        syncFlatView();
      }

      if (event.key === "ArrowDown") {
        stateRef.current.pitch = clamp(stateRef.current.pitch - 0.08, -1.25, 1.25);
        syncFlatView();
      }

      if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        updateFov(stateRef.current.fov - 6);
      }

      if (event.key === "-") {
        event.preventDefault();
        updateFov(stateRef.current.fov + 6);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [syncFlatView, updateFov]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || !activeScene) {
      return;
    }

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: true,
      powerPreference: "high-performance",
    });

    if (!gl) {
      let animationFrame = 0;
      let lastFrame = performance.now();

      queueMicrotask(() => {
        setViewerMode("flat");
        setIsReady(true);
      });

      const updateHotspots = () => {
        const positions = getHotspotPositions(
          activeScene.hotspots,
          stateRef.current,
          canvas.clientWidth,
          canvas.clientHeight,
        );
        const nextSignature = hotspotSignature(positions);

        if (nextSignature !== hotspotSignatureRef.current) {
          hotspotSignatureRef.current = nextSignature;
          setHotspotPositions(positions);
        }
      };

      const tick = (now: number) => {
        const delta = Math.min((now - lastFrame) / 1000, 0.05);
        lastFrame = now;

        if (stateRef.current.isAuto && !stateRef.current.isDragging) {
          stateRef.current.yaw += delta * 0.06;
          syncFlatView();
        }

        updateHotspots();
        animationFrame = requestAnimationFrame(tick);
      };

      const observer = new ResizeObserver(updateHotspots);
      observer.observe(canvas);
      updateHotspots();
      animationFrame = requestAnimationFrame(tick);

      return () => {
        cancelAnimationFrame(animationFrame);
        observer.disconnect();
      };
    }

    setViewerMode("webgl");

    let animationFrame = 0;
    let lastFrame = performance.now();
    let lastHotspotFrame = 0;
    let hasTexture = false;
    let isCurrentScene = true;
    const program = createProgram(gl);
    const geometry = createSphere();
    const positionLocation = gl.getAttribLocation(program, "aPosition");
    const uvLocation = gl.getAttribLocation(program, "aUv");
    const projectionLocation = gl.getUniformLocation(program, "uProjection");
    const viewLocation = gl.getUniformLocation(program, "uView");
    const textureLocation = gl.getUniformLocation(program, "uTexture");
    const positionBuffer = gl.createBuffer();
    const uvBuffer = gl.createBuffer();
    const indexBuffer = gl.createBuffer();
    const texture = gl.createTexture();

    gl.useProgram(program);
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.DEPTH_TEST);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, geometry.positions, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, geometry.uvs, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(uvLocation);
    gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geometry.indices, gl.STATIC_DRAW);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.uniform1i(textureLocation, 0);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

    };

    const render = () => {
      resize();
      gl.clearColor(0.02, 0.02, 0.018, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      if (!hasTexture) {
        return;
      }

      const drawScene = (
        viewportX: number,
        viewportY: number,
        viewportWidth: number,
        viewportHeight: number,
        yawOffset = 0,
      ) => {
        const aspect = viewportWidth / Math.max(viewportHeight, 1);
        const projectionMatrix = perspective(
          (stateRef.current.fov * Math.PI) / 180,
          aspect,
          0.1,
          1000,
        );
        const viewMatrix = lookAt(
          stateRef.current.yaw + yawOffset,
          stateRef.current.pitch,
        );

        gl.viewport(viewportX, viewportY, viewportWidth, viewportHeight);
        gl.useProgram(program);
        gl.uniformMatrix4fv(projectionLocation, false, projectionMatrix);
        gl.uniformMatrix4fv(viewLocation, false, viewMatrix);
        gl.drawElements(
          gl.TRIANGLES,
          geometry.indices.length,
          gl.UNSIGNED_SHORT,
          0,
        );
      };

      if (isVrMode) {
        const halfWidth = Math.floor(canvas.width / 2);

        drawScene(0, 0, halfWidth, canvas.height, -0.025);
        drawScene(halfWidth, 0, canvas.width - halfWidth, canvas.height, 0.025);
      } else {
        drawScene(0, 0, canvas.width, canvas.height);
      }
    };

    const updateHotspots = (now: number) => {
      if (now - lastHotspotFrame < 55) {
        return;
      }

      lastHotspotFrame = now;

      const positions = getHotspotPositions(
        activeScene.hotspots,
        stateRef.current,
        canvas.clientWidth,
        canvas.clientHeight,
      );
      const nextSignature = hotspotSignature(positions);

      if (nextSignature !== hotspotSignatureRef.current) {
        hotspotSignatureRef.current = nextSignature;
        setHotspotPositions(positions);
      }
    };

    const tick = (now: number) => {
      const delta = Math.min((now - lastFrame) / 1000, 0.05);
      lastFrame = now;

      if (stateRef.current.isAuto && !stateRef.current.isDragging) {
        stateRef.current.yaw += delta * 0.06;
      }

      render();
      updateHotspots(now);
      animationFrame = requestAnimationFrame(tick);
    };

    const observer = new ResizeObserver(() => {
      render();
      hotspotSignatureRef.current = "";
      updateHotspots(performance.now() + 80);
    });
    observer.observe(canvas);

    const loadingTimer = window.setTimeout(() => {
      if (!hasTexture && isCurrentScene) {
        setViewerMode("flat");
        setIsReady(true);
      }
    }, 5200);

    const image = new Image();
    image.onload = () => {
      if (!isCurrentScene) {
        return;
      }

      try {
        const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;
        const source = getTextureSource(image, maxTextureSize);

        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
        hasTexture = true;
        window.clearTimeout(loadingTimer);
        setIsReady(true);
      } catch {
        setViewerMode("flat");
        setIsReady(true);
      }
    };
    image.onerror = () => {
      if (!isCurrentScene) {
        return;
      }

      window.clearTimeout(loadingTimer);
      setViewerMode("flat");
      setIsReady(true);
    };
    image.src = activeScene.imageSrc;

    animationFrame = requestAnimationFrame(tick);

    return () => {
      isCurrentScene = false;
      window.clearTimeout(loadingTimer);
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      gl.deleteTexture(texture);
      gl.deleteBuffer(positionBuffer);
      gl.deleteBuffer(uvBuffer);
      gl.deleteBuffer(indexBuffer);
      gl.deleteProgram(program);
    };
  }, [activeScene, isVrMode, syncFlatView]);

  const goToOffsetScene = (offset: number) => {
    const nextIndex = (activeSceneIndex + offset + scenes.length) % scenes.length;
    const rect = shellRef.current?.getBoundingClientRect();

    goToScene(
      scenes[nextIndex].id,
      rect
        ? {
            zoomFrom: {
              x: rect.width * (offset > 0 ? 0.58 : 0.42),
              y: rect.height * 0.52,
            },
          }
        : undefined,
    );
  };

  const copySceneLink = async () => {
    if (!activeScene || typeof window === "undefined") {
      return;
    }

    const url = new URL(window.location.href);

    url.searchParams.set("media-index", String(activeSceneIndex));
    url.searchParams.set("media-name", activeScene.id);

    try {
      await navigator.clipboard.writeText(url.toString());
      setIsCopied(true);

      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current);
      }

      copyTimerRef.current = window.setTimeout(() => setIsCopied(false), 1600);
    } catch {
      setIsCopied(false);
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    stateRef.current.isDragging = true;
    stateRef.current.lastX = event.clientX;
    stateRef.current.lastY = event.clientY;
    setIsAuto(false);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!stateRef.current.isDragging) {
      return;
    }

    const dx = event.clientX - stateRef.current.lastX;
    const dy = event.clientY - stateRef.current.lastY;

    stateRef.current.yaw -= dx * 0.0042;
    stateRef.current.pitch = clamp(
      stateRef.current.pitch + dy * 0.0032,
      -1.25,
      1.25,
    );
    stateRef.current.lastX = event.clientX;
    stateRef.current.lastY = event.clientY;
    syncFlatView();
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
    stateRef.current.isDragging = false;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleWheel = (event: React.WheelEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    updateFov(stateRef.current.fov + Math.sign(event.deltaY) * 4);
  };

  const toggleFullscreen = async () => {
    if (!shellRef.current) {
      return;
    }

    if (!document.fullscreenElement) {
      await shellRef.current.requestFullscreen();
      return;
    }

    await document.exitFullscreen();
  };

  const toggleGyroscope = async () => {
    if (isGyroEnabled) {
      setIsGyroEnabled(false);
      return;
    }

    const orientationEvent = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<PermissionState>;
    };

    try {
      if (orientationEvent.requestPermission) {
        const permission = await orientationEvent.requestPermission();

        if (permission !== "granted") {
          return;
        }
      }

      setIsAuto(false);
      setIsGyroEnabled(true);
    } catch {
      setIsGyroEnabled(false);
    }
  };

  useEffect(() => {
    if (!isGyroEnabled) {
      return;
    }

    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha == null) {
        return;
      }

      const yaw = -(event.alpha * Math.PI) / 180;
      const pitch =
        event.beta == null
          ? stateRef.current.pitch
          : clamp(((event.beta - 90) * Math.PI) / 360, -1.05, 1.05);

      stateRef.current.yaw = yaw;
      stateRef.current.pitch = pitch;
      syncFlatView();
    };

    window.addEventListener("deviceorientation", handleDeviceOrientation, true);

    return () =>
      window.removeEventListener(
        "deviceorientation",
        handleDeviceOrientation,
        true,
      );
  }, [isGyroEnabled, syncFlatView]);

  useEffect(
    () => () => {
      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current);
      }

      if (zoomTimerRef.current) {
        window.clearTimeout(zoomTimerRef.current);
      }
    },
    [],
  );

  if (!activeScene) {
    return null;
  }

  const flatPanoramaPoint = panoramaPointFromAngles(flatView.yaw, flatView.pitch);
  const flatPanoramaX = flatPanoramaPoint.x;
  const flatPanoramaY = flatPanoramaPoint.y;
  const panoramaSurfaceStyle: CSSProperties | undefined = zoomTransition
    ? {
        transformOrigin: `${zoomTransition.x}px ${zoomTransition.y}px`,
      }
    : undefined;
  const transitionStyle = zoomTransition
    ? ({
        "--tour-zoom-x": `${zoomTransition.x}px`,
        "--tour-zoom-y": `${zoomTransition.y}px`,
      } as CSSProperties)
    : undefined;

  return (
    <section
      ref={shellRef}
      className="relative isolate h-[100svh] min-h-[620px] overflow-hidden bg-transparent text-[#3d372b]"
    >
      <canvas
        ref={canvasRef}
        aria-label="Apartment 360 panorama"
        className={`tour-panorama-surface absolute inset-0 z-[2] h-full w-full cursor-grab touch-none active:cursor-grabbing ${
          zoomTransition ? "tour-panorama-zooming" : ""
        }`}
        style={panoramaSurfaceStyle}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
      />

      {zoomTransition ? (
        <div
          className="tour-next-panorama absolute inset-0 z-[1] bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${zoomTransition.imageSrc})`,
            backgroundPosition: `${zoomTransition.panoramaX * 100}% ${
              zoomTransition.panoramaY * 100
            }%`,
            backgroundSize: "auto 118%",
          }}
        />
      ) : null}

      {viewerMode === "flat" ? (
        <div
          className={`tour-panorama-surface pointer-events-none absolute inset-0 z-[2] ${
            isVrMode ? "grid grid-cols-2" : ""
          } ${zoomTransition ? "tour-panorama-zooming" : ""}`}
          style={panoramaSurfaceStyle}
        >
          {(isVrMode ? [0, 1] : [0]).map((item) => (
            <div
              key={item}
              className="h-full w-full bg-cover bg-no-repeat"
              style={{
                backgroundImage: `url(${activeScene.imageSrc})`,
                backgroundPosition: `${flatPanoramaX * 100}% ${
                  flatPanoramaY * 100
                }%`,
                backgroundSize: "auto 118%",
              }}
            />
          ))}
        </div>
      ) : null}

      {isVrMode ? (
        <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-px bg-[#ffffff]/35" />
      ) : null}

      <div className="pointer-events-none absolute inset-0 z-[3] bg-[linear-gradient(180deg,rgba(255,247,236,0.38)_0%,rgba(255,247,236,0.04)_29%,rgba(61,55,43,0.08)_56%,rgba(255,247,236,0.52)_100%)]" />

      {zoomTransition ? (
        <div
          className="tour-zoom-pull pointer-events-none absolute inset-0 z-[15]"
          style={transitionStyle}
        >
          <span className="tour-zoom-pull__ring" />
        </div>
      ) : null}

      {isReady && isAudioPromptOpen ? (
        <div className="absolute inset-0 z-30 grid place-items-center bg-[#ffffff]/38 px-5 backdrop-blur-md">
          <div className="glass-panel w-[min(560px,100%)] p-6 text-center text-[#3d372b] sm:p-8">
            <h2 className="text-4xl font-light tracking-normal text-[#3d372b] sm:text-6xl">
              Enable audio?
            </h2>
            <div className="mx-auto my-8 h-px w-full bg-[#ffffff]" />
            <div className="grid grid-cols-2 gap-5">
              <button
                type="button"
                onClick={() => {
                  setIsMuted(false);
                  setIsAudioPromptOpen(false);
                }}
                className="glass-button h-20 text-3xl font-light transition sm:h-24 sm:text-5xl"
              >
                YES
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMuted(true);
                  setIsAudioPromptOpen(false);
                }}
                className="glass-button h-20 text-3xl font-light transition sm:h-24 sm:text-5xl"
              >
                NO
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <header className="absolute left-0 right-0 top-0 z-20 px-4 pt-4 text-[#3d372b] sm:px-7">
        <div className="glass-panel mx-auto flex h-[72px] max-w-[1600px] items-center justify-between gap-4 px-3 lg:h-[90px]">
          <button
            type="button"
            onClick={() => goToScene(scenes[0].id)}
            className="flex min-w-0 items-center gap-3"
          >
            <span className="glass-inset grid h-12 w-12 shrink-0 place-items-center text-sm font-bold text-[#3d372b] lg:h-[60px] lg:w-[60px]">
              360
            </span>
            <span className="min-w-0 text-left">
              <span className="block truncate text-sm font-bold uppercase tracking-[0.18em] text-[#3d372b]">
                Apartment
              </span>
              <span className="mt-1 block truncate text-xs font-semibold uppercase tracking-[0.14em] text-[#3d372b]">
                Virtual tour
              </span>
            </span>
          </button>

          <nav className="glass-inset relative hidden items-center p-1 md:flex">
            <button
              type="button"
              onClick={() => goToScene(scenes[0].id)}
              className="rounded-[0.9rem] px-4 py-3 text-sm font-bold text-[#3d372b] transition hover:text-[#3d372b]"
            >
              Эхлэл
            </button>
            <button
              type="button"
              onClick={() => {
                setIsFloorMenuOpen(false);
                setIsSceneMenuOpen((value) => !value);
              }}
              className="flex items-center gap-2 rounded-[0.9rem] px-4 py-3 text-sm font-bold text-[#3d372b] transition hover:text-[#3d372b]"
            >
              Өрөөнүүд
              <svg aria-hidden="true" className="h-3 w-3" viewBox="0 0 16 16" fill="none">
                <path d="m3 6 5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSceneMenuOpen(false);
                setIsFloorMenuOpen((value) => !value);
              }}
              className="flex items-center gap-2 rounded-[0.9rem] px-4 py-3 text-sm font-bold text-[#3d372b] transition hover:text-[#3d372b]"
            >
              Давхар
              <svg aria-hidden="true" className="h-3 w-3" viewBox="0 0 16 16" fill="none">
                <path d="m3 6 5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => void copySceneLink()}
              className="rounded-[0.9rem] px-4 py-3 text-sm font-bold text-[#3d372b] transition hover:text-[#3d372b]"
            >
              Холбоос
            </button>
          </nav>

          <button
            type="button"
            title="Menu"
            onClick={() => {
              setIsFloorMenuOpen(false);
              setIsSceneMenuOpen((value) => !value);
            }}
            className="tour-glass-control grid h-12 w-12 place-items-center transition md:hidden"
          >
            <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {isSceneMenuOpen ? (
          <div className="tour-glass-menu absolute right-4 top-full mt-2 w-[min(340px,calc(100vw-2rem))] overflow-hidden p-2 sm:right-7">
            {scenes.map((scene, index) => (
              <button
                key={scene.id}
                type="button"
                onClick={() => goToScene(scene.id)}
                className={`flex w-full items-center justify-between rounded px-3 py-3 text-left text-sm font-semibold transition ${
                  scene.id === activeScene.id
                    ? "glass-inset text-[#3d372b]"
                    : "text-[#3d372b] hover:text-[#3d372b]"
                }`}
              >
                <span className="truncate">{scene.name}</span>
                <span className="ml-3 text-xs opacity-70">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        ) : null}

        {isFloorMenuOpen ? (
          <div className="tour-glass-menu absolute right-4 top-full mt-2 grid w-[min(260px,calc(100vw-2rem))] gap-2 p-3 sm:right-7">
            {scenes.map((scene, index) => (
              <button
                key={scene.id}
                type="button"
                onClick={() => goToScene(scene.id)}
                className={`flex items-center justify-between rounded px-3 py-3 text-sm font-bold transition ${
                  scene.id === activeScene.id
                    ? "glass-inset text-[#3d372b]"
                    : "text-[#3d372b] hover:text-[#3d372b]"
                }`}
              >
                <span>{index + 1}-р давхар</span>
                <span className="ml-4 truncate text-xs font-semibold opacity-70">
                  {scene.area}
                </span>
              </button>
            ))}
          </div>
        ) : null}
      </header>

      <div className="absolute right-3 top-24 z-20 flex w-12 flex-col gap-2 sm:right-6 sm:w-13">
        <button
          type="button"
          title="Previous panorama"
          onClick={() => goToOffsetScene(-1)}
          className="tour-glass-control grid h-11 w-11 place-items-center transition sm:h-12 sm:w-12"
        >
          <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          title="Next panorama"
          onClick={() => goToOffsetScene(1)}
          className="tour-glass-control grid h-11 w-11 place-items-center transition sm:h-12 sm:w-12"
        >
          <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          title="Auto rotate"
          aria-pressed={isAuto}
          onClick={() => setIsAuto((value) => !value)}
          className="tour-glass-control grid h-11 w-11 place-items-center transition sm:h-12 sm:w-12"
        >
          {isAuto ? (
            <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path d="M9 7v10M15 7v10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          ) : (
            <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path d="M7 4v16l12-8-12-8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          )}
        </button>
        <button
          type="button"
          title={showHotspots ? "Hide arrows" : "Show arrows"}
          aria-pressed={showHotspots}
          onClick={() => setShowHotspots((value) => !value)}
          className="tour-glass-control grid h-11 w-11 place-items-center transition sm:h-12 sm:w-12"
        >
          <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path d="M12 20V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            {!showHotspots ? (
              <path d="M4 20 20 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            ) : null}
          </svg>
        </button>
        <button
          type="button"
          title={isMuted ? "Unmute" : "Mute"}
          aria-pressed={!isMuted}
          onClick={() => setIsMuted((value) => !value)}
          className="tour-glass-control grid h-11 w-11 place-items-center transition sm:h-12 sm:w-12"
        >
          <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path d="M4 10v4h4l5 4V6l-5 4H4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            {isMuted ? (
              <path d="m18 9-4 6M14 9l4 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M17 8c1.4 1.1 2 2.4 2 4s-.6 2.9-2 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
        <button
          type="button"
          title="Zoom in"
          onClick={() => updateFov(fov - 7)}
          className="tour-glass-control grid h-11 w-11 place-items-center text-2xl font-light transition sm:h-12 sm:w-12"
        >
          +
        </button>
        <button
          type="button"
          title="Zoom out"
          onClick={() => updateFov(fov + 7)}
          className="tour-glass-control grid h-11 w-11 place-items-center text-2xl font-light transition sm:h-12 sm:w-12"
        >
          -
        </button>
        <button
          type="button"
          title="Copy scene link"
          onClick={() => void copySceneLink()}
          className="tour-glass-control relative grid h-11 w-11 place-items-center transition sm:h-12 sm:w-12"
        >
          <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path d="M9 12a4 4 0 0 1 4-4h3a4 4 0 0 1 0 8h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M15 12a4 4 0 0 1-4 4H8a4 4 0 0 1 0-8h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {isCopied ? (
            <span className="glass-inset pointer-events-none absolute right-full mr-2 px-2 py-1 text-xs text-[#3d372b]">
              Copied
            </span>
          ) : null}
        </button>
        <button
          type="button"
          title="VR split view"
          aria-pressed={isVrMode}
          onClick={() => setIsVrMode((value) => !value)}
          className={`tour-glass-control grid h-11 w-11 place-items-center transition sm:h-12 sm:w-12 ${
            isVrMode
              ? "tour-glass-active"
              : ""
          }`}
        >
          <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path d="M3 10.5A3.5 3.5 0 0 1 6.5 7h11a3.5 3.5 0 0 1 3.5 3.5V16a2 2 0 0 1-2 2h-3.2a2 2 0 0 1-1.7-1l-.7-1.1a1.6 1.6 0 0 0-2.8 0L9.9 17a2 2 0 0 1-1.7 1H5a2 2 0 0 1-2-2v-5.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <path d="M9 12h.01M15 12h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </button>
        <button
          type="button"
          title="Gyroscope"
          aria-pressed={isGyroEnabled}
          onClick={() => void toggleGyroscope()}
          className={`tour-glass-control grid h-11 w-11 place-items-center transition sm:h-12 sm:w-12 ${
            isGyroEnabled
              ? "tour-glass-active"
              : ""
          }`}
        >
          <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path d="M12 3a9 9 0 1 0 9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 7a5 5 0 1 0 5 5M16 3h5v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          title="Fullscreen"
          onClick={() => void toggleFullscreen()}
          className="tour-glass-control grid h-11 w-11 place-items-center transition sm:h-12 sm:w-12"
        >
          <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path d="M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {showHotspots && !isVrMode ? (
        <div className="pointer-events-none absolute inset-0 z-10">
          {activeScene.hotspots.map((hotspot) => {
            const position = hotspotPositions.find((item) => item.id === hotspot.id);

            if (!position?.visible) {
              return null;
            }

            return (
              <button
                key={hotspot.id}
                type="button"
                title={hotspot.label}
                onClick={() =>
                  goToScene(hotspot.targetId, {
                    zoomFrom: {
                      x: position.x,
                      y: position.y,
                    },
                  })
                }
                className="group pointer-events-auto absolute h-24 w-32 transition"
                style={{
                  left: position.x,
                  top: position.y,
                  transform: `translate(-50%, -50%) scale(${position.scale})`,
                }}
              >
                <span
                  className="tour-glass-control absolute left-1/2 top-1/2 h-[4.25rem] w-32 -translate-x-1/2 -translate-y-1/2 rounded-[50%] transition group-hover:text-[#3d372b]"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${position.rotation}rad) skewX(-9deg)`,
                  }}
                >
                  <span className="glass-inset absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full" />
                  <svg
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transition group-hover:translate-y-[-23px]"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M16 5v21M8.5 12.5 16 5l7.5 7.5"
                      stroke="currentColor"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="glass-inset absolute left-1/2 top-[84px] max-w-[150px] -translate-x-1/2 px-3 py-2 text-xs font-semibold text-[#3d372b] opacity-0 transition group-hover:opacity-100">
                  {hotspot.label}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}

    </section>
  );
}
