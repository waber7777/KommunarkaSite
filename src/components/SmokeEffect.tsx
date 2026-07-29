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

    // 1. Industrial Smoke Clouds Parameters
    const smokePuffCount = 28;
    const smokeColors = [
      "rgba(255, 160, 20, ",  // Warm ember amber mist
      "rgba(110, 115, 125, ", // Industrial smoke gray
      "rgba(60, 60, 70, ",    // Deep charcoal ash
      "rgba(190, 100, 30, "   // Copper rust haze
    ];

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

    const smokePuffs: SmokePuff[] = [];
    for (let i = 0; i < smokePuffCount; i++) {
      smokePuffs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseRadius: Math.random() * 250 + 180,
        speedX: (Math.random() - 0.4) * 0.35,
        speedY: -Math.random() * 0.18 - 0.05,
        waveFreq: Math.random() * 0.012 + 0.003,
        waveAmp: Math.random() * 2.2 + 0.6,
        alpha: Math.random() * 0.11 + 0.04,
        color: smokeColors[Math.floor(Math.random() * smokeColors.length)],
        angle: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.002
      });
    }

    // 2. Realistic Fire Embers Particle Physics System
    const emberCount = 55;

    interface RealisticEmber {
      x: number;
      y: number;
      size: number;
      maxSize: number;
      speedY: number;
      speedX: number;
      alpha: number;
      maxAlpha: number;
      wobbleFreq: number;
      wobbleAmp: number;
      life: number;
      maxLife: number;
      sparkleSpeed: number;
    }

    const createEmber = (initialY?: number): RealisticEmber => {
      const maxLife = Math.random() * 300 + 200;
      return {
        x: Math.random() * canvas.width,
        y: initialY !== undefined ? initialY : canvas.height + Math.random() * 100,
        size: Math.random() * 2.5 + 1.2,
        maxSize: Math.random() * 3.5 + 1.5,
        speedY: -Math.random() * 0.8 - 0.3, // Upward fire drift
        speedX: (Math.random() - 0.5) * 0.4,
        alpha: 0,
        maxAlpha: Math.random() * 0.7 + 0.3,
        wobbleFreq: Math.random() * 0.03 + 0.01,
        wobbleAmp: Math.random() * 1.8 + 0.5,
        life: 0,
        maxLife: maxLife,
        sparkleSpeed: Math.random() * 0.08 + 0.03
      };
    };

    const embers: RealisticEmber[] = [];
    for (let i = 0; i < emberCount; i++) {
      embers.push(createEmber(Math.random() * canvas.height));
    }

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- PASS 1: Render Smoke Clouds (Normal Composite) ---
      ctx.globalCompositeOperation = "source-over";

      smokePuffs.forEach((p) => {
        p.x += p.speedX + Math.sin(time * p.waveFreq) * p.waveAmp;
        p.y += p.speedY;
        p.angle += p.spinSpeed;

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

      // --- PASS 2: Render Realistic Glowing Fire Embers (Additive Glowing Blending) ---
      ctx.globalCompositeOperation = "lighter";

      embers.forEach((e, idx) => {
        e.life += 1;
        e.y += e.speedY;
        e.x += e.speedX + Math.sin(time * 2 + e.y * 0.02) * e.wobbleAmp;

        // Fade in at start, fade out at end of life
        const lifeRatio = e.life / e.maxLife;
        if (lifeRatio < 0.2) {
          e.alpha = (lifeRatio / 0.2) * e.maxAlpha;
        } else if (lifeRatio > 0.7) {
          e.alpha = (1 - (lifeRatio - 0.7) / 0.3) * e.maxAlpha;
        } else {
          e.alpha = e.maxAlpha;
        }

        // Respawn expired embers
        if (e.life >= e.maxLife || e.y < -20) {
          embers[idx] = createEmber();
          return;
        }

        // Fire Ember Color Gradient: Hot White Center -> Intense Golden Orange Outer Halo
        const glowRadius = e.size * 3.5;
        const emberGradient = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, glowRadius);
        
        // Temperature shifting: white-hot -> gold -> fiery red
        const currentAlpha = Math.max(0, e.alpha * (0.8 + 0.2 * Math.sin(time * 10 + e.x)));
        
        emberGradient.addColorStop(0, `rgba(255, 255, 240, ${currentAlpha})`);
        emberGradient.addColorStop(0.25, `rgba(255, 180, 20, ${currentAlpha * 0.9})`);
        emberGradient.addColorStop(0.6, `rgba(255, 75, 0, ${currentAlpha * 0.5})`);
        emberGradient.addColorStop(1, `rgba(200, 30, 0, 0)`);

        ctx.fillStyle = emberGradient;
        ctx.beginPath();
        ctx.arc(e.x, e.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Bright Core Spark
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.95})`;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * 0.6, 0, Math.PI * 2);
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
        className="w-full h-full opacity-90 mix-blend-screen"
      />
    </div>
  );
}
