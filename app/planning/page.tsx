import Image from "next/image";
import type { Metadata } from "next";
import SuiteShowcase from "../components/SuiteShowcase";

export const metadata: Metadata = {
  title: "Сюит | Ikh Huree Residence",
  description:
    "Ikh Huree Residence-ийн serviced apartment suite төлөвлөлт, менежмент, тохижилт болон хөрөнгө оруулалтын үнэ цэнийн танилцуулга.",
};

const investmentReasons = [
  {
    label: "01",
    title: "Түлхүүр гардуулах бүтээгдэхүүн",
    text: "План, интерьер, тавилга, цахилгаан бараа, өдөр тутмын хэрэглээний эд хогшлыг нэг стандартаар бүрдүүлж түрээслэхэд бэлэн болгоно.",
  },
  {
    label: "02",
    title: "Мэргэжлийн менежмент",
    text: "Түрээслэгч татах, гэрээний урсгал, цэвэрлэгээ, засвар үйлчилгээ, эд хөрөнгийн бүрэн бүтэн байдлыг нэг операторын системээр удирдана.",
  },
  {
    label: "03",
    title: "Төвийн өндөр эрэлт",
    text: "Хотын төвд ажил, уулзалт, худалдаа, үйлчилгээтэй ойр амьдрах хэрэгцээтэй executive хэрэглэгч, бизнес эрхлэгч, богино хугацааны түрээслэгчдэд чиглэнэ.",
  },
  {
    label: "04",
    title: "Брэндийн нэгдсэн стандарт",
    text: "Нэг барилгын доторх suite бүр ижил чанарын интерьер, үйлчилгээний мэдрэмжтэй байх нь түрээсийн бүтээгдэхүүнийг илүү найдвартай харагдуулна.",
  },
];

const operatingFlow = [
  {
    title: "Бэлтгэл",
    text: "Интерьерийн сонголт, тавилгын багц, цахилгаан бараа болон хэрэглээний эд зүйлсийг suite-ийн форматаар баталгаажуулна.",
  },
  {
    title: "Ашиглалт",
    text: "Түрээслэгчийн бүртгэл, төлбөр, цэвэрлэгээ, засвар үйлчилгээ, concierge урсгал нэг системд төвлөрнө.",
  },
  {
    title: "Хяналт",
    text: "Эд хөрөнгийн бүрэн бүтэн байдал, occupancy, үйлчилгээний чанар, түрээсийн туршлагыг тогтмол хянаж сайжруулна.",
  },
];

const packageItems = [
  "Үүдний хэсэг, гал тогоо, унтлагын өрөө, living zone-ийн иж бүрэн тавилга",
  "Гал тогооны цахилгаан хэрэгсэл, угаалгын машин, зурагт зэрэг үндсэн тоноглол",
  "Ор, матрас, даавуу, гал тогооны хэрэгсэл, декор болон daily-use багц",
  "Concierge, харуул хамгаалалт, цэвэрлэгээ, засвар үйлчилгээний менежмент",
  "Түрээслэгчийн check-in/check-out болон asset handover стандарт",
  "Suite бүрийн интерьер, план, showroom зурагтай борлуулалтын материал",
];

const audienceCards = [
  {
    title: "Завгүй хуваарьтай executive",
    text: "Гэрээсээ гараад ажил, уулзалт, үйлчилгээ рүү хурдан шилжих хэрэгцээтэй хэрэглэгч.",
  },
  {
    title: "Бизнес эрхлэгч",
    text: "Хотын төвд цэгцтэй, төлөвлөсөн, premium орчинд амьдрах болон ажиллах боломж хайдаг сегмент.",
  },
  {
    title: "Урт ба дунд хугацааны түрээс",
    text: "Олон улсын стандарттай, бүрэн тохижилттой serviced apartment сонгох хэрэглэгч.",
  },
];

