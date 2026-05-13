"use client";

import Image from "next/image";
import { useState } from "react";

export type ProjectImage = {
  src: string;
  title: string;
  text: string;
};

type ProjectImageShowcaseProps = {
  images: ProjectImage[];
};

export default function ProjectImageShowcase({ images }: ProjectImageShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0] ?? {
    src: "/uruu2/162 AI 1.jpg",
    title: "Monastery Tower",
    text: "Хотын төв дэх нам гүм хэмнэл.",
  };

  const showPrevious = () => {
    setActiveIndex((index) => (index === 0 ? images.length - 1 : index - 1));
  };

  const showNext = () => {
    setActiveIndex((index) => (index + 1) % images.length);
  };

  return (
    <aside className="glass-card relative overflow-hidden p-3">
      <div className="glass-media relative min-h-[620px] overflow-hidden lg:min-h-[720px]">
        <Image
          src={activeImage.src}
          alt={activeImage.title}
          fill
          priority
          sizes="(min-width: 1024px) 54vw, 100vw"
          className="rounded-[1rem] object-cover transition duration-500"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(61,55,43,0.04),rgba(61,55,43,0.08)_48%,rgba(255,247,236,0.6))]" />

        <div className="absolute left-5 top-5 flex gap-2">
          <span className="glass-inset px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#3d372b]">
            Project view
          </span>
        </div>

        <button
          className="tour-glass-control absolute left-5 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center"
          type="button"
          aria-label="Previous image"
          onClick={showPrevious}
        >
          <span className="text-3xl leading-none">&#8249;</span>
        </button>
        <button
          className="tour-glass-control absolute right-5 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center"
          type="button"
          aria-label="Next image"
          onClick={showNext}
        >
          <span className="text-3xl leading-none">&#8250;</span>
        </button>

        <div className="absolute bottom-5 left-5 right-5 grid gap-3">
          <div className="glass-panel p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#3d372b]">
              Monastery Tower
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-normal text-[#3d372b]">
              {activeImage.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#3d372b]">
              {activeImage.text}
            </p>
          </div>

          <div className="glass-inset flex items-center gap-2 overflow-x-auto p-2">
            {images.map((image, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={image.src}
                  aria-label={`Show ${image.title}`}
                  className={`relative h-14 min-w-24 overflow-hidden rounded-[0.85rem] transition ${
                    isActive
                      ? "shadow-[inset_4px_4px_8px_rgba(61,55,43,0.85),inset_-4px_-4px_8px_rgba(255,247,236,0.9)]"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="6rem"
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
