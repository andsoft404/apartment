import Image from "next/image";
import type { Metadata } from "next";
import ProjectImageShowcase, { type ProjectImage } from "../components/ProjectImageShowcase";

export const metadata: Metadata = {
  title: "Төслийн тухай | Monastery Tower",
  description:
    "Дашчойлин хийдийн дэргэд хэрэгжиж буй Monastery Tower төслийн үнэ цэн, орчин, төлөвлөлтийн тухай.",
};

const projectImages: ProjectImage[] = [
  {
    src: "/uruu2/IKH TOP3.jpg",
    title: "Төвийн тайван орчин",
    text: "Хотын төвийн үнэ цэнтэй бүсэд амар амгалан амьдралын хэмнэлийг бүрдүүлнэ.",
  },
  {
    src: "/uruu2/162 AI 1.jpg",
    title: "Орчин үеийн интерьер",
    text: "Цэвэр шугам, дулаан материал, өдөр тутмын хэрэглээнд тохирсон зохион байгуулалт.",
  },
  {
    src: "/uruu2/162 AI 8.jpg",
    title: "Тайван амрах орон зай",
    text: "Их хотын завгүй хэмнэл дунд гэрийн дотоод уур амьсгалыг зөөлөн хадгална.",
  },
  {
    src: "/tour-lythwood-room.jpg",
    title: "Showroom experience",
    text: "Интерьерийн мэдрэмжийг 360° орчинтой холбон үзэх боломжтой.",
  },
];

const storyCards = [
  {
    title: "Үнэ цэнтэй байршил",
    text: "Дашчойлин хийдийн баруун хойно, хотын төвийн тайван бөгөөд түүхэн дурсгалт соёлыг шингээсэн бүсэд хэрэгжинэ.",
  },
  {
    title: "Тэнцвэртэй төлөвлөлт",
    text: "Ерөнхий төлөвлөлт, интерьер, ногоон байгууламж болон практик хэрэглээг нэг цогц амьдралын систем болгон нэгтгэнэ.",
  },
  {
    title: "Амар амгалан амьдрал",
    text: "Таны гэр завгүй амьдралын дунд тайвшрал, уужрал авчрах үнэ цэнтэй хувийн орон зай байх ёстой.",
  },
];

const principles = [
  ["01", "Heritage", "Түүхэн орчны үнэ цэнийг орчин үеийн амьдралын хэрэгцээтэй уялдуулна."],
  ["02", "Wellbeing", "Өдөр тутмын амьдралд тайван, уужим, цэвэр мэдрэмж өгөх орчныг бүрдүүлнэ."],
  ["03", "Practical luxury", "Тансаглал нь зөвхөн гоёл биш, ашиглахад ухаалаг, удаан үнэ цэнтэй шийдэл байна."],
];

export default function ProjectPage() {
  return (
    <main className="min-h-screen bg-transparent text-[#3d372b]">
      <section className="glass-section relative isolate overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24 lg:pt-36">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[linear-gradient(180deg,rgba(255,247,236,0.4),rgba(255,247,236,0))]" />

        <div className="mx-auto grid max-w-[92rem] gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
          <article className="glass-panel relative flex min-h-[620px] flex-col justify-between overflow-hidden p-6 sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute -bottom-16 -left-10 text-[14rem] font-black leading-none tracking-normal text-[#3d372b]/28">
              MT
            </div>

            <div className="relative">
              <span className="glass-inset inline-flex px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#3d372b]">
                Төслийн тухай
              </span>

              <h1 className="mt-8 max-w-4xl text-4xl font-black uppercase leading-[1.03] tracking-normal text-[#3d372b] sm:text-5xl lg:text-[3.1rem]">
                Хотын төвийн амар амгалан, түүхэн үнэ цэн, орчин үеийн амьдралын тэнцвэр.
              </h1>

              <div className="mt-8 grid gap-6 text-base leading-8 text-[#3d372b]">
                <p>
                  Monastery Tower төсөл нь Дашчойлин хийдийн баруун хойно буюу хотын төвийн
                  хамгийн амар амгалан, түүхэн дурсгалт соёлыг шингээсэн үнэ цэнтэй бүсэд
                  хэрэгжиж буйгаараа онцлог.
                </p>
                <p>
                  Ерөнхий төлөвлөлт, интерьер, ногоон байгууламж болон практик хэрэглээнд
                  нийцсэн ухаалаг шийдлүүдээр их хотын завгүй хэмнэл дундах амар амгаланг
                  цогцлоож буй.
                </p>
              </div>
            </div>

            <div className="relative mt-10 grid gap-3 sm:grid-cols-3">
              {storyCards.map((item) => (
                <div className="glass-inset p-4" key={item.title}>
                  <h2 className="text-sm font-black uppercase tracking-[0.14em] text-[#3d372b]">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[#3d372b]">{item.text}</p>
                </div>
              ))}
            </div>
          </article>

          <ProjectImageShowcase images={projectImages} />
        </div>
      </section>

      <section className="glass-section px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-[92rem] gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#3d372b]">
              Live in Balance
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-normal text-[#3d372b] sm:text-5xl">
              Таны гэр хотын төвд байх хэрнээ дотоод амар амгаланг хадгална.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {principles.map(([number, title, text]) => (
              <article className="glass-card p-6" key={title}>
                <div className="glass-inset inline-flex px-3 py-2 text-xs font-black text-[#3d372b]">
                  {number}
                </div>
                <h3 className="mt-8 text-2xl font-semibold tracking-normal text-[#3d372b]">
                  {title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#3d372b]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-section px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="mx-auto grid max-w-[92rem] gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="glass-card overflow-hidden p-3">
            <div className="relative min-h-[360px] overflow-hidden rounded-[1.2rem] sm:min-h-[460px]">
              <Image
                src="/uruu2/IKH TOP2.jpg"
                alt="Monastery Tower exterior atmosphere"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <article className="glass-panel p-6 sm:p-8 lg:p-10">
            <span className="glass-inset inline-flex px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#3d372b]">
              Очирдарь бурхантай хөрш
            </span>
            <h2 className="mt-7 text-4xl font-semibold leading-tight tracking-normal text-[#3d372b] sm:text-5xl">
              Завгүй амьдралын дунд тайвшрал авчрах үнэт орон зай.
            </h2>
            <p className="mt-6 leading-8 text-[#3d372b]">
              Таны гэр бол завгүй амьдралын дунд тайвшрал, уужрал авчрах үнэт орон зай
              байх ёстой. Дашчойлин хийдэд орших Очирдарь бурхантай хөршлөх Monastery
              Tower энэ тэнцвэрийг өдөр тутмын амьдралд ойртуулна.
            </p>
            <p className="mt-10 text-center text-4xl font-semibold italic tracking-normal text-[#3d372b] sm:text-5xl">
              Live in Balance.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
