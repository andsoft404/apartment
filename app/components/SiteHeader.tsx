"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/#top", label: "Home" },
  { href: "/planning", label: "Rooms" },
  { href: "/#facilities", label: "Facilities" },
  { href: "/project", label: "About" },
  { href: "/advantages", label: "News" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);

    updateHash();
    window.addEventListener("hashchange", updateHash);
    window.addEventListener("popstate", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
      window.removeEventListener("popstate", updateHash);
    };
  }, [pathname]);

  useEffect(() => {
    const scrollElement =
      document.scrollingElement || document.documentElement || document.body;

    const getScrollY = () =>
      scrollElement.scrollTop ||
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    let previousY = getScrollY();
    let touchStartY = 0;

    const updateHeader = () => {
      const currentY = getScrollY();
      const isScrollingDown = currentY > previousY + 3;
      const isScrollingUp = currentY < previousY - 3;

      setIsScrolled(currentY > 12);
      setIsHidden((currentHidden) => {
        if (currentY <= 12) {
          return false;
        }

        if (isScrollingDown && currentY > 92) {
          return true;
        }

        if (isScrollingUp) {
          return false;
        }

        return currentHidden;
      });
      previousY = Math.max(currentY, 0);
    };

    const queueUpdate = () => {
      window.requestAnimationFrame(updateHeader);
    };

    const updateFromWheel = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        window.requestAnimationFrame(() => {
          setIsScrolled(getScrollY() > 12);
          setIsHidden(getScrollY() > 92);
          previousY = Math.max(getScrollY(), 0);
        });
      } else if (event.deltaY < 0) {
        setIsScrolled(getScrollY() > 12);
        setIsHidden(false);
        previousY = Math.max(getScrollY(), 0);
      }
    };

    const updateFromKey = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", "Space", "End"].includes(event.code)) {
        window.requestAnimationFrame(() => {
          setIsScrolled(getScrollY() > 12);
          setIsHidden(getScrollY() > 92);
          previousY = Math.max(getScrollY(), 0);
        });
      }

      if (["ArrowUp", "PageUp", "Home"].includes(event.code)) {
        setIsScrolled(getScrollY() > 12);
        setIsHidden(false);
        previousY = Math.max(getScrollY(), 0);
      }
    };

    const updateFromTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const updateFromTouchMove = (event: TouchEvent) => {
      const currentTouchY = event.touches[0]?.clientY ?? touchStartY;

      if (currentTouchY < touchStartY - 8) {
        setIsScrolled(getScrollY() > 12);
        setIsHidden(getScrollY() > 92);
      }

      if (currentTouchY > touchStartY + 8) {
        setIsScrolled(getScrollY() > 12);
        setIsHidden(false);
      }
    };

    updateHeader();
    const pollId = window.setInterval(updateHeader, 120);

    scrollElement.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("scroll", queueUpdate, { passive: true });
    document.addEventListener("scroll", queueUpdate, {
      capture: true,
      passive: true,
    });
    window.addEventListener("wheel", updateFromWheel, { passive: true });
    window.addEventListener("keydown", updateFromKey);
    window.addEventListener("touchstart", updateFromTouchStart, {
      passive: true,
    });
    window.addEventListener("touchmove", updateFromTouchMove, {
      passive: true,
    });

    return () => {
      window.clearInterval(pollId);
      scrollElement.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("scroll", queueUpdate);
      document.removeEventListener("scroll", queueUpdate, { capture: true });
      window.removeEventListener("wheel", updateFromWheel);
      window.removeEventListener("keydown", updateFromKey);
      window.removeEventListener("touchstart", updateFromTouchStart);
      window.removeEventListener("touchmove", updateFromTouchMove);
    };
  }, []);

  const isActiveLink = (href: string) => {
    if (href.startsWith("/#")) {
      return pathname === "/" && hash === href.slice(1);
    }

    return pathname === href;
  };

  const isContactActive = pathname === "/contact";

  return (
    <header
      className={`site-header ${isScrolled ? "site-header--scrolled" : ""} ${
        isHidden ? "site-header--hidden" : ""
      }`}
    >
      <div className="header-shell">
        <nav className="header-menu" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`header-nav-button ${
                isActiveLink(item.href) ? "header-nav-button--active" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/#top" className="site-logo-mark" aria-label="Ikh Huree Residence">
          <Image
            src="/logo.png"
            alt="Ikh Huree Residence"
            width={600}
            height={168}
            priority
          />
        </Link>

        <Link
          href="/contact"
          className={`header-cta ${isContactActive ? "header-cta--active" : ""}`}
        >
          Холбогдох
        </Link>
      </div>
    </header>
  );
}
