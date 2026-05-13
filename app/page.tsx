import Image from "next/image";
import Link from "next/link";
import FeatureTicker from "./components/FeatureTicker";

const marqueeItems = [
  "Private residence",
  "Business lounge",
  "Retail & service",
  "Wellness zone",
  "Smart home",
  "Concierge",
];

const heroStats = [
  ["25", "давхар"],
  ["2", "блок"],
  ["60%", "ногоон бүс ба зогсоол"],
  ["2027", "ашиглалтад орох"],
];

const audience = [
  {
    title: "Сэхээтэн ба шинэ үеийн мэргэжилтнүүд",
    text: "Хотын төвд амьдрахдаа нам тайван, боловсронгуй орчныг эрхэмлэдэг хэрэглэгчдэд.",
  },
  {
    title: "Бизнес эрхлэгчид",
    text: "Ажил, уулзалт, амралтаа нэг хаягт төвлөрүүлж цагийн алдагдлыг багасгах хүмүүст.",
  },
  {
    title: "Шийдвэр гаргах түвшний хэрэглэгчид",
    text: "Нууцлал, үйлчилгээ, хүртээмж, хотын төвийн үнэ цэнийг хамтад нь хүсдэг хүмүүст.",
  },
];

const dailyFlow = [
  {
    time: "Өглөө",
    title: "Гэрээсээ гарна",
    text: "Лобби, concierge, хамгаалалт, delivery box зэрэг өдөр тутмын хөдөлгөөнийг шуурхай болгоно.",
  },
  {
    time: "Ажлын өдөр",
    title: "Доош буугаад ажиллана",
    text: "Business lounge, share office, уулзалтын орчин нь хот дотор дахин замд гарах хэрэгцээг багасгана.",
  },
  {
    time: "Уулзалт",
    title: "Зочин хүлээн авна",
    text: "Кофе, lounge, үйлчилгээний орчинтой тул албан болон хувийн уулзалтыг нэг дор зохион байгуулна.",
  },
  {
    time: "Орой",
    title: "Амрах орчиндоо шилжинэ",
    text: "Wellness, ногоон бүс, хувийн residence орчин нь ажлын хэмнэлээс тайван орон зай руу зөөлөн шилжүүлнэ.",
  },
];

const ecosystem = [
  {
    label: "01",
    title: "Concierge & security",
    text: "24 цагийн хамгаалалт, ресепшн, зочин хүлээн авах урсгал, өдөр тутмын тусламж үйлчилгээ.",
  },
  {
    label: "02",
    title: "Business lounge",
    text: "Уулзалт, богино хугацааны ажил, зочин хүлээн авахад зориулсан албан орчин.",
  },
  {
    label: "03",
    title: "Retail & service",
    text: "Доод давхрын худалдаа, үйлчилгээ нь хотын түгжрэлд цаг алдахгүйгээр хэрэгцээг шийднэ.",
  },
  {
    label: "04",
    title: "Wellness & quiet living",
    text: "Fitness, spa, lounge, ногоон бүс зэрэг бие болон сэтгэлийн амралтыг дэмжих орчин.",
  },
  {
    label: "05",
    title: "Smart systems",
    text: "Smart home, ERV агааржуулалт, water purification зэрэг орчин үеийн хэрэглээний шийдлүүд.",
  },
  {
    label: "06",
    title: "Private residence",
    text: "Хотын төвийн дуу чимээнээс ангид, дулаан интерьер, том цонх, premium материалын мэдрэмж.",
  },
];

const decisionCards = [
  {
    title: "Байршлын үнэ цэнэ",
    text: "Сүхбаатар дүүрэг, 1-р хороо, Дашчойлин хийдийн дэргэдэх төвийн тайван бүс.",
    image: "/uruu2/IKH TOP3.jpg",
    href: "/project",
  },
  {
    title: "Residence төлөвлөлт",
    text: "2 блок, 25 давхар, ногоон бүс болон зогсоолын тэнцвэртэй төлөвлөлт.",
    image: "/uruu2/162 AI 8.jpg",
    href: "/general-plan",
  },
  {
    title: "Suite сонголт",
    text: "Амьдрах, түрээслэх, хөрөнгө оруулах зорилгод нийцсэн интерьер болон зохион байгуулалт.",
    image: "/uruu/76 AI R1.jpg",
    href: "/planning",
  },
];

const residenceFeatures = [
  ["Private lobby", "Оршин суугчийн урсгалыг тусгаарласан төлөвлөлт"],
  ["Service core", "Худалдаа, үйлчилгээ, уулзалтын хэрэглээ нэг дор"],
  ["Green buffer", "Хотын төвд тайван мэдрэмж өгөх ногоон бүс"],
  ["Smart comfort", "Агаар, ус, гэрлийн хэрэглээнд чиглэсэн ухаалаг шийдэл"],
];

