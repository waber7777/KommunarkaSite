"use client";

import { useEffect, useRef } from "react";
import { getBassLevel } from "@/components/AmbientAudio";

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

    // 1. Industrial Smoke Clouds
    const smokePuffCount = 30;
    const smokeColors = [
      "rgba(255, 170, 30, ",  // Warm amber
      "rgba(120, 125, 135, ", // Charcoal fog
      "rgba(65, 65, 75, ",    // Ash mist
      "rgba(210, 110, 35, "   // Copper rust
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

    // 2. High-Response Audio-Synced Fire Embers System
    const emberCount = 60;

    interface RealisticEmber {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      alpha: number;
      maxAlpha: number;
      wobbleFreq: number;
      wobbleAmp: number;
      life: number;
      maxLife: number;
    }

    const createEmber = (initialY?: number): RealisticEmber => {
      return {
        x: Math.random() * canvas.width,
        y: initialY !== undefined ? initialY : canvas.height + Math.random() * 60,
        size: Math.random() * 3.5 + 1.8,
        speedY: -Math.random() * 1.2 - 0.4,
        speedX: (Math.random() - 0.5) * 0.5,
        alpha: 0,
        maxAlpha: Math.random() * 0.85 + 0.35,
        wobbleFreq: Math.random() * 0.03 + 0.01,
        wobbleAmp: Math.random() * 2.2 + 0.8,
        life: 0,
        maxLife: Math.random() * 280 + 180
      };
    };

    const embers: RealisticEmber[] = [];
    for (let i = 0; i < emberCount; i++) {
      embers.push(createEmber(Math.random() * canvas.height));
    }

    let smoothedBass = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Read Web Audio API Bass level
      const liveBass = getBassLevel(); // 0..255
      
      // Calculate beat pulse intensity (live audio vs 120BPM beat pulse)
      if (liveBass > 30) {
        // Active audio analysis
        const target = (liveBass / 255);
        smoothedBass = smoothedBass * 0.6 + target * 0.4;
      } else {
        // Fallback 120 BPM rhythmic kick beat simulation (every 0.5 sec)
        const beatCycle = (time * 6.28) % 3.14; // 120 BPM tempo
        const kickPulse = Math.pow(Math.sin(beatCycle), 8);
        smoothedBass = kickPulse * 0.7;
      }

      // Dynamic Beat Scale Factor
      const beatIntensity = Math.min(1.0, Math.max(0, smoothedBass));
      const sparkPulseScale = 1.0 + beatIntensity * 1.6; // Up to +160% size pulse on kick

      // --- PASS 1: Render Background Smoke Clouds ---
      ctx.globalCompositeOperation = "source-over";

      smokePuffs.forEach((p) => {
        p.x += p.speedX + Math.sin(time * p.waveFreq) * p.waveAmp;
        p.y += p.speedY;
        p.angle += p.spinSpeed;

        if (p.y < -p.baseRadius) {
          p.y = canvas.height + p.baseRadius;
          p.x = Math.random() * canvas.width;
        }

        const currentRadius = (p.baseRadius + Math.sin(time * 1.2 + p.x * 0.005) * 25) * (1 + beatIntensity * 0.15);
        const currentAlpha = p.alpha + Math.sin(time * 1.1 + p.y * 0.005) * 0.02 + beatIntensity * 0.02;

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

      // --- PASS 2: Rhythmic Glowing Fire Embers (Additive Glowing Blending) ---
      ctx.globalCompositeOperation = "lighter";

      embers.forEach((e, idx) => {
        e.life += 1;
        // Kick beat speeds up upward movement temporarily
        e.y += e.speedY * (1 + beatIntensity * 0.6);
        e.x += e.speedX + Math.sin(time * 2.5 + e.y * 0.02) * e.wobbleAmp;

        const lifeRatio = e.life / e.maxLife;
        if (lifeRatio < 0.15) {
          e.alpha = (lifeRatio / 0.15) * e.maxAlpha;
        } else if (lifeRatio > 0.75) {
          e.alpha = (1 - (lifeRatio - 0.75) / 0.25) * e.maxAlpha;
        } else {
          e.alpha = e.maxAlpha;
        }

        if (e.life >= e.maxLife || e.y < -20) {
          embers[idx] = createEmber();
          return;
        }

        // Fire Ember Pulsing Size and Glow Radius
        const currentSize = e.size * sparkPulseScale;
        const glowRadius = currentSize * 3.8;
        
        const currentAlpha = Math.min(1.0, Math.max(0, (e.alpha + beatIntensity * 0.4) * (0.85 + 0.15 * Math.sin(time * 8 + e.x))));
        
        const emberGradient = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, glowRadius);
        emberGradient.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha})`);
        emberGradient.addColorStop(0.3, `rgba(255, 190, 30, ${currentAlpha * 0.95})`);
        emberGradient.addColorStop(0.7, `rgba(255, 60, 0, ${currentAlpha * 0.55})`);
        emberGradient.addColorStop(1, `rgba(200, 20, 0, 0)`);

        ctx.fillStyle = emberGradient;
        ctx.beginPath();
        ctx.arc(e.x, e.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Hot Inner Core Spark
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1.0, currentAlpha * 1.2)})`;
        ctx.beginPath();
        ctx.arc(e.x, e.y, currentSize * 0.85, 0, Math.PI * 2);
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
        className="w-full h-full opacity-95 mix-blend-screen"
      />
    </div>
  );
}
