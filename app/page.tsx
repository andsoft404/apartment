import Image from "next/image";
import Link from "next/link";
import ResidemHeroSlider from "./components/ResidemHeroSlider";

const overviewImages = [
  "/home-overview/home-overview1.png",
  "/home-overview/home-overview2.jpg",
  "/home-overview/home-overview3.jpg",
  "/home-overview/home-overview4.png",
];

const damjilgItems = [
  {
    image: "/damjilg/damjilg1.png",
    alt: "Ikh Huree Residence development milestone 1",
  },
  {
    image: "/damjilg/damjilg2.jpg",
    alt: "Ikh Huree Residence development milestone 2",
  },
  {
    image: "/damjilg/damjilg3.jpg",
    alt: "Ikh Huree Residence development milestone 3",
  },
  {
    image: "/damjilg/damjilg4.png",
    alt: "Ikh Huree Residence development milestone 4",
  },
];

const damjilgDescription = [
  "Additionally, there are",
  "several offices and bureaus",
  "within the agency that",
];

const facilities = [
  "Concierge service",
  "Business lounge",
  "Share office",
  "Retail & service",
  "Wellness zone",
  "VIP spa",
  "Smart home",
  "Automatic parking",
  "Delivery box",
  "24/7 security",
];

const roomCards = [
  {
    name: "City Studio",
    size: "38-42 м²",
    image: "/uruu/76 AI R1.jpg",
  },
  {
    name: "One Bedroom Suite",
    size: "52-58 м²",
    image: "/uruu 1/117 AI R1.jpg",
  },
  {
    name: "Business Suite",
    size: "59-67 м²",
    image: "/uruu 1/117 AI R14.jpg",
  },
  {
    name: "Premium Residence",
    size: "68-76 м²",
    image: "/uruu2/162 AI 1.jpg",
  },
  {
    name: "Executive Suite",
    size: "79-83 м²",
    image: "/uruu2/162 AI 8.jpg",
  },
  {
    name: "Private Residence",
    size: "117 м²",
    image: "/uruu2/162 AI 12.jpg",
  },
];

const stats = [
  ["3150", "м² нийт газар"],
  ["60%", "ногоон бүс ба зогсоол"],
  ["25", "давхар"],
  ["2027", "ашиглалтад орох"],
];

const contactItems = [
  ["Утас", "7227-3333"],
  ["Имэйл", "sales1@evd.mn"],
  ["Оффис", "Алтай бюлдинг 3 давхар, 302 тоот"],
];

