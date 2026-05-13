"use client";

import Image from "next/image";
import Link from "next/link";
import {
  type CSSProperties,
  type TransitionEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const TEXT_ANIMATION_LOCK = 1650;
const AUTOPLAY_DELAY = 6000;

const heroSlides = [
  {
    src: "/banner/banner1.png",
    alt: "Ikh Huree Residence banner 1",
  },
  {
    src: "/banner/banner2.png",
    alt: "Ikh Huree Residence banner 2",
  },
  {
    src: "/banner/banner3.png",
    alt: "Ikh Huree Residence banner 3",
  },
];

const formatCounter = (value: number) => value.toString().padStart(1, "0");

export default function ResidemHeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visualIndex, setVisualIndex] = useState(1);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isMoving, setIsMoving] = useState(false);
  const [isJumpReset, setIsJumpReset] = useState(false);
  const [textAnimationIndex, setTextAnimationIndex] = useState<number | null>(
    1,
  );

  const isMovingRef = useRef(false);
  const isJumpResetRef = useRef(false);
  const currentIndexRef = useRef(0);
  const visualIndexRef = useRef(1);
  const queuedDirectionRef = useRef<"next" | "prev" | null>(null);
  const autoplayTimeoutRef = useRef<number | null>(null);
  const textAnimationTimeoutRef = useRef<number | null>(null);
  const resetFrameRef = useRef<number | null>(null);

  const renderedSlides = useMemo(() => {
    const lastSlide = heroSlides[heroSlides.length - 1];
    const firstSlide = heroSlides[0];

    return [
      { ...lastSlide, originalIndex: heroSlides.length - 1, cloneKey: "start" },
      ...heroSlides.map((slide, index) => ({
        ...slide,
        originalIndex: index,
        cloneKey: `real-${index}`,
      })),
      { ...firstSlide, originalIndex: 0, cloneKey: "end" },
    ];
  }, []);

  const trackStyle = {
    transform: `translate3d(-${visualIndex * 100}%, 0, 0)`,
  } satisfies CSSProperties;

  const clearAutoplay = useCallback(() => {
    if (autoplayTimeoutRef.current) {
      window.clearTimeout(autoplayTimeoutRef.current);
      autoplayTimeoutRef.current = null;
    }
  }, []);

  const playTextAnimation = useCallback((nextVisualIndex: number) => {
    if (textAnimationTimeoutRef.current) {
      window.clearTimeout(textAnimationTimeoutRef.current);
    }

    setTextAnimationIndex(nextVisualIndex);
    textAnimationTimeoutRef.current = window.setTimeout(() => {
      setTextAnimationIndex(null);
      textAnimationTimeoutRef.current = null;
    }, TEXT_ANIMATION_LOCK);
  }, []);

  const startMove = useCallback(
    (nextDirection: "next" | "prev") => {
      const fromIndex = currentIndexRef.current;
      const nextIndex =
        nextDirection === "next"
          ? (fromIndex + 1) % heroSlides.length
          : (fromIndex - 1 + heroSlides.length) % heroSlides.length;
      const nextVisualIndex =
        visualIndexRef.current + (nextDirection === "next" ? 1 : -1);

      clearAutoplay();
      isJumpResetRef.current = false;
      isMovingRef.current = true;
      currentIndexRef.current = nextIndex;
      visualIndexRef.current = nextVisualIndex;

      setIsJumpReset(false);
      setIsMoving(true);
      setDirection(nextDirection);
      setCurrentIndex(nextIndex);
      setVisualIndex(nextVisualIndex);
      playTextAnimation(nextVisualIndex);
    },
    [clearAutoplay, playTextAnimation],
  );

  const move = useCallback(
    (nextDirection: "next" | "prev") => {
      clearAutoplay();

      if (isMovingRef.current || isJumpResetRef.current) {
        queuedDirectionRef.current = nextDirection;
        return;
      }

      startMove(nextDirection);
    },
    [clearAutoplay, startMove],
  );

  const finishMove = useCallback(() => {
    const currentVisualIndex = visualIndexRef.current;
    const resetIndex =
      currentVisualIndex === 0
        ? heroSlides.length
        : currentVisualIndex === heroSlides.length + 1
          ? 1
          : null;

    const releaseAndContinue = () => {
      isMovingRef.current = false;
      setIsMoving(false);

      const queuedDirection = queuedDirectionRef.current;
      queuedDirectionRef.current = null;

      if (queuedDirection) {
        window.setTimeout(() => startMove(queuedDirection), 0);
      }
    };

    if (resetIndex !== null) {
      isJumpResetRef.current = true;
      visualIndexRef.current = resetIndex;
      setIsJumpReset(true);
      setVisualIndex(resetIndex);

      resetFrameRef.current = window.requestAnimationFrame(() => {
        resetFrameRef.current = window.requestAnimationFrame(() => {
          isJumpResetRef.current = false;
          setIsJumpReset(false);
          releaseAndContinue();
        });
      });
      return;
    }

    releaseAndContinue();
  }, [startMove]);

  useEffect(() => {
    if (isMoving || isJumpReset) {
      return;
    }

    clearAutoplay();
    autoplayTimeoutRef.current = window.setTimeout(() => {
      autoplayTimeoutRef.current = null;
      move("next");
    }, AUTOPLAY_DELAY);

    return clearAutoplay;
  }, [clearAutoplay, isJumpReset, isMoving, move]);

  useEffect(() => {
    textAnimationTimeoutRef.current = window.setTimeout(() => {
      setTextAnimationIndex(null);
      textAnimationTimeoutRef.current = null;
    }, TEXT_ANIMATION_LOCK);
  }, []);

  useEffect(
    () => () => {
      clearAutoplay();

      if (textAnimationTimeoutRef.current) {
        window.clearTimeout(textAnimationTimeoutRef.current);
      }

      if (resetFrameRef.current) {
        window.cancelAnimationFrame(resetFrameRef.current);
      }
    },
    [clearAutoplay],
  );

  const handleTrackTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (
      event.target === event.currentTarget &&
      event.propertyName === "transform"
    ) {
      finishMove();
    }
  };

  return (
    <section
      className={`residem-hero residem-hero-swiper swiper relative min-h-screen overflow-hidden text-white${
        isJumpReset ? " is-jump-reset" : ""
      }`}
      data-direction={direction}
    >
      <div
        className="residem-hero__wrapper swiper-wrapper"
        onTransitionEnd={handleTrackTransitionEnd}
        style={trackStyle}
      >
        {renderedSlides.map((slide, index) => {
          const isActive = index === visualIndex;
          const isTextEntering = index === textAnimationIndex;

          return (
            <div
              className={`residem-hero__panel swiper-slide${
                isActive ? " swiper-slide-active is-active" : ""
              }${isTextEntering ? " is-text-entering" : ""}`}
              data-swiper-slide-index={slide.originalIndex}
              aria-hidden={!isActive}
              key={`${slide.src}-${slide.cloneKey}`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={slide.originalIndex === 0}
                sizes="100vw"
                className="residem-hero__slide object-cover"
              />
              <div className="residem-hero__shade" />

              <div className="residem-hero__content swiper-inner">
                <p className="residem-subtitle text-white/78 anim-order-1">
                  Ikh Huree Residence
                </p>
                <h1 className="anim-order-1">
                  <span>Live in</span>
                  <span>Balance</span>
                </h1>
                <div className="residem-hero__meta anim-order-2">
                  <p>Сүхбаатар дүүрэг, 1-р хороо, Дашчойлин хийдийн дэргэд</p>
                  <div className="residem-hero__actions">
                    <Link href="/showroom">360 showroom</Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="residem-hero__nav residem-hero__nav--prev swiper-button-prev"
        type="button"
        aria-label="Өмнөх зураг"
        aria-disabled={isMoving}
        onClick={() => move("prev")}
      />
      <button
        className="residem-hero__nav residem-hero__nav--next swiper-button-next"
        type="button"
        aria-label="Дараагийн зураг"
        aria-disabled={isMoving}
        onClick={() => move("next")}
      />

      <div className="residem-hero__fraction swiper-pagination swiper-pagination-fraction">
        <span className="swiper-pagination-current">
          {formatCounter(currentIndex + 1)}
        </span>
        <span aria-hidden="true"> / </span>
        <span className="swiper-pagination-total">
          {formatCounter(heroSlides.length)}
        </span>
      </div>
    </section>
  );
}
