"use client";

import { useEffect, useRef } from "react";

export default function SmokeEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle system for smoke/fog
    const particleCount = 45;
    const particles: Particle[] = [];

    interface Particle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      maxAlpha: number;
      growth: number;
      color: string;
    }

    // Industrial palette: subtle charcoal gray, dark amber mist, warm ash
    const colors = [
      "rgba(255, 183, 3, ",  // Warm accent amber glow
      "rgba(120, 120, 120, ", // Industrial smoke gray
      "rgba(40, 40, 45, ",    // Dark ash mist
      "rgba(200, 140, 60, "   // Warm ember haze
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 250 + 150,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.2 - 0.15, // Slow upward/horizontal drift
        alpha: Math.random() * 0.15,
        maxAlpha: Math.random() * 0.12 + 0.04,
        growth: (Math.random() - 0.5) * 0.05,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < -p.radius) p.x = canvas.width + p.radius;
        if (p.x > canvas.width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = canvas.height + p.radius;
        if (p.y > canvas.height + p.radius) p.y = -p.radius;

        // Radial smoke gradient
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, `${p.color}${p.maxAlpha})`);
        gradient.addColorStop(0.5, `${p.color}${p.maxAlpha * 0.4})`);
        gradient.addColorStop(1, `${p.color}0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-15 opacity-80 mix-blend-screen"
    />
  );
}
