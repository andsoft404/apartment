import Image from "next/image";

type RoomPlan = {
  id: string;
  block: "A" | "B";
  rooms: string;
  area: string;
  plan: string;
  interior: string;
  note: string;
};

type ModalTab = "plan" | "interior";

const bBlockRooms: RoomPlan[] = [
  {
    id: "b-49-46",
    block: "B",
    rooms: "2 өрөө",
    area: "49.46м²",
    plan: "/uruu/76_TOP R1.jpg",
    interior: "/uruu/76 AI R1.jpg",
    note: "Компакт төлөвлөлттэй, түрээсийн эрэлтэд тохирсон 2 өрөө.",
  },
  {
    id: "b-59-07",
    block: "B",
    rooms: "2 өрөө",
    area: "59.07м²",
    plan: "/uruu/76_TOP R2.jpg",
    interior: "/uruu/76 AI R7.jpg",
    note: "Зочны өрөө болон гал тогооны урсгал нээлттэй төлөвлөгдсөн.",
  },
  {
    id: "b-71-53",
    block: "B",
    rooms: "3 өрөө",
    area: "71.53м²",
    plan: "/uruu 1/117 TOP R1.jpg",
    interior: "/uruu 1/117 AI R7.jpg",
    note: "Гэр бүл болон урт хугацааны түрээслэгчид тохиромжтой 3 өрөө.",
  },
  {
    id: "b-77-17",
    block: "B",
    rooms: "3 өрөө",
    area: "77.17м²",
    plan: "/uruu 1/117 TOP R2.jpg",
    interior: "/uruu 1/117 AI R10.jpg",
    note: "Амрах болон ажиллах орон зайг тодорхой ялгасан зохион байгуулалт.",
  },
  {
    id: "b-79-36",
    block: "B",
    rooms: "3 өрөө",
    area: "79.36м²",
    plan: "/uruu2/IKH TOP1.jpg",
    interior: "/uruu2/162 AI 1.jpg",
    note: "Илүү уужим living zone бүхий premium хувилбар.",
  },
  {
    id: "b-79-83",
    block: "B",
    rooms: "3 өрөө",
    area: "79.83м²",
    plan: "/uruu2/IKH TOP2.jpg",
    interior: "/uruu2/162 AI 8.jpg",
    note: "Гэрэл, хадгалалт, хэрэглээний урсгалыг тэнцвэржүүлсэн төлөвлөлт.",
  },
];

const aBlockRooms: RoomPlan[] = [
  {
    id: "a-46-52",
    block: "A",
    rooms: "2 өрөө",
    area: "46.52м²",
    plan: "/uruu/76_TOP R1.jpg",
    interior: "/uruu/76 AI R3.jpg",
    note: "Хотын төвийн serviced apartment-д тохиромжтой авсаархан шийдэл.",
  },
  {
    id: "a-52-48",
    block: "A",
    rooms: "2 өрөө",
    area: "52.48м²",
    plan: "/uruu/76_TOP R2.jpg",
    interior: "/uruu/76 AI R11.jpg",
    note: "Зочны болон унтлагын хэсгийг цэгцтэй салгасан төлөвлөлт.",
  },
  {
    id: "a-52-80",
    block: "A",
    rooms: "2 өрөө",
    area: "52.8м²",
    plan: "/uruu 1/117 TOP R1.jpg",
    interior: "/uruu 1/117 AI R3.jpg",
    note: "Хадгалалт сайтай, өдөр тутмын хэрэглээнд ойр зохион байгуулалт.",
  },
  {
    id: "a-67-05",
    block: "A",
    rooms: "3 өрөө",
    area: "67.05м²",
    plan: "/uruu 1/117 TOP R2.jpg",
    interior: "/uruu 1/117 AI R15.jpg",
    note: "Гурван өрөөний хэрэгцээг илүү үр ашигтай талбайд багтаасан.",
  },
  {
    id: "a-79-83",
    block: "A",
    rooms: "3 өрөө",
    area: "79.83м²",
    plan: "/uruu2/IKH TOP3.jpg",
    interior: "/uruu2/162 AI 8_1.jpg",
    note: "Уужим living, нээлттэй гал тогоо, тайван унтлагын бүс.",
  },
  {
    id: "a-117-90",
    block: "A",
    rooms: "4 өрөө",
    area: "117.9м²",
    plan: "/uruu 1/117 TOP R1.jpg",
    interior: "/uruu 1/117 AI R23.jpg",
    note: "Том талбай, олон хэрэглээний хувилбар бүхий онцгой сонголт.",
  },
];

const allRooms = [...bBlockRooms, ...aBlockRooms];

