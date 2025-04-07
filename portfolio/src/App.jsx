import React from 'react'
import style from "./App.module.css"
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Experience from './components/Experience/Experiance';
import Project from './components/Project/Project';
import ErrorBoundary from './components/ErrorBoundary';
import Contact from './components/Contact/Contact';

function App() {
  return (
    <div className={style.App}>
      <Navbar/>
      <Hero/>
      <About/>
      <Experience/>
      <ErrorBoundary>
        <Project/>
      </ErrorBoundary>
      <Contact/>
    </div>
  )
}

export default App
