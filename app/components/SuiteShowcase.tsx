"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const roomPlans = [
  {
    title: "City Studio",
    area: "38-42 м²",
    image: "/uruu/76_TOP R1.jpg",
    interior: "/uruu/76 AI R7.jpg",
    target: "Богино болон дунд хугацааны түрээс",
    text: "Нээлттэй living, компакт гал тогоо, амрах хэсэгтэй. Хотын төвд ганцаараа амьдрах, богино хугацаагаар байрлах хэрэглэгчид тохиромжтой.",
  },
  {
    title: "One Bedroom Suite",
    area: "52-58 м²",
    image: "/uruu 1/117 TOP R1.jpg",
    interior: "/uruu 1/117 AI R7.jpg",
    target: "Executive болон хос хэрэглэгч",
    text: "Унтлагын өрөө тусдаа, living ба ажиллах булан тодорхой. Түрээсийн хэрэглэгчийн өдөр тутмын тав тух, privacy-г илүү сайн хангана.",
  },
  {
    title: "Premium Residence Suite",
    area: "68-76 м²",
    image: "/uruu2/IKH TOP1.jpg",
    interior: "/uruu2/162 AI 8.jpg",
    target: "Premium long-stay хэрэглэгч",
    text: "Илүү том living, өргөн хадгалалт, хотын төвийн premium мэдрэмжтэй. Өндөр шаардлагатай урт хугацааны түрээслэгчид чиглэсэн формат.",
  },
];

const tabs = [
  { id: "plans", label: "План", helper: "Талбай ба урсгал" },
  { id: "interior", label: "Интерьер", helper: "Материал ба уур амьсгал" },
  { id: "showroom", label: "Showroom", helper: "360° мэдрэмж" },
] as const;

type ActiveTab = (typeof tabs)[number]["id"];

export default function SuiteShowcase() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("plans");
  const [selectedIndex, setSelectedIndex] = useState(1);
  const selectedPlan = roomPlans[selectedIndex];

  const imageForStage = useMemo(() => {
    if (activeTab === "interior") {
      return selectedPlan.interior;
    }

    return selectedPlan.image;
  }, [activeTab, selectedPlan]);

  return (
    <section
      id="suite-explorer"
      className="glass-section px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div className="suite-reveal">
            <p className="suite-kicker">Suite explorer</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-black leading-[1.08] tracking-normal sm:text-4xl lg:text-[2.75rem]">
              Нэгж бүрийг план, интерьер, showroom гэсэн гурван өнцгөөс харна.
            </h2>
          </div>
          <p className="suite-reveal text-base font-semibold leading-8 text-[#3d372b]/72">
            Зөвхөн гоё зураг бус, түрээсийн хэрэглэгчийн бодит урсгал,
            талбайн ашиглалт, тохижилтын мэдрэмжийг харьцуулж сонгоход
            зориулсан хэсэг.
          </p>
        </div>

        <div className="suite-explorer-grid mt-12">
          <aside className="suite-plan-list">
            {roomPlans.map((plan, index) => {
              const isActive = selectedIndex === index;

              return (
                <button
                  className={`suite-plan-button ${isActive ? "is-active" : ""}`}
                  key={plan.title}
                  onClick={() => setSelectedIndex(index)}
                  type="button"
                >
                  <span>{plan.title}</span>
                  <strong>{plan.area}</strong>
                  <small>{plan.target}</small>
                </button>
              );
            })}
          </aside>

          <div className="suite-stage">
            <div className="suite-tabs" role="tablist" aria-label="Suite view">
              {tabs.map((tab) => (
                <button
                  aria-selected={activeTab === tab.id}
                  className={activeTab === tab.id ? "is-active" : ""}
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  type="button"
                >
                  <span>{tab.label}</span>
                  <small>{tab.helper}</small>
                </button>
              ))}
            </div>

            {activeTab === "showroom" ? (
              <div className="suite-showroom-panel suite-tab-panel">
                <div className="relative min-h-[520px] overflow-hidden bg-[#f7f6f2]">
                  <Image
                    alt="360 showroom preview"
                    className="object-cover"
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    src="/tour-lythwood-room.jpg"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,27,52,0.72),rgba(18,27,52,0.18)_55%,rgba(18,27,52,0.08))]" />
                  <div className="absolute bottom-0 left-0 max-w-xl p-6 text-white sm:p-8">
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-[#ff6b1a]">
                      360 showroom
                    </p>
                    <h3 className="mt-4 text-3xl font-black leading-[1.08] sm:text-4xl">
                      Интерьерийг хөдөлгөөнтэйгээр мэдэр.
                    </h3>
                    <p className="mt-4 text-sm font-semibold leading-7 text-white/78">
                      Suite-ийн материал, гэрэл, орон зайн мэдрэмжийг статик
                      зургаас гадна 360° орчинд харах боломжтой.
                    </p>
                    <Link className="suite-primary-link mt-7" href="/showroom">
                      Showroom нээх
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="suite-tab-panel">
                <div className="suite-stage-media">
                  <Image
                    alt={`${selectedPlan.title} ${
                      activeTab === "plans" ? "plan" : "interior"
                    }`}
                    className={
                      activeTab === "plans" ? "object-contain" : "object-cover"
                    }
                    fill
                    priority={selectedIndex === 1}
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    src={imageForStage}
                  />
                </div>
                <div className="suite-stage-caption">
                  <div>
                    <p>{selectedPlan.target}</p>
                    <h3>{selectedPlan.title}</h3>
                  </div>
                  <strong>{selectedPlan.area}</strong>
                  <span>{selectedPlan.text}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden border border-[#d8d3c9] bg-[#d8d3c9] md:grid-cols-3">
          {roomPlans.map((plan, index) => (
            <article
              className="suite-summary-card suite-reveal bg-white"
              key={plan.title}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f7f6f2]">
                <Image
                  alt={`${plan.title} interior`}
                  className="object-cover transition duration-700 hover:scale-[1.04]"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  src={plan.interior}
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-black tracking-normal">
                    {plan.title}
                  </h3>
                  <span>{plan.area}</span>
                </div>
                <p className="mt-4 text-sm font-semibold leading-7 text-[#3d372b]/72">
                  {plan.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
