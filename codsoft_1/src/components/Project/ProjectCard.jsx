import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from "./ProjectCard.module.css";

export default function ProjectCard({
  project: { title, imageSrc, description, skills, demo, source, highlights }
}) {
  const [imageError, setImageError] = useState(false);

  const getFallbackImage = (projTitle) => {
    const titleLower = projTitle.toLowerCase();
    if (titleLower.includes('staylix') || titleLower.includes('hotel') || titleLower.includes('booking')) {
      return "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80"; // Luxury hotel bedroom
    }
    if (titleLower.includes('employee') || titleLower.includes('management')) {
      return "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80"; // Office analytics / working
    }
    if (titleLower.includes('ecommerce') || titleLower.includes('shop')) {
      return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80"; // Shop analytics dashboard
    }
    if (titleLower.includes('chat') || titleLower.includes('socket') || titleLower.includes('websocket')) {
      return "https://images.unsplash.com/photo-1611605698335-8b15d27e03f2?w=600&auto=format&fit=crop&q=80"; // Social media / chatting mock
    }
    return "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80"; // General developer screen
  };

  return (
    <motion.div 
      className={styles.container}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <div className={styles.imageWrapper}>
        <motion.img
          src={imageError ? getFallbackImage(title) : `/${imageSrc}`}
          alt={`${title} project screenshot`}
          className={styles.image}
          onError={() => setImageError(true)}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.3 }}
        />
        <div className={styles.overlay}>
          <div className={styles.overlayText}>Explore Details</div>
        </div>
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        {highlights && highlights.length > 0 && (
          <div className={styles.highlightsContainer}>
            <h4 className={styles.highlightsHeader}>Highlights:</h4>
            <ul className={styles.highlights}>
              {highlights.slice(0, 4).map((highlight, id) => (
                <li key={id} className={styles.highlight}>
                  <svg className={styles.checkIcon} viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}

        <ul className={styles.skills}>
          {skills.map((skill, id) => (
            <li key={id} className={styles.skill}>
              {skill}
            </li>
          ))}
        </ul>

        <div className={styles.links}>
          <motion.a 
            href={demo} 
            className={`${styles.link} ${styles.demoLink}`} 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Live Demo
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '4px'}}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </motion.a>
          <motion.a 
            href={source} 
            className={`${styles.link} ${styles.sourceLink}`} 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            GitHub
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '4px'}}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
