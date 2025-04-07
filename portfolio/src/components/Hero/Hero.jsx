import React from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <>
      <section className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Hello, I'm Dhruv</h1>
          <p className={styles.description}>
            I'm a MERN Stack Developer specializing in MongoDB, Express.js, React.js, 
            and Node.js. I build scalable web applications with modern technologies 
            and best practices. Let's create something amazing together!
          </p>
          <a href="mailto:dhruvjpatel5@gmail.com" className={styles.contactBtn}>
            Contact Me
          </a>
        </div>

       
        <img
          className={styles.menuBtn}
          src="/assets/hero/heroImage.png"
          alt="Hero Illustration"
          id="heroImg"
        />

        <div className={styles.topBlur} />
        <div className={styles.bottomBlur} />
      </section>
    </>
  );
}
