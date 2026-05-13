"use client";

import {
  type PointerEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type FeatureTickerProps = {
  items: string[];
};

type RowConfig = {
  direction: -1 | 1;
  speed: number;
  variant: "solid" | "outline";
};

const rows: RowConfig[] = [
  { direction: -1, speed: 34, variant: "solid" },
  { direction: 1, speed: 28, variant: "outline" },
];

const wrapOffset = (value: number, width: number) => {
  if (!width) {
    return value;
  }

  let next = value;

  while (next <= -width) {
    next += width;
  }

  while (next > 0) {
    next -= width;
  }

  return next;
};

export default function FeatureTicker({ items }: FeatureTickerProps) {
  const tracksRef = useRef<Array<HTMLDivElement | null>>([]);
  const groupsRef = useRef<Array<HTMLDivElement | null>>([]);
  const widthsRef = useRef([0, 0]);
  const offsetsRef = useRef([0, 0]);
  const dragOffsetRef = useRef(0);
  const activeDragRowRef = useRef<number | null>(null);
  const lastPointerXRef = useRef(0);
  const [draggingRow, setDraggingRow] = useState<number | null>(null);
  const repeatedItems = useMemo(
    () => Array.from({ length: 4 }, () => items).flat(),
    [items],
  );

  const applyTransform = useCallback((index: number) => {
    const track = tracksRef.current[index];

    if (track) {
      const dragOffset =
        activeDragRowRef.current === index ? dragOffsetRef.current : 0;
      const offset = wrapOffset(
        offsetsRef.current[index] + dragOffset,
        widthsRef.current[index],
      );

      track.style.transform = `translate3d(${offset}px, 0, 0)`;
    }
  }, []);

  useEffect(() => {
    const measure = () => {
      groupsRef.current.forEach((group, index) => {
        widthsRef.current[index] = group?.offsetWidth ?? 0;
        offsetsRef.current[index] = wrapOffset(
          offsetsRef.current[index],
          widthsRef.current[index],
        );
        applyTransform(index);
      });
    };

    measure();

    const observers = groupsRef.current
      .filter((group): group is HTMLDivElement => group !== null)
      .map((group) => {
        const observer = new ResizeObserver(measure);
        observer.observe(group);
        return observer;
      });

    let frame = 0;
    let lastFrame = performance.now();

    const tick = (now: number) => {
      const delta = Math.min((now - lastFrame) / 1000, 0.05);
      lastFrame = now;

      if (activeDragRowRef.current === null) {
        dragOffsetRef.current = 0;
      }

      rows.forEach((row, index) => {
        if (activeDragRowRef.current === index) {
          return;
        }

        offsetsRef.current[index] = wrapOffset(
          offsetsRef.current[index] + row.direction * row.speed * delta,
          widthsRef.current[index],
        );
        applyTransform(index);
      });

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observers.forEach((observer) => observer.disconnect());
    };
  }, [applyTransform]);

  const handlePointerDown =
    (rowIndex: number) => (event: PointerEvent<HTMLDivElement>) => {
      activeDragRowRef.current = rowIndex;
      dragOffsetRef.current = 0;
      lastPointerXRef.current = event.clientX;
      setDraggingRow(rowIndex);
      event.currentTarget.setPointerCapture(event.pointerId);
    };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rowIndex = activeDragRowRef.current;

    if (rowIndex === null) {
      return;
    }

    const delta = event.clientX - lastPointerXRef.current;
    lastPointerXRef.current = event.clientX;
    dragOffsetRef.current += delta;
    applyTransform(rowIndex);
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    const rowIndex = activeDragRowRef.current;

    if (rowIndex === null) {
      return;
    }

    offsetsRef.current[rowIndex] = wrapOffset(
      offsetsRef.current[rowIndex] + dragOffsetRef.current,
      widthsRef.current[rowIndex],
    );

    dragOffsetRef.current = 0;
    activeDragRowRef.current = null;
    setDraggingRow(null);
    applyTransform(rowIndex);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section
      className="feature-ticker"
      aria-label="Residence feature ticker"
    >
      <div className="feature-ticker__viewport">
        {rows.map((row, rowIndex) => (
          <div
            className={`feature-ticker__row ${
              draggingRow === rowIndex ? "is-dragging" : ""
            }`}
            key={row.variant}
            onPointerDown={handlePointerDown(rowIndex)}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
          >
            <div
              className="feature-ticker__track"
              ref={(node) => {
                tracksRef.current[rowIndex] = node;
              }}
            >
              {[0, 1].map((copy) => (
                <div
                  aria-hidden={copy === 1}
                  className="feature-ticker__group"
                  key={copy}
                  ref={
                    copy === 0
                      ? (node) => {
                          groupsRef.current[rowIndex] = node;
                        }
                      : undefined
                  }
                >
                  {repeatedItems.map((item, index) => (
                    <span
                      className={`feature-ticker__tile feature-ticker__tile--${row.variant}`}
                      key={`${row.variant}-${copy}-${item}-${index}`}
                    >
                      <span className="feature-ticker__index">
                        {String((index % items.length) + 1).padStart(2, "0")}
                      </span>
                      <span className="feature-ticker__text">{item}</span>
                      <span className="feature-ticker__rule" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