export default function PlanningPage() {
  return (
    <main className="min-h-screen bg-transparent text-[#3d372b]">
      <section
        id="intro"
        className="suite-clean-hero relative isolate min-h-screen overflow-hidden bg-transparent"
      >
        <Image
          src="/uruu2/162 AI 8.jpg"
          alt="Ikh Huree Residence suite interior"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-[58%_50%]"
        />
        <a
          aria-label="Сюит хэсэг рүү очих"
          className="suite-scroll-cue"
          href="#suite-strategy"
        >
          <span />
        </a>
      </section>

      <section
        id="suite-strategy"
        className="glass-section px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
            <div className="suite-reveal">
              <p className="suite-kicker">Suite strategy</p>
              <h1 className="mt-4 max-w-3xl text-3xl font-black leading-[1.08] tracking-normal sm:text-4xl lg:text-[2.75rem]">
                Түрээсийн хөрөнгийг өдөр тутмын ажиллагаанаас салгаж,
                менежменттэй бүтээгдэхүүн болгоно.
              </h1>
            </div>
            <p className="suite-reveal text-base font-semibold leading-8 text-[#3d372b]/75 lg:pb-2">
              Сюит хэсэг нь зөвхөн өрөөний план танилцуулах зорилготой биш.
              Энэ нь хөрөнгө оруулагчид нэгж бүрийн ашиглалтын логик,
              түрээслэгчийн туршлага, тохижилтын стандарт, менежментийн
              урсгалыг нэг дор ойлгуулах шийдвэр гаргалтын хэсэг юм.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-[#d8d3c9] bg-[#d8d3c9] md:grid-cols-4">
            {investmentReasons.map((item, index) => (
              <article
                className="suite-motion-card suite-reveal bg-white p-6"
                key={item.title}
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <span className="suite-card-index">{item.label}</span>
                <h2 className="mt-10 text-2xl font-black tracking-normal">
                  {item.title}
                </h2>
                <p className="mt-5 text-sm font-semibold leading-7 text-[#3d372b]/72">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-section px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="suite-reveal">
            <p className="suite-kicker">Operating model</p>
            <h2 className="mt-4 text-3xl font-black leading-[1.08] tracking-normal sm:text-4xl lg:text-[2.75rem]">
              Түрээслүүлэлт нь системтэй ажилладаг үед хөрөнгө илүү тайван
              удирдагдана.
            </h2>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-[#3d372b]/72">
              Хөрөнгө оруулагчийн анхаарал өдөр тутмын ажиллагаанд гацахгүй.
              Suite-ийн үнэ цэнэ нь бүрэн тохижилт, операторын менежмент,
              төвийн эрэлт гурав нэг бүтээгдэхүүн болж ажиллахад оршино.
            </p>
          </div>

          <div className="suite-flow">
            {operatingFlow.map((item, index) => (
              <article
                className="suite-flow-card suite-reveal"
                key={item.title}
                style={{ animationDelay: `${index * 110}ms` }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-section px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="suite-reveal">
              <p className="suite-kicker">Ready-to-rent package</p>
              <h2 className="mt-4 text-3xl font-black leading-[1.08] tracking-normal sm:text-4xl lg:text-[2.75rem]">
                Түрээслэгч орох эхний өдрөөс ашиглахад бэлэн багц.
              </h2>
            </div>
            <div className="grid gap-px border border-[#d8d3c9] bg-[#d8d3c9] sm:grid-cols-2">
              {packageItems.map((item, index) => (
                <div
                  className="suite-check-item suite-reveal bg-white"
                  key={item}
                  style={{ animationDelay: `${index * 65}ms` }}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="glass-section px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="suite-reveal grid gap-8 border-y border-[#d8d3c9] py-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <p className="suite-kicker">Tenant profile</p>
              <h2 className="mt-4 text-3xl font-black leading-[1.08] tracking-normal sm:text-4xl lg:text-[2.75rem]">
                Хэнд илүү оновчтой вэ?
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {audienceCards.map((item) => (
                <article className="suite-audience-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SuiteShowcase />
    </main>
  );
}
