import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Холбоо барих | Monastery Tower",
  description:
    "Monastery Tower төслийн борлуулалтын албатай холбогдох хаяг, утас, имэйл болон Google map байршил.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-transparent text-[#3d372b]">
      <section className="glass-section px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pb-28 lg:pt-36">
        <div className="glass-panel mx-auto max-w-7xl p-6 sm:p-10 lg:p-14">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#3d372b]">
                Холбоо барих
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-[#3d372b] sm:text-5xl lg:text-6xl">
                Бидэнтэй холбогдох
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#3d372b]">
                Борлуулалтын оффис дээр ирж уулзах, эсвэл утас болон имэйлээр
                холбогдон төслийн дэлгэрэнгүй мэдээлэл аваарай.
              </p>
            </div>

            <div className="glass-inset p-5 sm:p-7">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#3d372b]">
                Байршил
              </p>
              <div className="mt-5 grid gap-5">
                <div>
                  <p className="text-xl font-black text-[#3d372b]">
                    Сүхбаатар дүүрэг, 1-р хороо
                  </p>
                  <p className="mt-3 leading-7 text-[#3d372b]">
                    Монгол улс, Улаанбаатар хот, Алтай бюлдинг 3 давхар, 302 тоот
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <span className="glass-button header-nav-button px-4 py-3 text-center text-xs">
                    Төвийн бүс
                  </span>
                  <span className="glass-button header-nav-button px-4 py-3 text-center text-xs">
                    Борлуулалтын оффис
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <a
                    href="tel:+97672273333"
                    className="glass-button header-nav-button px-5 py-4 text-center text-base transition"
                  >
                    7227-3333
                  </a>
                  <a
                    href="mailto:sales1@evd.mn"
                    className="glass-button header-nav-button px-5 py-4 text-center text-base transition"
                  >
                    sales1@evd.mn
                  </a>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=%D0%90%D0%BB%D1%82%D0%B0%D0%B9%20%D0%B1%D1%8E%D0%BB%D0%B4%D0%B8%D0%BD%D0%B3%20%D0%A3%D0%BB%D0%B0%D0%B0%D0%BD%D0%B1%D0%B0%D0%B0%D1%82%D0%B0%D1%80"
                    target="_blank"
                    rel="noreferrer"
                    className="glass-inset header-nav-button px-5 py-4 text-center text-base transition sm:col-span-2"
                  >
                    Google Map дээр нээх
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card mt-8 p-4">
            <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#3d372b]">
                  Google Map
                </p>
                <h2 className="mt-2 text-2xl font-black text-[#3d372b]">
                  Байршил харах
                </h2>
              </div>
              <span className="glass-inset w-fit px-4 py-2 text-xs font-black text-[#3d372b]">
                Алтай бюлдинг
              </span>
            </div>
            <div className="contact-map-shell glass-media overflow-hidden rounded-[1.6rem] p-0">
              <iframe
                title="Алтай бюлдинг Google map"
                src="https://www.google.com/maps?q=%D0%90%D0%BB%D1%82%D0%B0%D0%B9%20%D0%B1%D1%8E%D0%BB%D0%B4%D0%B8%D0%BD%D0%B3%20%D0%A3%D0%BB%D0%B0%D0%B0%D0%BD%D0%B1%D0%B0%D0%B0%D1%82%D0%B0%D1%80&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="contact-map-iframe h-[560px] w-full border-0 grayscale-[0.12]"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
