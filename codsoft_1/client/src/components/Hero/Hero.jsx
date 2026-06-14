import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";

export default function Hero() {
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Custom Typewriter logic
  const words = ["MERN Stack Developer", "Full-Stack Engineer", "React & Node Specialist"];
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleType = () => {
      const currentWord = words[wordIndex];
      if (!isDeleting) {
        // Typing
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        if (currentText === currentWord) {
          // Pause before deleting
          setTypingSpeed(2000);
          setIsDeleting(true);
        } else {
          setTypingSpeed(100);
        }
      } else {
        // Deleting
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(500);
        } else {
          setTypingSpeed(50);
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, typingSpeed]);

  const handleDownloadCV = async () => {
    try {
      setIsDownloading(true);
      const response = await fetch('/resume/DhruvPatel_Resume.pdf');
      
      if (!response.ok) {
        throw new Error('Resume not found');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'DhruvPatel_Resume.pdf';
      
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Unable to download resume. Please try again later.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className={styles.container} id="hero">
      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Hello, I'm Dhruv
        </motion.h1>
        
        {/* Dynamic Typewriter text */}
        <motion.h2 
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          I am a <span>{currentText}</span>
          <span className={styles.cursor}>|</span>
        </motion.h2>

        <motion.p 
          className={styles.description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          I specialize in MongoDB, Express.js, React.js, and Node.js. 
          I build scalable, modern web applications with clean architectures and micro-animations.
        </motion.p>

        {/* Social Media Link Icons */}
        <motion.div 
          className={styles.socials}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.a 
            href="https://github.com/DhruvPatel3125" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.socialLink} 
            aria-label="GitHub"
            whileHover={{ y: -5, scale: 1.1, borderColor: "var(--color-accent-cyan)" }}
            whileTap={{ scale: 0.95 }}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </motion.a>
          <motion.a 
            href="https://www.linkedin.com/in/dhruvpatel312/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.socialLink} 
            aria-label="LinkedIn"
            whileHover={{ y: -5, scale: 1.1, borderColor: "var(--color-accent-cyan)" }}
            whileTap={{ scale: 0.95 }}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </motion.a>
          <motion.a 
            href="mailto:dhruvjpatel5@gmail.com" 
            className={styles.socialLink} 
            aria-label="Email"
            whileHover={{ y: -5, scale: 1.1, borderColor: "var(--color-accent-cyan)" }}
            whileTap={{ scale: 0.95 }}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </motion.a>
        </motion.div>

        <motion.div 
          className={styles.buttonGroup}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <motion.a 
            href="#contact" 
            className={styles.contactBtn}
            whileHover={{ y: -3, scale: 1.05, boxShadow: "0 8px 25px rgba(87, 108, 188, 0.6)" }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Me
          </motion.a>
          <motion.button 
            onClick={handleDownloadCV} 
            className={`${styles.downloadBtn} ${isDownloading ? styles.downloading : ''}`}
            disabled={isDownloading}
            whileHover={{ y: -3, scale: 1.05, borderColor: "var(--color-accent-purple)", boxShadow: "var(--glass-glow-purple)" }}
            whileTap={{ scale: 0.98 }}
          >
            {isDownloading ? (
              <div className={styles.loadingSpinner} />
            ) : (
              <>
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download Resume
              </>
            )}
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div 
        className={styles.imageContainer}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3, type: "spring", stiffness: 80 }}
      >
        <div className={styles.imageBorderGlow}>
          <img
            src="/hero/heroImage.png"
            alt="Dhruv Patel Portrait"
            className={styles.heroImage}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&auto=format&fit=crop";
            }}
          />
        </div>
      </motion.div>

      {/* Bouncy Scroll Down Indicator */}
      <motion.a 
        href="#about" 
        className={styles.scrollIndicator} 
        aria-label="Scroll Down"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 24 24" width="30" height="30" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
      </motion.a>
    </section>
  );
}
