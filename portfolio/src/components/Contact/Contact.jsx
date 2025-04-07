import React from 'react';
import styles from "./Contact.module.css";

import emailIcon from "../../../assets/contact/emailIcon.png";
import linkedinIcon from "../../../assets/contact/LinkedinIcon.png";
import githubIcon from "../../../assets/contact/githubIcon.png";

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
              src={emailIcon}
              alt="Email Icon"
              id="heroImg"
            />
            <a href="mailto:dhruvjpatel5@email.com">dhruvjpatel5@email.com</a>
          </li>
          <li className={styles.link}>
            <img
              src={linkedinIcon}
              alt="LinkedIn Icon"
              id="heroImg"
            />
            <a href="https://www.linkedin.com/in/dhruvpatel312/">linkedin.com/DhruvPatel</a>
          </li>
          <li className={styles.link}>
            <img
              src={githubIcon}
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
