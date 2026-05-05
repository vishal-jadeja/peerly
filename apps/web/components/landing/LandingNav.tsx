"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { href: "#hero", label: "INTRO", num: "01", id: "hero" },
  { href: "#process", label: "HOW IT WORKS", num: "02", id: "process" },
  { href: "#proof", label: "WHO", num: "03", id: "proof" },
  { href: "#cta", label: "WAITLIST", num: "04", id: "cta" },
];

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav className={cn("p-nav", scrolled && "p-nav-scrolled")}>
      <div className="p-nav-logo">
        <span className="p-nav-dot" />
        PEERLY
      </div>

      <ul className="p-nav-links">
        {SECTIONS.map((s) => (
          <li key={s.href}>
            <a
              href={s.href}
              className={cn(activeSection === s.id && "p-nav-active")}
            >
              <span>{s.num}</span>
              {s.label}
            </a>
          </li>
        ))}
      </ul>

      <button
        className={cn("p-nav-hamburger", menuOpen && "open")}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="p-nav-mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
          >
            {SECTIONS.map((s, i) => (
              <motion.a
                key={s.href}
                href={s.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.06,
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => setMenuOpen(false)}
              >
                {s.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
