import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import GithubIcon from "./GithubIcon";
import { links, section } from "../lib/links";
import styles from "./Nav.module.scss";

const navItems = [
  { id: "how", label: "How it works" },
  { id: "features", label: "Features" },
  { id: "install", label: "Install" },
  { id: "open-source", label: "Open source" },
];

export default function Nav() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -35% 0px" },
    );

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [pathname]);

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
            <a
              key={item.id}
              href={section(item.id)}
              className={activeId === item.id ? styles.active : undefined}
            >
              {item.label}
            </a>
          ))}
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.github}
            aria-label="GitHub repository"
          >
            <GithubIcon size={20} />
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
            <a key={item.id} href={section(item.id)} onClick={() => setMenuOpen(false)}>
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
