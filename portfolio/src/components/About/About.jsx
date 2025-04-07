import React from "react";
import style from "./About.module.css";

export default function About() {
  return (
    <div>
      <section className={style.container} id="about">
        <h2 className={style.title}>About</h2>
        <div className={style.content}>
          <img
            src={"/assets/about/aboutImage.png"}
            alt="Menu Icon"
            className={style.aboutImage}
          />
          <ul className={style.aboutItems}>
            <li className={style.aboutItem}>
              <img src={"/assets/about/cursorIcon.png"} alt="Menu Icon" />
              <div className={style.aboutItemText}>
                <h3>Frontend Developer</h3>
                <p>
                  I'm frontend developer with experience in build and optimized
                  sites
                </p>
              </div>
            </li>
            <li className={style.aboutItem}>
              <img src={"/assets/about/uiIcon.png"} alt="Menu Icon" />
              <div className={style.aboutItemText}>
                <h3>UI Designer</h3>
                <p> I'm UI designer with experience in build and optimized
                sites</p>
              </div>
            </li>
            <li className={style.aboutItem}>
              <img src={"/assets/about/serverIcon.png"} alt="server Icon" />
              <div className={style.aboutItemText}>
                <h3>Backend Developer</h3>
                <p>
                  I'm Backend developer with experience in build and optimized
                  sites
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
