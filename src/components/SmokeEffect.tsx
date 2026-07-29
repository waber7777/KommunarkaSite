"use client";

import { useEffect, useRef } from "react";

export default function SmokeEffect() {
  const smokeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparkCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const smokeCanvas = smokeCanvasRef.current;
    const sparkCanvas = sparkCanvasRef.current;
    if (!smokeCanvas || !sparkCanvas) return;

    const smokeCtx = smokeCanvas.getContext("2d");
    const sparkCtx = sparkCanvas.getContext("2d");
    if (!smokeCtx || !sparkCtx) return;

    let animationFrameId: number;
    let time = 0;

    const isMobile = window.innerWidth < 768;

    const resizeCanvas = () => {
      smokeCanvas.width = window.innerWidth;
      smokeCanvas.height = window.innerHeight;
      sparkCanvas.width = window.innerWidth;
      sparkCanvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // 1. Dark, Subtle, Deep Copper-Amber Smoke Clouds (Strictly BEHIND all content on z-0)
    const smokePuffCount = isMobile ? 5 : 10;
    
    // Darker, rich copper-ruby amber palette (No bright white/yellowish washout)
    const smokeColors = [
      "rgba(180, 80, 10, ",   // Deep warm copper
      "rgba(140, 55, 5, ",    // Dark rich amber
      "rgba(110, 40, 5, ",    // Deep mahogany flame
      "rgba(45, 45, 55, "     // Dark industrial ash
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
        x: Math.random() * smokeCanvas.width,
        y: Math.random() * smokeCanvas.height,
        baseRadius: (Math.random() * 240 + 180) * (isMobile ? 0.75 : 1.0),
        speedX: (Math.random() - 0.4) * 0.05,
        speedY: -Math.random() * 0.02 - 0.005,
        waveFreq: Math.random() * 0.004 + 0.001,
        waveAmp: Math.random() * 1.2 + 0.3,
        // Much subtler, darker alpha transparency
        alpha: Math.random() * 0.04 + 0.02,
        color: smokeColors[Math.floor(Math.random() * smokeColors.length)],
        angle: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.0008
      });
    }

    // 2. Soft Natural Embers
    const softEmberCount = isMobile ? 14 : 28;
    const emberSizeScale = isMobile ? 0.5 : 1.0;

    interface SoftEmber {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      alpha: number;
    }

    const softEmbers: SoftEmber[] = [];
    for (let i = 0; i < softEmberCount; i++) {
      softEmbers.push({
        x: Math.random() * sparkCanvas.width,
        y: Math.random() * sparkCanvas.height,
        size: (Math.random() * 1.5 + 0.5) * emberSizeScale,
        speedY: -Math.random() * 0.2 - 0.05,
        speedX: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    // 3. Subtle Micro Golden Sparks
    const brightEmberCount = isMobile ? 6 : 12;
    interface BrightEmber {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      alpha: number;
      maxAlpha: number;
      life: number;
      maxLife: number;
    }

    const createBrightEmber = (initialY?: number): BrightEmber => {
      return {
        x: Math.random() * sparkCanvas.width,
        y: initialY !== undefined ? initialY : sparkCanvas.height + Math.random() * 40,
        size: (Math.random() * 1.1 + 0.4) * emberSizeScale,
        speedY: -Math.random() * 0.4 - 0.15,
        speedX: (Math.random() - 0.5) * 0.2,
        alpha: 0,
        maxAlpha: Math.random() * 0.65 + 0.25,
        life: 0,
        maxLife: Math.random() * 280 + 180
      };
    };

    const brightEmbers: BrightEmber[] = [];
    for (let i = 0; i < brightEmberCount; i++) {
      brightEmbers.push(createBrightEmber(Math.random() * sparkCanvas.height));
    }

    const render = () => {
      time += 0.008;
      smokeCtx.clearRect(0, 0, smokeCanvas.width, smokeCanvas.height);
      sparkCtx.clearRect(0, 0, sparkCanvas.width, sparkCanvas.height);

      const beatCycle = (time * 6.28) % 3.14;
      const bpmPulse = Math.pow(Math.sin(beatCycle), 6) * 0.15;

      // --- CANVAS 1 (z-0): DARKER DEEP COPPER BACKGROUND SMOKE (Strictly BEHIND all cards) ---
      smokeCtx.globalCompositeOperation = "source-over";

      smokePuffs.forEach((p) => {
        p.x += p.speedX + Math.sin(time * p.waveFreq) * p.waveAmp;
        p.y += p.speedY;
        p.angle += p.spinSpeed;

        if (p.y < -p.baseRadius) {
          p.y = smokeCanvas.height + p.baseRadius;
          p.x = Math.random() * smokeCanvas.width;
        }

        const currentRadius = p.baseRadius + Math.sin(time * 0.6 + p.x * 0.003) * 15 + bpmPulse * 8;
        const currentAlpha = p.alpha + Math.sin(time * 0.5 + p.y * 0.003) * 0.005;

        smokeCtx.save();
        smokeCtx.translate(p.x, p.y);
        smokeCtx.rotate(p.angle);

        const gradient = smokeCtx.createRadialGradient(0, 0, 0, 0, 0, currentRadius);
        gradient.addColorStop(0, `${p.color}${Math.max(0, currentAlpha * 1.2)})`);
        gradient.addColorStop(0.5, `${p.color}${Math.max(0, currentAlpha * 0.5)})`);
        gradient.addColorStop(1, `${p.color}0)`);

        smokeCtx.fillStyle = gradient;
        smokeCtx.beginPath();
        smokeCtx.arc(0, 0, currentRadius, 0, Math.PI * 2);
        smokeCtx.fill();
        smokeCtx.restore();
      });

      // --- CANVAS 2 (z-25): FOREGROUND SPARKS & EMBERS ---
      sparkCtx.globalCompositeOperation = "source-over";

      softEmbers.forEach((e) => {
        e.y += e.speedY;
        e.x += e.speedX + Math.sin(time * 1.5 + e.y * 0.02) * 0.15;

        if (e.y < -10) {
          e.y = sparkCanvas.height + 10;
          e.x = Math.random() * sparkCanvas.width;
        }

        const currentAlpha = (e.alpha + bpmPulse * 0.1) * (0.7 + 0.3 * Math.sin(time * 2.0 + e.x));

        sparkCtx.fillStyle = `rgba(235, 140, 20, ${Math.max(0, currentAlpha)})`;
        sparkCtx.beginPath();
        sparkCtx.arc(e.x, e.y, e.size * (1 + bpmPulse * 0.1), 0, Math.PI * 2);
        sparkCtx.fill();
      });

      sparkCtx.globalCompositeOperation = "lighter";

      brightEmbers.forEach((e, idx) => {
        e.life += 1;
        e.y += e.speedY;
        e.x += e.speedX + Math.sin(time * 2.0 + e.y * 0.02) * 0.3;

        const lifeRatio = e.life / e.maxLife;
        if (lifeRatio < 0.15) {
          e.alpha = (lifeRatio / 0.15) * e.maxAlpha;
        } else if (lifeRatio > 0.75) {
          e.alpha = (1 - (lifeRatio - 0.75) / 0.25) * e.maxAlpha;
        } else {
          e.alpha = e.maxAlpha;
        }

        if (e.life >= e.maxLife || e.y < -20) {
          brightEmbers[idx] = createBrightEmber();
          return;
        }

        const glowRadius = (e.size * 2.6) * (1 + bpmPulse * 0.15);
        const currentAlpha = Math.min(1.0, Math.max(0, (e.alpha + bpmPulse * 0.08) * (0.85 + 0.15 * Math.sin(time * 4 + e.x))));
        
        const emberGradient = sparkCtx.createRadialGradient(e.x, e.y, 0, e.x, e.y, glowRadius);
        emberGradient.addColorStop(0, `rgba(255, 245, 220, ${currentAlpha})`);
        emberGradient.addColorStop(0.35, `rgba(240, 160, 20, ${currentAlpha * 0.8})`);
        emberGradient.addColorStop(0.7, `rgba(210, 80, 10, ${currentAlpha * 0.4})`);
        emberGradient.addColorStop(1, `rgba(180, 30, 0, 0)`);

        sparkCtx.fillStyle = emberGradient;
        sparkCtx.beginPath();
        sparkCtx.arc(e.x, e.y, glowRadius, 0, Math.PI * 2);
        sparkCtx.fill();

        sparkCtx.fillStyle = `rgba(255, 255, 255, ${Math.min(1.0, currentAlpha * 1.1)})`;
        sparkCtx.beginPath();
        sparkCtx.arc(e.x, e.y, e.size * 0.65, 0, Math.PI * 2);
        sparkCtx.fill();
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
    <>
      {/* 1. Darker Deep Copper Background Smoke Canvas (z-0 BEHIND all cards) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <canvas
          ref={smokeCanvasRef}
          className="w-full h-full opacity-60 mix-blend-screen"
        />
      </div>

      {/* 2. Spark/Ember Canvas Layer (z-25 flying embers) */}
      <div className="fixed inset-0 pointer-events-none z-25 overflow-hidden">
        <canvas
          ref={sparkCanvasRef}
          className="w-full h-full opacity-90 mix-blend-screen"
        />
      </div>
    </>
  );
}
