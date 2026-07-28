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
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Dynamic Smoke Puffs + Slow Floating Ash Embers
    const smokePuffCount = 32;
    const emberCount = 40;

    interface SmokePuff {
      x: number;
      y: number;
      baseRadius: number;
      speedX: number;
      speedY: number;
      waveFreq: number;
      waveAmp: number;
      alpha: number;
      color: string;
      angle: number;
      spinSpeed: number;
    }

    interface Ember {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      alpha: number;
      pulseSpeed: number;
    }

    const smokeColors = [
      "rgba(255, 183, 3, ",   // Warm amber smoke glow
      "rgba(140, 140, 150, ",  // Industrial charcoal fog
      "rgba(80, 80, 95, ",     // Deep ash mist
      "rgba(210, 130, 40, "   // Ember haze
    ];

    const smokePuffs: SmokePuff[] = [];
    for (let i = 0; i < smokePuffCount; i++) {
      smokePuffs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseRadius: Math.random() * 240 + 180,
        speedX: (Math.random() - 0.4) * 0.3, // Slower horizontal drift
        speedY: -Math.random() * 0.18 - 0.05, // Slower upward mist movement
        waveFreq: Math.random() * 0.015 + 0.003,
        waveAmp: Math.random() * 2.0 + 0.5,
        alpha: Math.random() * 0.12 + 0.04,
        color: smokeColors[Math.floor(Math.random() * smokeColors.length)],
        angle: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.002
      });
    }

    const embers: Ember[] = [];
    for (let i = 0; i < emberCount; i++) {
      embers.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.2 + 0.8,
        speedY: -Math.random() * 0.35 - 0.08, // Slower ash lift
        speedX: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.7 + 0.2,
        pulseSpeed: Math.random() * 0.03 + 0.01
      });
    }

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render Floating Smoke Clouds
      smokePuffs.forEach((p) => {
        p.x += p.speedX + Math.sin(time * p.waveFreq) * p.waveAmp;
        p.y += p.speedY;
        p.angle += p.spinSpeed;

        // Wrap around viewport boundaries smoothly
        if (p.y < -p.baseRadius) {
          p.y = canvas.height + p.baseRadius;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -p.baseRadius) p.x = canvas.width + p.baseRadius;
        if (p.x > canvas.width + p.baseRadius) p.x = -p.baseRadius;

        const currentRadius = p.baseRadius + Math.sin(time * 1.2 + p.x * 0.005) * 25;
        const currentAlpha = p.alpha + Math.sin(time * 1.1 + p.y * 0.005) * 0.02;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, currentRadius);
        gradient.addColorStop(0, `${p.color}${Math.max(0, currentAlpha)})`);
        gradient.addColorStop(0.5, `${p.color}${Math.max(0, currentAlpha * 0.35)})`);
        gradient.addColorStop(1, `${p.color}0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, currentRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Render Slow Floating Embers & Sparks
      embers.forEach((e) => {
        e.y += e.speedY;
        e.x += e.speedX + Math.sin(time * 2 + e.y * 0.02) * 0.3;

        if (e.y < -10) {
          e.y = canvas.height + 10;
          e.x = Math.random() * canvas.width;
        }

        const currentAlpha = e.alpha * (0.6 + 0.4 * Math.sin(time * 3 + e.x));

        ctx.fillStyle = `rgba(255, 183, 3, ${Math.max(0, currentAlpha)})`;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
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
    <div className="fixed inset-0 pointer-events-none z-15 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-80 mix-blend-screen"
      />
    </div>
  );
}
