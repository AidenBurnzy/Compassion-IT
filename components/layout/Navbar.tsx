"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { NgfSiteContent } from "@/lib/ngf";
import { services } from "@/lib/services-data";

type NavbarProps = {
  content: NgfSiteContent;
};

export function Navbar({ content }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const homeLabel = content["nav.home"] || "Home";
  const servicesLabel = content["nav.services"] || "Services";
  const breakfixLabel = content["nav.breakfix"] || "Break/Fix";
  const aboutLabel = content["nav.about"] || "About";
  const contactLabel = content["nav.contact"] || "Contact";

  return (
    <header className="sticky top-0 z-50 border-b border-brand/30 bg-black shadow-[0_2px_10px_rgba(220,20,60,0.2)]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link href="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
          <Image src="/logo.png" alt="CompassionIT logo" width={180} height={60} priority className="h-auto w-[140px] md:w-[180px]" />
        </Link>

        <button
          type="button"
          className="rounded-md border border-white/30 px-3 py-2 text-sm font-semibold text-white lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

        <ul className="hidden items-center gap-2 text-sm font-medium lg:flex">
          <li>
            <Link href="/" className="rounded-md px-3 py-2 text-white transition hover:bg-brand" data-ngf-field="nav.home" data-ngf-label="Home Link" data-ngf-type="text" data-ngf-section="Nav">
              {homeLabel}
            </Link>
          </li>
          <li className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button
              type="button"
              className="flex items-center gap-1 rounded-md px-3 py-2 text-white transition hover:bg-brand"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((v) => !v)}
            >
              <span data-ngf-field="nav.services" data-ngf-label="Services Menu Label" data-ngf-type="text" data-ngf-section="Nav">
                {servicesLabel}
              </span>
              <span aria-hidden="true">▾</span>
            </button>
            <div
              className={`absolute left-0 top-full min-w-[240px] rounded-lg border border-brand/30 bg-black py-2 shadow-[0_8px_25px_rgba(220,20,60,0.3)] transition ${
                servicesOpen ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              {services.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="block px-4 py-2 text-sm text-white hover:bg-brand">
                  {s.navLabel}
                </Link>
              ))}
            </div>
          </li>
          <li>
            <Link href="/breakfix" className="rounded-md px-3 py-2 text-white transition hover:bg-brand" data-ngf-field="nav.breakfix" data-ngf-label="Break/Fix Link" data-ngf-type="text" data-ngf-section="Nav">
              {breakfixLabel}
            </Link>
          </li>
          <li>
            <Link href="/#about" className="rounded-md px-3 py-2 text-white transition hover:bg-brand" data-ngf-field="nav.about" data-ngf-label="About Link" data-ngf-type="text" data-ngf-section="Nav">
              {aboutLabel}
            </Link>
          </li>
          <li>
            <Link href="/contact" className="rounded-md px-3 py-2 text-white transition hover:bg-brand" data-ngf-field="nav.contact" data-ngf-label="Contact Link" data-ngf-type="text" data-ngf-section="Nav">
              {contactLabel}
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile menu */}
      <div id="mobile-nav" className={`${menuOpen ? "block" : "hidden"} border-t border-brand/30 bg-black lg:hidden`}>
        <div className="flex flex-col gap-1 px-4 py-3 text-sm font-medium">
          <Link href="/" className="rounded-md px-3 py-2 text-white hover:bg-brand" onClick={() => setMenuOpen(false)}>
            {homeLabel}
          </Link>
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="rounded-md px-3 py-2 pl-6 text-white/90 hover:bg-brand" onClick={() => setMenuOpen(false)}>
              {s.navLabel}
            </Link>
          ))}
          <Link href="/breakfix" className="rounded-md px-3 py-2 text-white hover:bg-brand" onClick={() => setMenuOpen(false)}>
            {breakfixLabel}
          </Link>
          <Link href="/#about" className="rounded-md px-3 py-2 text-white hover:bg-brand" onClick={() => setMenuOpen(false)}>
            {aboutLabel}
          </Link>
          <Link href="/contact" className="rounded-md px-3 py-2 text-white hover:bg-brand" onClick={() => setMenuOpen(false)}>
            {contactLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}
