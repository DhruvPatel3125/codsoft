import React from 'react'
import style from "./Navbar.module.css"
import {useState} from 'react'
import { getImageUrl } from '../utils'  

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
return (
 <nav className={style.navbar}>
            <a className={style.title} href="/">Portfolio</a>
            <div className={style.menu}>
                    <img 
                            className={style.menuBtn} 
                            src={menuOpen ? "/assets/nav/closeIcon.png" : "/assets/nav/menuIcon.png"} 
                            alt="Menu Icon"
                            onClick={() => setMenuOpen(!menuOpen)} 
                    />
                    <ul 
                            className={`${style.menuItems} ${menuOpen ? style.menuOpen : ''}`}
                            onClick={() => setMenuOpen(false)}
                    >
                            <li>
                                    <a href="#about">About</a>
                            </li>
                            <li>
                                    <a href="#experience">Experience</a>
                            </li>
                            <li>
                                    <a href="#projects">Projects</a>
                            </li>
                            <li>
                                    <a href="#contact">Contact</a>
                            </li>
                    </ul>
            </div>
 </nav>
)
}
