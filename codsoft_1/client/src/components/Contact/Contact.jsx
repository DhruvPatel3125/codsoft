import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from "./Contact.module.css";

import emailIcon from "/contact/emailIcon.png";
import linkedinIcon from "/contact/linkedinIcon.png";
import githubIcon from "/contact/githubIcon.png";

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.message.trim()) tempErrors.message = "Message is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error as typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');

    // Simulate API request
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <motion.footer 
      id="contact" 
      className={styles.container}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7 }}
    >
      <div className={styles.layout}>
        {/* Left Side: Contact Information */}
        <motion.div 
          className={styles.infoColumn}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className={styles.text}>
            <h2>Get In Touch</h2>
            <p>Let's collaborate! Feel free to drop a message or connect via social networks.</p>
          </div>
          <ul className={styles.links}>
            <motion.li 
              className={styles.link}
              whileHover={{ x: 6, color: "var(--color-accent-cyan)" }}
            >
              <div className={styles.iconWrapper}>
                <img
                  src={emailIcon}
                  alt="Email Icon"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <svg className={styles.svgFallback} viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <a href="mailto:dhruvjpatel5@gmail.com">dhruvjpatel5@gmail.com</a>
            </motion.li>
            <motion.li 
              className={styles.link}
              whileHover={{ x: 6, color: "var(--color-accent-cyan)" }}
            >
              <div className={styles.iconWrapper}>
                <img
                  src={linkedinIcon}
                  alt="LinkedIn Icon"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <svg className={styles.svgFallback} viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </div>
              <a href="https://www.linkedin.com/in/dhruvpatel312/" target="_blank" rel="noopener noreferrer">linkedin.com/in/dhruvpatel312</a>
            </motion.li>
            <motion.li 
              className={styles.link}
              whileHover={{ x: 6, color: "var(--color-accent-cyan)" }}
            >
              <div className={styles.iconWrapper}>
                <img
                  src={githubIcon}
                  alt="GitHub Icon"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <svg className={styles.svgFallback} viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </div>
              <a href="https://github.com/DhruvPatel3125" target="_blank" rel="noopener noreferrer">github.com/DhruvPatel3125</a>
            </motion.li>
          </ul>
        </motion.div>

        {/* Right Side: Interactive Form */}
        <motion.div 
          className={styles.formColumn}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={styles.successWrapper}
              >
                <div className={styles.successIcon}>
                  <svg viewBox="0 0 24 24" width="60" height="60" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out, Dhruv will get back to you shortly.</p>
                <motion.button 
                  onClick={() => setStatus('idle')} 
                  className={styles.resetBtn}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Send another message
                </motion.button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                onSubmit={handleSubmit} 
                className={styles.form}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.inputGroup}>
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={errors.name ? styles.inputError : ''}
                    disabled={status === 'sending'}
                  />
                  {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={errors.email ? styles.inputError : ''}
                    disabled={status === 'sending'}
                  />
                  {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hi Dhruv, I'd love to connect on a new project..."
                    className={errors.message ? styles.inputError : ''}
                    disabled={status === 'sending'}
                  />
                  {errors.message && <span className={styles.errorMessage}>{errors.message}</span>}
                </div>

                <motion.button
                  type="submit"
                  className={`${styles.submitBtn} ${status === 'sending' ? styles.btnSending : ''}`}
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.02, backgroundColor: "var(--color-primary-dark)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  {status === 'sending' ? (
                    <>
                      <div className={styles.spinner} />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" style={{marginLeft: '8px'}}><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      <div className={styles.copyright}>
        <p>&copy; {new Date().getFullYear()} Dhruv Patel. All rights reserved.</p>
      </div>
    </motion.footer>
  );
}
