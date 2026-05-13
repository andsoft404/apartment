import Link from "next/link";

export default function PannellumShowroom() {
  return (
    <>
      <div className="showroom-toolbar">
        <Link href="/#top" className="showroom-control">
          Нүүр
        </Link>
        <span className="showroom-control showroom-control--label">360 showroom</span>
      </div>

      <iframe
        title="Monastery Tower 360 showroom"
        src="/showroom-panorama.html"
        className="showroom-iframe"
        allowFullScreen
      />
    </>
  );
}
