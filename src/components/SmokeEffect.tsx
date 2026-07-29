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

    const isMobile = window.innerWidth < 768;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // 1. Vibrant Orange-Golden Smoke Clouds (Distinct Puffs, Slow Dissipation)
    const smokePuffCount = isMobile ? 12 : 24;
    
    // Rich Orange & Warm Golden Palette
    const smokeColors = [
      "rgba(255, 140, 20, ",   // Rich warm orange
      "rgba(255, 175, 40, ",   // Luminous golden amber
      "rgba(240, 110, 15, ",   // Deep fiery copper
      "rgba(255, 200, 70, "    // Bright warm gold
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
        // Compact radius to keep open black space between clouds
        baseRadius: (Math.random() * 110 + 90) * (isMobile ? 0.75 : 1.0),
        speedX: (Math.random() - 0.4) * 0.2, // Slow majestic drift
        speedY: -Math.random() * 0.1 - 0.03, // Very slow dissipation
        waveFreq: Math.random() * 0.008 + 0.002,
        waveAmp: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.12 + 0.06, // Richer opacity
        color: smokeColors[Math.floor(Math.random() * smokeColors.length)],
        angle: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.0015
      });
    }

    // 2. Soft Luminous Natural Embers
    const softEmberCount = isMobile ? 16 : 32;
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
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: (Math.random() * 1.6 + 0.6) * emberSizeScale,
        speedY: -Math.random() * 0.25 - 0.06,
        speedX: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.6 + 0.3
      });
    }

    // 3. Bright Micro Golden Sparks
    const brightEmberCount = isMobile ? 8 : 14;
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
        x: Math.random() * canvas.width,
        y: initialY !== undefined ? initialY : canvas.height + Math.random() * 40,
        size: (Math.random() * 1.2 + 0.5) * emberSizeScale,
        speedY: -Math.random() * 0.45 - 0.18,
        speedX: (Math.random() - 0.5) * 0.25,
        alpha: 0,
        maxAlpha: Math.random() * 0.75 + 0.3,
        life: 0,
        maxLife: Math.random() * 260 + 160
      };
    };

    const brightEmbers: BrightEmber[] = [];
    for (let i = 0; i < brightEmberCount; i++) {
      brightEmbers.push(createBrightEmber(Math.random() * canvas.height));
    }

    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const beatCycle = (time * 6.28) % 3.14;
      const bpmPulse = Math.pow(Math.sin(beatCycle), 6) * 0.2;

      // --- PASS 1: Render Vivid Orange-Golden Smoke Clouds (Clear Puff Shape) ---
      ctx.globalCompositeOperation = "source-over";

      smokePuffs.forEach((p) => {
        p.x += p.speedX + Math.sin(time * p.waveFreq) * p.waveAmp;
        p.y += p.speedY;
        p.angle += p.spinSpeed;

        if (p.y < -p.baseRadius) {
          p.y = canvas.height + p.baseRadius;
          p.x = Math.random() * canvas.width;
        }

        const currentRadius = p.baseRadius + Math.sin(time * 0.8 + p.x * 0.005) * 12 + bpmPulse * 8;
        const currentAlpha = p.alpha + Math.sin(time * 0.7 + p.y * 0.005) * 0.01;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        // Distinct Smoke Puff Radial Gradient with vibrant center and slow falloff
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, currentRadius);
        gradient.addColorStop(0, `${p.color}${Math.max(0, currentAlpha * 1.3)})`);
        gradient.addColorStop(0.4, `${p.color}${Math.max(0, currentAlpha * 0.7)})`);
        gradient.addColorStop(0.8, `${p.color}${Math.max(0, currentAlpha * 0.2)})`);
        gradient.addColorStop(1, `${p.color}0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, currentRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Soft Natural Embers
      softEmbers.forEach((e) => {
        e.y += e.speedY;
        e.x += e.speedX + Math.sin(time * 1.8 + e.y * 0.02) * 0.2;

        if (e.y < -10) {
          e.y = canvas.height + 10;
          e.x = Math.random() * canvas.width;
        }

        const currentAlpha = (e.alpha + bpmPulse * 0.1) * (0.7 + 0.3 * Math.sin(time * 2.5 + e.x));

        ctx.fillStyle = `rgba(255, 170, 30, ${Math.max(0, currentAlpha)})`;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * (1 + bpmPulse * 0.12), 0, Math.PI * 2);
        ctx.fill();
      });

      // --- PASS 2: Vivid Light Golden Accent Sparks ---
      ctx.globalCompositeOperation = "lighter";

      brightEmbers.forEach((e, idx) => {
        e.life += 1;
        e.y += e.speedY;
        e.x += e.speedX + Math.sin(time * 2.2 + e.y * 0.02) * 0.4;

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

        const glowRadius = (e.size * 2.8) * (1 + bpmPulse * 0.2);
        const currentAlpha = Math.min(1.0, Math.max(0, (e.alpha + bpmPulse * 0.08) * (0.85 + 0.15 * Math.sin(time * 5 + e.x))));
        
        const emberGradient = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, glowRadius);
        emberGradient.addColorStop(0, `rgba(255, 255, 245, ${currentAlpha})`);
        emberGradient.addColorStop(0.35, `rgba(255, 185, 30, ${currentAlpha * 0.85})`);
        emberGradient.addColorStop(0.7, `rgba(255, 100, 10, ${currentAlpha * 0.45})`);
        emberGradient.addColorStop(1, `rgba(210, 40, 0, 0)`);

        ctx.fillStyle = emberGradient;
        ctx.beginPath();
        ctx.arc(e.x, e.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1.0, currentAlpha * 1.2)})`;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * 0.7, 0, Math.PI * 2);
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
