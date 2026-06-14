import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from "./Experience.module.css";
import history from "../../data/history.json";
import skills from "../../data/skills.json";

function SkillCard({ skill }) {
  const [imageError, setImageError] = useState(false);
  const title = skill.title;
  const category = skill.category;

  const getGradient = (cat) => {
    switch (cat) {
      case 'languages':
        return 'linear-gradient(135deg, #1f4068 0%, #162447 100%)';
      case 'frontend':
        return 'linear-gradient(135deg, #0b2447 0%, #19376d 100%)';
      case 'backend':
        return 'linear-gradient(135deg, #051622 0%, #1ba098 100%)';
      case 'tools':
        return 'linear-gradient(135deg, #1b1a17 0%, #a35709 100%)';
      default:
        return 'linear-gradient(135deg, #0f172a 0%, #334155 100%)';
    }
  };

  const getInitials = (name) => {
    if (name.toLowerCase() === 'javascript') return 'JS';
    if (name.toLowerCase() === 'mongodb') return 'MDB';
    if (name.toLowerCase() === 'express.js') return 'EX';
    if (name.toLowerCase() === 'node.js') return 'NODE';
    if (name.toLowerCase() === 'socket.io') return 'IO';
    if (name.toLowerCase() === 'redux toolkit') return 'RTK';
    if (name.toLowerCase() === 'redux saga') return 'SAGA';
    if (name.toLowerCase() === 'rtk query') return 'RTQ';
    if (name.toLowerCase() === 'tailwind css') return 'TW';
    if (name.toLowerCase() === 'material ui') return 'MUI';
    if (name.toLowerCase() === 'vs code') return 'VS';
    
    const parts = name.split(/[\s\.\-]+/);
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 3).toUpperCase();
  };

  const getGlowColor = (name) => {
    const titleLower = name.toLowerCase();
    if (titleLower.includes('react') || titleLower.includes('redux')) return 'rgba(97, 218, 251, 0.25)';
    if (titleLower.includes('mongodb')) return 'rgba(71, 162, 72, 0.25)';
    if (titleLower.includes('node') || titleLower.includes('express')) return 'rgba(108, 194, 74, 0.25)';
    if (titleLower.includes('javascript') || titleLower.includes('python')) return 'rgba(247, 223, 30, 0.2)';
    if (titleLower.includes('supabase') || titleLower.includes('postgres')) return 'rgba(0, 242, 254, 0.25)';
    return 'rgba(127, 0, 255, 0.2)';
  };

  // Standardize names for files: replacing ++ with cpp and spaces/periods
  const cleanTitle = title.toLowerCase()
    .replace('++', 'cpp')
    .replace('.', '')
    .replace(' ', '');

  return (
    <motion.div
      className={styles.skill}
      whileHover={{ 
        y: -6, 
        scale: 1.04, 
        borderColor: 'rgba(255, 255, 255, 0.2)', 
        boxShadow: `0 10px 25px ${getGlowColor(title)}` 
      }}
      whileTap={{ scale: 0.96 }}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.skillImageContainer}>
        {!imageError ? (
          <img 
            src={`/skills/${cleanTitle}.png`} 
            alt={`${title} Logo`}
            className={styles.skillImage}
            onError={() => setImageError(true)}
          />
        ) : (
          <div 
            className={styles.fallbackIcon}
            style={{ background: getGradient(category) }}
          >
            {getInitials(title)}
          </div>
        )}
      </div>
      <p className={styles.skillTitle}>{title}</p>
    </motion.div>
  );
}

function HistoryCard({ item }) {
  const [imageError, setImageError] = useState(false);
  const logoName = item.organisation.toLowerCase().split(' ')[0]; // E.g. planics, webito, sutex
  
  return (
    <motion.li 
      className={styles.historyItem}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
      whileHover={{ 
        y: -4, 
        borderColor: "rgba(255, 255, 255, 0.15)", 
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)" 
      }}
    >
      <div className={styles.companyLogoContainer}>
        {!imageError ? (
          <img
            src={`/${item.imageSrc}`}
            alt={`${item.organisation} Logo`}
            className={styles.companyLogo}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={styles.companyLogoFallback}>
            {item.organisation[0]}
          </div>
        )}
      </div>
      <div className={styles.historyItemDetails}>
        <h3>
          {item.role} 
          <span className={styles.atText}> @ {item.organisation}</span>
        </h3>
        <p className={styles.historyDuration}>
          {item.startDate} - {item.endDate || "Present"}
          <span className={`${styles.typeBadge} ${item.type === 'education' ? styles.eduBadge : styles.expBadge}`}>
            {item.type || 'experience'}
          </span>
        </p>
        <ul className={styles.historyBullets}>
          {item.experiences.map((exp, i) => (
            <li key={i}>{exp}</li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
}

export default function Experience() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'languages', label: 'Languages' },
    { id: 'frontend', label: 'Frontend & UI' },
    { id: 'backend', label: 'Backend & DB' },
    { id: 'tools', label: 'Tools & Platforms' }
  ];

  const filteredSkills = skills.filter(skill => {
    if (activeTab === 'all') return true;
    return skill.category === activeTab;
  });

  return (
    <section className={styles.container} id="experience">
      <motion.h2 
        className={styles.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        Experience & Skills
      </motion.h2>
      
      {/* Tab Filters */}
      <motion.div 
        className={styles.tabs}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {tabs.map((tab) => (
          <button 
            key={tab.id}
            className={`${styles.tabBtn} ${activeTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      <div className={styles.content}>
        {/* Animated Skills Grid */}
        <motion.div 
          className={styles.skills}
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, id) => (
              <SkillCard key={skill.title} skill={skill} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Experience Timeline */}
        <ul className={styles.history}>
          {history.map((historyItem, id) => (
            <HistoryCard key={id} item={historyItem} />
          ))}
        </ul>
      </div>
    </section>
  );
}
