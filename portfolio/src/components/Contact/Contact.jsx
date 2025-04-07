import React from 'react';
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <div>
      <footer id="contact" className={styles.container}>
        <div className={styles.text}>
          <h2>Contact</h2>
          <p>Feel free to reach out!</p>
        </div>
        <ul className={styles.links}>
          <li className={styles.link}>
            <img
              src="/assets/contact/emailIcon.png" 
              alt="Email Icon"
              id="heroImg"
            />
            <a href="mailto:dhruvjpatel5@email.com">dhruvjpatel5@email.com</a>
          </li>
          <li className={styles.link}>
            <img
              src="/assets/contact/LinkedinIcon.png" 
              alt="LinkedIn Icon"
              id="heroImg"
            />
            <a href="https://www.linkedin.com/in/dhruvpatel312/">linkedin.com/DhruvPatel</a>
          </li>
          <li className={styles.link}>
            <img
              src="/assets/contact/githubIcon.png"
              alt="GitHub Icon"
              id="heroImg"
            />
            <a href="https://github.com/DhruvPatel3125">github.com/DhruvPatel</a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
