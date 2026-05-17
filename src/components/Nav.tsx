import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { links, section } from "../lib/links";
import styles from "./Nav.module.scss";

const navItems = [
  { href: section("how"), label: "How it works" },
  { href: section("features"), label: "Features" },
  { href: section("install"), label: "Install" },
  { href: section("open-source"), label: "Open source" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={scrolled ? `${styles.nav} ${styles.scrolled}` : styles.nav}>
      <div className={styles.bar}>
        <Link to="/" className={styles.brand} aria-label="AI Chat Speed Booster home">
          <Logo />
        </Link>

        <nav className={styles.links} aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.github}
          >
            GitHub
          </a>
        </nav>

        <button
          className={styles.menuButton}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className={styles.menu}>
          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href={links.github} target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
        </div>
      )}
    </header>
  );
}
