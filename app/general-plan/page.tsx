import type { Metadata } from "next";
import GeneralPlanExplorer from "../components/GeneralPlanExplorer";

export const metadata: Metadata = {
  title: "Ерөнхий төлөвлөлт | Monastery Tower",
  description:
    "Monastery Tower төслийн A болон B блокийн ерөнхий төлөвлөлт, өрөөний план, интерьерийн сонголтууд.",
};

export default function GeneralPlanPage() {
  return (
    <main className="min-h-screen bg-transparent text-[#3d372b]">
      <section className="glass-section px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pb-28 lg:pt-36">
        <div className="mx-auto max-w-[92rem]">
          <article className="glass-panel p-6 sm:p-8 lg:p-10">
            <span className="glass-inset inline-flex px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#3d372b]">
              Master plan
            </span>

            <div className="mt-8 grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
              <div>
                <h1 className="text-4xl font-semibold leading-tight tracking-normal text-[#3d372b] sm:text-5xl lg:text-6xl">
                  Ерөнхий төлөвлөлт
                </h1>
                <p className="mt-7 max-w-4xl text-lg leading-8 text-[#3d372b]">
                  Monastery Tower нь нийт 2 блок 25 давхар бизнес зэрэглэлийн,
                  үйлчилгээ болон орон сууцны төсөл болон хэрэгжиж байна. Нийт
                  3150 ам.метр газарт хэрэгжих бөгөөд, газрын 40% барилга, 60%
                  зогсоол болон ногоон байгууламжийн төлөвлөлттэй.
                </p>
              </div>

              <div className="glass-inset p-5 sm:p-6">
                <ul className="space-y-4 text-base leading-7 text-[#3d372b]">
                  <li>
                    Ногоон байгууламжийн төлөвлөлтөд Pet Zone, Kids Zone,
                    Smoking Zone зэрэг тав тухтай шийдлүүдийг тусгасан.
                  </li>
                  <li>
                    B1 давхар зогсоол болон хотхон доторх автомат зогсоолыг
                    нэмэлтээр төлөвлөсөн давуу талтай.
                  </li>
                </ul>
                <p className="mt-8 text-center font-serif text-4xl italic tracking-[0.12em] text-[#3d372b] sm:text-5xl">
                  Live in Balance.
                </p>
              </div>
            </div>
          </article>

          <GeneralPlanExplorer />
        </div>
      </section>
    </main>
  );
}
