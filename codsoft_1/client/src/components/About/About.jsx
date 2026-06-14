import React from "react";
import { motion } from "framer-motion";
import style from "./About.module.css";

import aboutImage from "/about/aboutImage.png";
import cursorIcon from "/about/cursorIcon.png";
import serverIcon from "/about/serverIcon.png";
import uiIcon from "/about/uiIcon.png";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <motion.section 
      className={style.container} 
      id="about"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <h2 className={style.title}>About Me</h2>
      <div className={style.content}>
        <motion.img 
          src={aboutImage} 
          alt="Profile" 
          className={style.aboutImage} 
          variants={imageVariants}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1534972195531-d756b9bda9f2?w=500&auto=format&fit=crop";
          }}
        />
        <ul className={style.aboutItems}>
          <motion.li className={style.aboutItem} variants={itemVariants}>
            <div className={style.iconContainer}>
              <img 
                src={cursorIcon} 
                alt="Frontend Icon" 
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className={style.aboutItemText}>
              <h3>Frontend Developer</h3>
              <p>
                Experienced in building responsive, optimized, and pixel-perfect 
                frontends using React, Redux, Tailwind CSS, and Framer Motion.
              </p>
            </div>
          </motion.li>
          <motion.li className={style.aboutItem} variants={itemVariants}>
            <div className={style.iconContainer}>
              <img 
                src={serverIcon} 
                alt="Backend Icon" 
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className={style.aboutItemText}>
              <h3>Backend Developer</h3>
              <p>
                Skilled in designing scalable RESTful APIs, real-time channels using Socket.IO, 
                job queues using Redis/Bull Queue, and secure token authentication.
              </p>
            </div>
          </motion.li>
          <motion.li className={style.aboutItem} variants={itemVariants}>
            <div className={style.iconContainer}>
              <img 
                src={uiIcon} 
                alt="MERN Stack Icon" 
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className={style.aboutItemText}>
              <h3>MERN Stack Developer</h3>
              <p>
                Experienced in full-stack architecture, utilizing MongoDB aggregation pipelines, 
                Express server logic, and state management via Redux Toolkit.
              </p>
            </div>
          </motion.li>
        </ul>
      </div>
    </motion.section>
  );
}
