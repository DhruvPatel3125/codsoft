import React from 'react'
import styles from "./Expereence.module.css"
import history from "../../data/history.json"
import skills from "../../data/skills.json"

export default function Experience() {
  return (
    <section className={styles.container} id="experience">
      <h2 className={styles.title}>Experience</h2>
      <div className={styles.content}>
        <div className={styles.skills}>
          {skills.map((skill, id) => {
            return (
              <div key={id} className={styles.skill}>
                <div className={styles.skillImageContainer}>
                  <img 
                    src={`/assets/skills/${skill.title.toLowerCase()}.png`}
                    alt={`${skill.title} Logo`}
                    className={styles.skillImage}
                  />
                </div>
                <p>{skill.title}</p>
              </div>
            );
          })}
        </div>
        <ul className={styles.history}>
          {history.map((historyItem, id) => {
            return (
              <li key={id} className={styles.historyItem}>
                <img
                  src={`/assets/history/${historyItem.organisation.toLowerCase()}.png`}
                  alt={`${historyItem.organisation} Logo`}
                  className={styles.companyLogo}
                />
                <div className={styles.historyItemDetails}>
                  <h3>{`${historyItem.role}, ${historyItem.organisation}`}</h3>
                  <p>{`${historyItem.startDate} - Present`}</p>
                  <ul>
                    {historyItem.experiences.map((experience, id) => (
                      <li key={id}>{experience}</li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  )
}
