import React from "react";
import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";
export default function Hero() {
  return (
    <>
      <section className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Hi, I'm Dhruv</h1>
          <p className={styles.description}>
            I'm a full-stack developer with using React and NodeJS. Reach out if
            you'd like to learn more!
          </p>
          <a href="mailto:dhruvjpatel5@gmail.com" className={styles.contactBtn}>
            Contact Me
          </a>
        </div>
        <img
          className={styles.menuBtn}
          src={"/assets/hero/heroImage.png"}
          alt="Menu Icon"
          id="heroImg"
        />
        <div className={styles.topBlur} />
        <div className={styles.bottomBlur} />
      </section>
    </>
  );
}
