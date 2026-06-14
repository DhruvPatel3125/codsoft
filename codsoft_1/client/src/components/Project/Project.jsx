import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from "./Project.module.css";
import projects from "../../data/project.json";
import ProjectCard from "./ProjectCard";

export default function Project() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = projects.filter(project => {
    // 1. Category Filter
    const skillsJoined = project.skills.map(s => s.toLowerCase()).join(' ');

    let matchesCategory = true;
    if (activeCategory === 'fullstack') {
      matchesCategory = skillsJoined.includes('react') && (skillsJoined.includes('node') || skillsJoined.includes('express'));
    } else if (activeCategory === 'backend') {
      matchesCategory = (skillsJoined.includes('node') || skillsJoined.includes('express') || skillsJoined.includes('socket')) && !skillsJoined.includes('react');
    } else if (activeCategory === 'frontend') {
      matchesCategory = skillsJoined.includes('react') && !(skillsJoined.includes('mongodb') || skillsJoined.includes('node'));
    }

    // 2. Search query Filter
    const titleLower = project.title.toLowerCase();
    const matchesSearch = 
      titleLower.includes(searchQuery.toLowerCase()) || 
      skillsJoined.includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <motion.section 
      className={styles.container} 
      id="projects"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className={styles.title}>Projects</h2>

      {/* Filter and Search controls */}
      <div className={styles.controls}>
        <div className={styles.searchWrapper}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder="Search projects by title or tech stack (e.g. Redux, Socket.IO)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button className={styles.clearBtn} onClick={() => setSearchQuery('')}>×</button>
          )}
        </div>

        <div className={styles.projectTabs}>
          <button 
            className={`${styles.projectTab} ${activeCategory === 'all' ? styles.activeTab : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All Projects
          </button>
          <button 
            className={`${styles.projectTab} ${activeCategory === 'fullstack' ? styles.activeTab : ''}`}
            onClick={() => setActiveCategory('fullstack')}
          >
            Full Stack
          </button>
          <button 
            className={`${styles.projectTab} ${activeCategory === 'backend' ? styles.activeTab : ''}`}
            onClick={() => setActiveCategory('backend')}
          >
            Backend / API
          </button>
        </div>
      </div>

      <motion.div layout className={styles.projectsWrapper}>
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            <motion.div layout className={styles.projects}>
              {filteredProjects.map((project, id) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="no-results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={styles.noResults}
            >
              <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
              <h3>No projects found</h3>
              <p>We couldn't find any projects matching your search term. Try searching for other technologies like React, Node, or MongoDB.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}