export default function Home() {
  return (
    <main id="top" className="residem-home min-h-screen bg-white text-[#121b34]">
      <ResidemHeroSlider />

      <section className="damjilg-timeline" aria-label="Project development timeline">
        <div className="damjilg-timeline__track">
          {damjilgItems.map((item) => (
            <article className="damjilg-timeline__item" key={item.image}>
              <figure className="damjilg-timeline__image">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 12vw, 42vw"
                  className="object-cover"
                  unoptimized
                />
              </figure>
              <span className="damjilg-timeline__dot" aria-hidden="true" />
              <p>
                {damjilgDescription.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="home-overview" className="residem-section">
        <div className="residem-container residem-overview">
          <div className="residem-copy">
            <p className="residem-subtitle">Home overview</p>
            <h2>Хотын төвд амьдрах цогц систем.</h2>
            <p>
              Ikh Huree Residence нь зөвхөн орон сууц биш. Гэр, ажил,
              уулзалт, худалдаа, wellness, үйлчилгээ нэг хаягт төвлөрсөн
              premium ecosystem юм. Завгүй хуваарьтай хүмүүсийн өдөр тутмын
              хөдөлгөөнийг багасгаж, амьдралын чанарыг илүү цэгцтэй болгоно.
            </p>
            <Link className="residem-button" href="/project">
              Төслийн тухай
            </Link>
          </div>

          <div className="residem-collage" aria-label="Interior preview">
            {overviewImages.map((src, index) => (
              <figure key={src} className={`residem-collage__item item-${index + 1}`}>
                <Image
                  src={src}
                  alt="Ikh Huree Residence interior"
                  fill
                  sizes="(min-width: 1024px) 24vw, 50vw"
                  className="object-cover"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="facilities" className="residem-dark">
        <div className="residem-container residem-facilities">
          <div>
            <p className="residem-subtitle">Facilities</p>
            <h2>Өдөр тутмын хэрэгцээг нэг барилгын дотор шийднэ.</h2>
          </div>
          <ul>
            {facilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="residem-map-section">
        <Image
          src="/uruu2/IKH TOP3.jpg"
          alt="Ikh Huree Residence planning"
          width={1800}
          height={1000}
          className="w-full object-cover"
        />
        <div className="residem-dot dot-1">
          <span />
          <div>
            <h3>Business lounge</h3>
            <p>Уулзалт, ажил, зочин хүлээн авах орчин.</p>
          </div>
        </div>
        <div className="residem-dot dot-2">
          <span />
          <div>
            <h3>Green buffer</h3>
            <p>Хотын төвд тайван мэдрэмж өгөх ногоон бүс.</p>
          </div>
        </div>
        <div className="residem-dot dot-3">
          <span />
          <div>
            <h3>Wellness zone</h3>
            <p>Амрах, сэргээх, өдөр тутмын rhythm-ээ хадгалах хэсэг.</p>
          </div>
        </div>
      </section>

      <section className="residem-section">
        <div className="residem-container">
          <div className="residem-heading-center">
            <p className="residem-subtitle">Elevated comfort</p>
            <h2>Сюит сонгох</h2>
          </div>

          <div className="residem-room-grid">
            {roomCards.map((room) => (
              <article className="residem-room" key={room.name}>
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="residem-room__overlay" />
                <Link href="/planning">Дэлгэрэнгүй</Link>
                <div className="residem-room__caption">
                  <h3>{room.name}</h3>
                  <p>{room.size}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="residem-split residem-split--right">
        <div className="residem-split__image">
          <Image
            src="/tour-lythwood-room.jpg"
            alt="Ikh Huree Residence comfort"
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
        <div className="residem-container">
          <div className="residem-split__copy">
            <p className="residem-subtitle">Lifestyle</p>
            <h2>Comfort. Style. Location.</h2>
            <p>
              Их хотын завгүй хэмнэл дунд амьдралын үндсэн хэрэгцээ нэг дор
              төвлөрөх нь luxury биш, цагийн үнэ цэнийг хамгаалах бодит
              шийдэл юм.
            </p>
          </div>
        </div>
      </section>

      <section className="residem-split residem-split--left">
        <div className="residem-split__image">
          <Image
            src="/uruu 1/117 AI R7.jpg"
            alt="Ikh Huree Residence lounge"
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
        <div className="residem-container">
          <div className="residem-split__copy">
            <p className="residem-subtitle">Facilities</p>
            <h2>Live. Work. Lounge.</h2>
            <p>
              Доош буугаад ажиллах, уулзах, үйлчилгээ авах, амрах боломжтой
              mixed-use residence төлөвлөлт нь Ikh Huree-ийн гол ялгарал.
            </p>
          </div>
        </div>
      </section>

      <section className="residem-stats">
        <div className="residem-container">
          {stats.map(([value, label]) => (
            <div className="residem-stat" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="residem-tour">
        <Image
          src="/360.jpg"
          alt="Ikh Huree Residence virtual tour"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="residem-tour__shade" />
        <Link className="residem-play" href="/showroom" aria-label="360 showroom нээх">
          <span />
        </Link>
        <h2>Virtual Tour</h2>
      </section>

      <section className="residem-section">
        <div className="residem-container residem-contact">
          <div className="residem-heading-center">
            <p className="residem-subtitle">Contact us</p>
            <h2>Борлуулалтын багтай холбогдох</h2>
          </div>
          <div className="residem-contact__grid">
            {contactItems.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <Link className="residem-button" href="/contact">
            Холбоо барих
          </Link>
        </div>
      </section>
    </main>
  );
}
