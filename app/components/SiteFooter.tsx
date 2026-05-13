import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="glass-section mt-auto px-3 pb-5 pt-12 text-[#3d372b] sm:px-5 lg:pt-16">
      <div className="footer-monument mx-auto max-w-[92rem]">
        <div className="footer-monument__mast">
          <Link
            href="/#top"
            className="footer-monument__logo"
            aria-label="Monastery Tower"
          >
            <Image
              src="/logo.png"
              alt="Monastery Tower"
              width={600}
              height={168}
              className="h-14 w-auto sm:h-16 lg:h-20"
            />
          </Link>

          <div className="footer-monument__intro">
            <span>Тайлбар</span>
            <p>
              Их хотын төвд тайван амьдрал, ухаалаг төлөвлөлт, тав тухыг нэг
              дор цогцлоосон орон сууцны төсөл.
            </p>
            <strong>Live in Balance.</strong>
          </div>
        </div>

        <div className="footer-monument__rail">
          <div className="footer-monument__actions">
            <a href="tel:+97672273333" className="footer-monument__phone">
              7227-3333
            </a>
            <Link href="/contact" className="footer-monument__cta">
              Холбоо барих
            </Link>
          </div>

          <div className="footer-monument__contact">
            <a href="mailto:sales1@evd.mn">sales1@evd.mn</a>
            <span>Алтай бюлдинг 3 давхар, 302 тоот</span>
          </div>
        </div>
      </div>

      <div className="footer-monument__base footer-monument__base--detached mx-auto max-w-[92rem]">
        <span>© 2026 Monastery Tower</span>
        <span>Ulaanbaatar, Mongolia</span>
      </div>
    </footer>
  );
}
