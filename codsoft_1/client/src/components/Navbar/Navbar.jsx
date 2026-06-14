import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import style from "./Navbar.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`${style.navbar} ${isScrolled ? style.scrolled : ''}`}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <a className={style.title} href="#hero">
        <span>D</span>hruv.<span>P</span>atel
      </a>
      <div className={style.menu}>
        <img
          className={style.menuBtn}
          src={menuOpen ? "/nav/closeIcon.png" : "/nav/menuIcon.png"}
          alt={menuOpen ? "Close Menu Icon" : "Open Menu Icon"}
          onClick={() => setMenuOpen(!menuOpen)}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        {/* Simple CSS text menu icon fallback if PNG images fail to render */}
        <div
          className={`${style.menuBtnFallback} ${menuOpen ? style.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul
          className={`${style.menuItems} ${menuOpen ? style.menuOpen : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          <li><a href="#about" className={style.navLink}>About</a></li>
          <li><a href="#experience" className={style.navLink}>Experience</a></li>
          <li><a href="#projects" className={style.navLink}>Projects</a></li>
          <li><a href="#contact" className={style.navLink}>Contact</a></li>
        </ul>
      </div>
    </motion.nav>
  );
}
