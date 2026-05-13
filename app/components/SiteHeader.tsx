"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/#top", label: "Нүүр" },
  { href: "/planning", label: "Сюит" },
  { href: "/general-plan", label: "Ерөнхий төлөвлөлт" },
  { href: "/project", label: "Төслийн тухай" },
  { href: "/advantages", label: "Төслийн давуу тал" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

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

  const isActiveLink = (href: string) => {
    if (href.startsWith("/#")) {
      return pathname === "/" && hash === href.slice(1);
    }

    return pathname === href;
  };

  const isContactActive = pathname === "/contact";

  return (
    <header className="fixed inset-x-0 top-0 z-50 text-white">
      <div className="header-shell glass-panel mx-auto flex h-16 max-w-[92rem] items-center justify-between px-3 sm:px-4 lg:h-[72px]">
        <Link
          href="/#top"
          className="site-logo-mark flex min-w-0 items-center"
          aria-label="Monastery Tower"
        >
          <Image
            src="/logo.png"
            alt="Monastery Tower"
            width={600}
            height={168}
            priority
            className="h-8 w-auto sm:h-9 lg:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-1.5 text-sm text-[#3d372b] md:flex lg:gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`header-nav-button px-3 py-2.5 text-xs transition lg:px-4 lg:text-sm ${
                isActiveLink(item.href)
                  ? "glass-inset header-nav-button--active"
                  : "glass-button"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className={`header-nav-button px-3 py-2.5 text-xs transition lg:px-4 lg:text-sm ${
            isContactActive
              ? "glass-inset header-nav-button--active"
              : "glass-button"
          }`}
        >
          Холбоо барих
        </Link>
      </div>
    </header>
  );
}
