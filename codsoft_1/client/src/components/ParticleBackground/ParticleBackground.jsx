import React, { useRef, useEffect } from "react";
import styles from "./ParticleBackground.module.css";

const PARTICLE_COUNT = 90;
const MAX_DIST = 140;         // max px distance to draw a connecting line
const MOUSE_RADIUS = 180;     // how far the mouse repels particles
const BASE_SPEED = 0.35;

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "255,255,255";
}

// Colour palette pulled from vars.css accents
const COLOURS = [
  "#00f2fe", // cyan
  "#7f00ff", // purple
  "#576cbc", // primary blue
  "#ff007f", // pink (used sparingly)
];

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const animFrameRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // ---------- helpers ----------
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const makeParticle = (width, height) => {
      const colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * BASE_SPEED * 2,
        vy: (Math.random() - 0.5) * BASE_SPEED * 2,
        radius: Math.random() * 1.8 + 0.8,
        colour,
        rgb: hexToRgb(colour),
        opacity: Math.random() * 0.5 + 0.4,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
      };
    };

    const initParticles = () => {
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
        makeParticle(canvas.width, canvas.height)
      );
    };

    // ---------- draw ----------
    const draw = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const { x: mx, y: my } = mouse.current;

      // update & draw each particle
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.vx += (dx / dist) * force * 0.5;
          p.vy += (dy / dist) * force * 0.5;
        }

        // damping so particles don't fly off indefinitely
        p.vx *= 0.99;
        p.vy *= 0.99;

        // clamp speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.5) {
          p.vx = (p.vx / speed) * 1.5;
          p.vy = (p.vy / speed) * 1.5;
        }

        p.x += p.vx;
        p.y += p.vy;

        // wrap around edges
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // pulsing opacity
        p.pulsePhase += p.pulseSpeed;
        const pulse = (Math.sin(p.pulsePhase) * 0.2 + 0.8);

        // draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.rgb}, ${p.opacity * pulse})`;
        ctx.fill();

        // tiny glow halo
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 5 * pulse);
        glow.addColorStop(0, `rgba(${p.rgb}, ${0.15 * pulse})`);
        glow.addColorStop(1, `rgba(${p.rgb}, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 5 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // draw connecting lines to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const ldx = p.x - q.x;
          const ldy = p.y - q.y;
          const lDist = Math.sqrt(ldx * ldx + ldy * ldy);

          if (lDist < MAX_DIST) {
            const alpha = (1 - lDist / MAX_DIST) * 0.25;

            // blend the two particle colours via gradient
            const grad = ctx.createLinearGradient(p.x, p.y, q.x, q.y);
            grad.addColorStop(0, `rgba(${p.rgb}, ${alpha})`);
            grad.addColorStop(1, `rgba(${q.rgb}, ${alpha})`);

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    // ---------- boot ----------
    resize();
    initParticles();
    animFrameRef.current = requestAnimationFrame(draw);

    const handleResize = () => {
      resize();
      initParticles();
    };

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
