import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Төслийн давуу тал | Monastery Tower",
  description:
    "Monastery Tower төслийн төлөвлөлт, технологи, байршил болон luxury амьдралын шийдлүүд.",
};

const advantages = [
  "Ногоон байгууламжийг pet zone, kids zone, smoking zone зэргээр ялгаж төлөвлөсөн.",
  "Community center: Club House, Kids zone, Share Office, VIP spa зэрэг цогц төлөвлөлт.",
  "Interior-ийн zen concept болон нэмэлт хийцлэлүүдтэй төлөвлөлт.",
  "Металл болон шилэн фасад.",
  "Орчин үеийн чанартай технологийн шийдэл.",
  "Ресепшион болон 24 цагийн харуул хамгаалалттай.",
  "Агуулахын шийдэл болон оршин суугчдад зориулсан Delivery Box.",
  "Дашчойлин хийд буюу түүхэн соёлыг хадгалсан, хотын төвийн үнэ цэнтэй байршил.",
  "Автомат зогсоол.",
];

const imageCards = [
  {
    src: "/uruu2/162 AI 1.jpg",
    title: "Luxury interior",
    text: "Zen concept, материалын тэнцвэртэй мэдрэмж.",
  },
  {
    src: "/uruu2/162 AI 8.jpg",
    title: "Private comfort",
    text: "Тайван амьдралд зориулсан дотоод төлөвлөлт.",
  },
  {
    src: "/uruu 1/117 AI R7.jpg",
    title: "Practical living",
    text: "Өдөр тутмын хэрэглээг дэмжих ухаалаг шийдэл.",
  },
];

export default function AdvantagesPage() {
  return (
    <main className="min-h-screen bg-transparent text-[#3d372b]">
      <section className="glass-section px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pb-28 lg:pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
            <article className="glass-panel p-6 sm:p-8 lg:p-10">
              <span className="glass-inset inline-flex px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#3d372b]">
                Төслийн давуу тал
              </span>

              <h1 className="mt-8 max-w-4xl text-4xl font-semibold leading-tight tracking-normal sm:text-5xl lg:text-6xl">
                Бизнес зэрэглэлийн шалгуураас давсан luxury амьдралын цогц шийдэл.
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#3d372b]">
                Monastery Tower төсөл нь бизнес зэрэглэлийн орон сууцны шалгуурыг бүрэн хангасан бөгөөд түүнээс давж, luxury ангилалд багтах практик хэрэглээ, тансаг амьдралын шийдлүүдийг цогцлоосон онцгой төсөл юм.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {["Luxury", "Practical", "Secure"].map((item) => (
                  <div className="glass-inset px-4 py-5 text-center" key={item}>
                    <p className="text-sm font-black uppercase tracking-[0.18em] text-[#3d372b]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <div className="glass-card p-3">
              <div className="glass-media relative min-h-[420px] overflow-hidden lg:h-full">
                <Image
                  src="/tour-lythwood-room.jpg"
                  alt="Monastery Tower advantage"
                  fill
                  priority
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <section className="mt-12">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#3d372b]">
                  Төлөвлөлтийн давуу тал
                </p>
                <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-normal sm:text-5xl">
                  Хотын төвийн үнэ цэнтэй байршил, хэрэглээний нарийн шийдлүүд нэг дор.
                </h2>
              </div>
              <span className="glass-inset w-fit px-4 py-3 text-sm font-black text-[#3d372b]">
                09 давуу тал
              </span>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {advantages.map((item, index) => (
                <article className="glass-card p-6" key={item}>
                  <div className="glass-inset inline-flex px-3 py-2 text-xs font-black text-[#3d372b]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <p className="mt-6 leading-7 text-[#3d372b]">{item}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-12 grid gap-5 lg:grid-cols-3">
            {imageCards.map((image) => (
              <article className="glass-card p-3" key={image.src}>
                <div className="glass-media relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition duration-500 hover:scale-[1.04]"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold tracking-normal">{image.title}</h3>
                  <p className="mt-2 leading-7 text-[#3d372b]">{image.text}</p>
                </div>
              </article>
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}