const gallery = [
  ["/uruu2/162 AI 1.jpg", "Open living", "lg:col-span-7"],
  ["/uruu 1/117 AI R1.jpg", "Family residence", "lg:col-span-5"],
  ["/uruu/76 AI R1.jpg", "Suite interior", "lg:col-span-5"],
  ["/uruu2/162 AI 8.jpg", "Business lounge mood", "lg:col-span-7"],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-[#3d372b]">
      <section
        id="top"
        className="relative isolate flex min-h-screen items-end overflow-hidden bg-transparent px-4 pb-14 pt-28 text-[#3d372b] sm:px-6 lg:px-8 lg:pb-20"
      >
        <Image
          src="/uruu2/162 AI 1.jpg"
          alt="Ikh Huree Residence interior"
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="absolute inset-0 -z-30 object-cover object-[62%_62%]"
        />

        <div className="mx-auto grid w-full max-w-[92rem] justify-end">
          <div className="glass-panel hidden p-3 lg:grid">
            <div className="glass-inset p-6">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#3d372b]/70">
                Үндсэн санаа
              </p>
              <p className="mt-4 text-2xl font-black leading-tight">
                Доош буухад ажил, уулзалт, худалдаа, амралт бэлэн.
              </p>
              <p className="mt-5 text-sm font-semibold leading-6 text-[#3d372b]/72">
                Хотын төвд ойр байх нь хангалтгүй. Цаг, нууцлал, үйлчилгээ,
                орчны чанарыг нэг дор шийдсэн байх нь энэ төслийн гол үнэ цэнэ.
              </p>
              <Link
                className="hero-showroom-link mt-7 inline-flex min-h-12 w-fit items-center gap-3 border border-[#121b34] bg-[#121b34] px-5 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:border-[#ff6b1a] hover:bg-[#ff6b1a]"
                href="/showroom"
              >
                <span>360 showroom</span>
                <strong className="text-[#ff6b1a]">Үзэх</strong>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FeatureTicker items={marqueeItems} />

      <section className="glass-section relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[92rem]">
          <div className="glass-panel grid gap-3 p-3 sm:grid-cols-2 lg:grid-cols-4">
            {heroStats.map(([value, label], index) => (
              <div
                key={label}
                className="glass-inset group relative overflow-hidden px-5 py-6 transition"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[0.62rem] font-black uppercase tracking-[0.24em] text-[#3d372b]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-[#3d372b]/30" />
                </div>
                <div className="mt-7 flex items-end justify-between gap-4">
                  <div className="text-5xl font-black leading-none tracking-normal text-[#3d372b]">
                    {value}
                  </div>
                  <div className="max-w-32 text-right text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#3d372b]/72">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-section px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-[92rem]">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em]">
                Хэнд зориулав
              </p>
              <h2 className="mt-4 max-w-4xl text-3xl font-black leading-[1.06] tracking-normal sm:text-4xl lg:text-5xl">
                Хотын төвд амьдарч, өдөр тутмын хөдөлгөөнөө ухаалгаар багасгах
                хүмүүст.
              </h2>
            </div>
            <p className="max-w-xl text-base font-semibold leading-7 text-[#3d372b]/72 lg:pt-14">
              Ikh Huree Residence нь зөвхөн орон сууц биш. Энэ бол амьдрах,
              ажиллах, уулзах, үйлчилгээ авах, амрах хэрэгцээг нэг барилгын
              дотор цэгцэлсэн premium ecosystem.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {audience.map((item) => (
              <article key={item.title} className="glass-card p-7">
                <h3 className="text-2xl font-black leading-tight">
                  {item.title}
                </h3>
                <p className="mt-5 text-sm font-semibold leading-7 text-[#3d372b]/72">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-section px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-[92rem]">
          <div className="glass-panel grid gap-8 p-4 lg:grid-cols-[0.78fr_1.22fr] lg:p-7">
            <div className="glass-inset p-7 lg:p-9">
              <p className="text-sm font-black uppercase tracking-[0.22em]">
                Нэг өдрийн урсгал
              </p>
              <h2 className="mt-4 text-4xl font-black leading-tight tracking-normal sm:text-5xl">
                Ийш тийш явах хугацааг амьдралдаа үлдээнэ.
              </h2>
              <p className="mt-6 text-base font-semibold leading-8 text-[#3d372b]/72">
                Тансаг хэрэглээ гэдэг зөвхөн интерьер биш. Хэрэгтэй зүйл
                хаана, хэр хурдан, хэр зохион байгуулалттай хүрч байгаагаар
                өдөр тутмын амьдралын чанар хэмжигдэнэ.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {dailyFlow.map((item) => (
                <article key={item.title} className="glass-card p-6">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#3d372b]/60">
                    {item.time}
                  </p>
                  <h3 className="mt-5 text-2xl font-black">{item.title}</h3>
                  <p className="mt-4 text-sm font-semibold leading-7 text-[#3d372b]/72">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="glass-section px-4 py-20 text-[#3d372b] sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-[92rem]">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em]">
                Residence ecosystem
              </p>
              <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-normal sm:text-5xl">
                Дээд зэрэглэлийн apartment-д хэрэгтэй үндсэн давхаргууд.
              </h2>
            </div>
            <p className="max-w-xl text-base font-semibold leading-7 text-[#3d372b]/72">
              Олон улсын mixed-use residence сайтуудад онцолдог retail,
              workspace, wellness, service, residence гэсэн мэдээллийг Ikh Huree
              дээр илүү албан, цэвэр хэлбэрээр байрлууллаа.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {ecosystem.map((item) => (
              <article key={item.title} className="glass-card p-7">
                <div className="glass-inset inline-flex px-3 py-2 text-xs font-black">
                  {item.label}
                </div>
                <h3 className="mt-8 text-2xl font-black leading-tight">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm font-semibold leading-7 text-[#3d372b]/72">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-section px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em]">
              Төслийн товч мэдээлэл
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-normal sm:text-5xl">
              Шийдвэр гаргахад хэрэгтэй мэдээллийг нүүр дээрээс шууд харна.
            </h2>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-[#3d372b]/72">
              Байршил, төлөвлөлт, suite сонголт, интерьерийн мэдрэмжийг тус бүр
              товч бөгөөд дараагийн хуудас руу чиглүүлэх байдлаар байрлуулсан.
            </p>
          </div>

          <div className="grid gap-5">
            {decisionCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="glass-card grid gap-4 p-3 transition hover:-translate-y-1 sm:grid-cols-[14rem_1fr]"
              >
                <div className="glass-media relative aspect-[4/3] overflow-hidden sm:aspect-auto">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(min-width: 640px) 14rem, 100vw"
                    className="rounded-[0.95rem] object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-2xl font-black">{card.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-[#3d372b]/72">
                    {card.text}
                  </p>
                  <span className="glass-inset mt-5 inline-flex px-4 py-2 text-xs font-black uppercase tracking-[0.16em]">
                    Дэлгэрэнгүй
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-section px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-[92rem]">
          <div className="glass-panel grid gap-6 p-4 lg:grid-cols-[1.08fr_0.92fr] lg:p-7">
            <div className="glass-media overflow-hidden">
              <Image
                src="/uruu2/162 AI 8.jpg"
                alt="Ikh Huree Residence lounge"
                width={1400}
                height={900}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="h-full min-h-[420px] w-full rounded-[1rem] object-cover"
              />
            </div>
            <div className="grid content-center gap-4">
              <p className="text-sm font-black uppercase tracking-[0.22em]">
                Residence standard
              </p>
              <h2 className="text-4xl font-black leading-tight tracking-normal sm:text-5xl">
                Хувийн орон зай ба нийтийн үйлчилгээний зөв тэнцвэр.
              </h2>
              <p className="text-base font-semibold leading-8 text-[#3d372b]/72">
                Доод давхарт идэвхтэй хэрэглээ, дээд хэсэгт хувийн нам тайван
                амьдрал. Энэ ялгарал нь өндөр зэрэглэлийн apartment-ийн үнэ
                цэнийг илүү тодорхой болгодог.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {residenceFeatures.map(([title, text]) => (
                  <div key={title} className="glass-inset p-5">
                    <h3 className="text-sm font-black uppercase tracking-[0.16em]">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm font-semibold leading-6 text-[#3d372b]/72">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="glass-section py-20 lg:py-28">
        <div className="mx-auto max-w-[92rem] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em]">
                Интерьерийн мэдрэмж
              </p>
              <h2 className="mt-4 max-w-4xl text-3xl font-black leading-[1.06] tracking-normal sm:text-4xl lg:text-5xl">
                Албан, дулаан, хотын төвийн тайван орон зай.
              </h2>
            </div>
            <p className="max-w-xl text-base font-semibold leading-7 text-[#3d372b]/72 lg:pt-14">
              Зураг нь борлуулалтын хамгийн хүчтэй нотолгоо тул нүүр дээр цөөн,
              том, цэвэр frame-тэйгээр харуулж, дэлгэрэнгүй сонголтыг suite болон
              showroom руу чиглүүлнэ.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-12">
            {gallery.map(([src, title, className]) => (
              <figure key={src} className={`${className} glass-card overflow-hidden p-2`}>
                <Image
                  src={src}
                  alt={title}
                  width={1600}
                  height={900}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="h-[320px] w-full rounded-[1.15rem] object-cover sm:h-[420px]"
                />
                <figcaption className="glass-inset mx-2 mb-2 mt-3 px-5 py-4 text-sm font-black uppercase tracking-[0.16em]">
                  {title}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
