import React from 'react'
import styles from "./ProjectCard.module.css"

export default function ProjectCard({
  project: { title, imageSrc, description, skills, demo, source }
}) {
  return (
    <div className={styles.container}>
      <img
        src={`/assets/${imageSrc}`}
        alt={`${title} project screenshot`}
        className={styles.image}
      />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <ul className={styles.skills}>
        {skills.map((skill, id) => (
          <li key={id} className={styles.skill}>
            {skill}
          </li>
        ))}
      </ul>
      <div className={styles.links}>
        <a href={demo} className={styles.link} target="_blank" rel="noopener noreferrer">
          Demo
        </a>
        <a href={source} className={styles.link} target="_blank" rel="noopener noreferrer">
          Source
        </a>
      </div>
    </div>
  )
}
