import React from "react";
import style from "./About.module.css";

import aboutImage from "/about/aboutImage.png";
import cursorIcon from "/about/cursorIcon.png";
import serverIcon from "/about/serverIcon.png";
import uiIcon from "/about/uiIcon.png";

export default function About() {
  return (
    <div>
      <section className={style.container} id="about">
        <h2 className={style.title}>About</h2>
        <div className={style.content}>
          <img src={aboutImage} alt="Profile" className={style.aboutImage} />
          <ul className={style.aboutItems}>
            <li className={style.aboutItem}>
              <img src={cursorIcon} alt="Frontend Icon" />
              <div className={style.aboutItemText}>
                <h3>Frontend Developer</h3>
                <p>
                  Frontend developer with experience in building responsive and
                  optimized web applications.
                </p>
              </div>
            </li>
            <li className={style.aboutItem}>
              <img src={serverIcon} alt="Backend Icon" />
              <div className={style.aboutItemText}>
                <h3>Backend Developer</h3>
                <p>
                  Backend developer experienced in building RESTful APIs and
                  managing databases.
                </p>
              </div>
            </li>
            <li className={style.aboutItem}>
              <img src={uiIcon} alt="MERN Stack Icon" />
              <div className={style.aboutItemText}>
                <h3>MERN Stack Developer</h3>
                <p>
                  Full-stack developer specializing in MongoDB, Express.js, React.js,
                  and Node.js with experience in building scalable web applications.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