function RoomLink({ room }: { room: RoomPlan }) {
  return (
    <a
      href={`#room-${room.id}-plan`}
      className="glass-button header-nav-button block w-full rounded-2xl px-5 py-4 text-left transition"
    >
      <span className="block text-sm font-black text-[#3d372b]">{room.rooms}</span>
      <span className="mt-1 block text-2xl font-black leading-none text-[#3d372b]">
        {room.area}
      </span>
    </a>
  );
}

function getNeighbor(room: RoomPlan, direction: -1 | 1) {
  const index = allRooms.findIndex((item) => item.id === room.id);
  return allRooms[(index + direction + allRooms.length) % allRooms.length];
}

function RoomModal({ room, tab }: { room: RoomPlan; tab: ModalTab }) {
  const previousRoom = getNeighbor(room, -1);
  const nextRoom = getNeighbor(room, 1);
  const isPlan = tab === "plan";
  const image = isPlan ? room.plan : room.interior;
  const tabLabel = isPlan ? "План" : "Интерьер";

  return (
    <div
      id={`room-${room.id}-${tab}`}
      className="room-plan-dialog fixed inset-0 z-[80] hidden items-center justify-center bg-[#3d372b]/40 p-3 backdrop-blur-sm target:flex sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${room.block} блок ${room.area}`}
    >
      <div className="glass-panel max-h-[92vh] w-full max-w-6xl overflow-hidden p-3 sm:p-5">
        <div className="flex items-start justify-between gap-4 border-b border-[#3d372b]/35 pb-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#3d372b]">
              {room.block} Block
            </p>
            <h3 className="mt-2 text-2xl font-black text-[#3d372b] sm:text-3xl">
              {room.rooms} · {room.area}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#3d372b]">
              {room.note}
            </p>
          </div>
          <a
            href="#general-plan-explorer"
            className="tour-glass-control grid h-14 w-14 shrink-0 place-items-center text-3xl"
            aria-label="Хаах"
          >
            ×
          </a>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <a
            href={`#room-${room.id}-plan`}
            className={`header-nav-button rounded-2xl px-6 py-3 text-center text-sm transition ${
              isPlan ? "glass-inset" : "glass-button"
            }`}
          >
            План
          </a>
          <div className="hidden h-px w-24 bg-[#3d372b]/45 sm:block" />
          <a
            href={`#room-${room.id}-interior`}
            className={`header-nav-button rounded-2xl px-6 py-3 text-center text-sm transition ${
              isPlan ? "glass-button" : "glass-inset"
            }`}
          >
            Интерьер
          </a>
        </div>

        <div className="glass-media relative mt-4 h-[58vh] min-h-[360px] overflow-hidden">
          <Image
            src={image}
            alt={`${room.area} ${tabLabel}`}
            fill
            sizes="100vw"
            className="object-contain p-3"
          />
          <a
            href={`#room-${previousRoom.id}-${tab}`}
            aria-label="Өмнөх өрөө"
            className="tour-glass-control absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center text-3xl"
          >
            ‹
          </a>
          <a
            href={`#room-${nextRoom.id}-${tab}`}
            aria-label="Дараагийн өрөө"
            className="tour-glass-control absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center text-3xl"
          >
            ›
          </a>
        </div>
      </div>
    </div>
  );
}

export default function GeneralPlanExplorer() {
  return (
    <>
      <section
        id="general-plan-explorer"
        className="mt-12 grid gap-6 lg:grid-cols-[0.24fr_1fr_0.24fr] lg:items-start"
      >
        <aside className="glass-panel p-4">
          <h2 className="px-2 text-2xl font-black tracking-normal text-[#3d372b]">B BLOCK</h2>
          <div className="mt-4 grid gap-4">
            {bBlockRooms.map((room) => (
              <RoomLink key={room.id} room={room} />
            ))}
          </div>
        </aside>

        <div className="glass-card p-4">
          <div className="glass-inset relative min-h-[560px] overflow-hidden p-3 sm:p-5">
            <div className="glass-media relative h-full min-h-[520px] overflow-hidden rounded-[1.7rem]">
              <Image
                src="/uruu2/IKH TOP3.jpg"
                alt="Monastery Tower ерөнхий төлөвлөлтийн зураг"
                fill
                priority
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="object-contain p-4"
              />
            </div>
          </div>
        </div>

        <aside className="glass-panel p-4">
          <h2 className="px-2 text-2xl font-black tracking-normal text-[#3d372b]">A BLOCK</h2>
          <div className="mt-4 grid gap-4">
            {aBlockRooms.map((room) => (
              <RoomLink key={room.id} room={room} />
            ))}
          </div>
        </aside>
      </section>

      {allRooms.flatMap((room) => [
        <RoomModal key={`${room.id}-plan`} room={room} tab="plan" />,
        <RoomModal key={`${room.id}-interior`} room={room} tab="interior" />,
      ])}
    </>
  );
}
