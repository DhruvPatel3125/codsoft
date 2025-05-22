import React, { useState } from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  const [isDownloading, setIsDownloading] = useState(false);

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
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hello, I'm Dhruv</h1>
        <p className={styles.description}>
          I'm a MERN Stack Developer specializing in MongoDB, Express.js, React.js,
          and Node.js. I build scalable web applications with modern technologies
          and best practices. Let's create something amazing together!
        </p>
        <div className={styles.buttonGroup}>
          <a href="mailto:dhruvjpatel5@gmail.com" className={styles.contactBtn}>
            Contact Me
          </a>
          <button 
            onClick={handleDownloadCV} 
            className={`${styles.downloadBtn} ${isDownloading ? styles.downloading : ''}`}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <div className={styles.loadingSpinner} />
            ) : (
              <>
                {/* <FontAwesomeIcon icon="fas fa-download" /> */}
                Download CV
              </>
            )}
          </button>
        </div>
      </div>

      <img
        src="/hero/heroImage.png"
        alt="Hero Illustration"
        className={styles.heroImage}
      />

      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
}
