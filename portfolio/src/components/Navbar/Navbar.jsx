import React, { useState } from 'react';
import style from "./Navbar.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={style.navbar}>
      <a className={style.title} href="/">Portfolio</a>
      <div className={style.menu}>
  
        <img 
          className={style.menuBtn} 
          src={menuOpen ? "/nav/closeIcon.png" : "/nav/menuIcon.png"} 
          alt={menuOpen ? "Close Menu Icon" : "Open Menu Icon"}
          onClick={() => setMenuOpen(!menuOpen)} 
        />
        <ul 
          className={`${style.menuItems} ${menuOpen ? style.menuOpen : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}
