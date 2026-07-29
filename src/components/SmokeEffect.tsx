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

    // Detect mobile viewport (under 768px)
    const isMobile = window.innerWidth < 768;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // 1. Adaptive Industrial Smoke Clouds - Light & Vivid Color Palette
    const smokePuffCount = isMobile ? 14 : 30;
    const smokeAlphaMult = isMobile ? 0.45 : 1.0;
    
    // Bright, vibrant, warm golden & light silver palette
    const smokeColors = [
      "rgba(255, 195, 60, ",   // Luminous warm amber mist
      "rgba(255, 225, 140, ",  // Bright golden haze
      "rgba(160, 165, 180, ",  // Soft silver smoke
      "rgba(240, 140, 45, "    // Bright copper ember glow
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
        baseRadius: (Math.random() * 220 + 160) * (isMobile ? 0.7 : 1.0),
        speedX: (Math.random() - 0.4) * 0.25,
        speedY: -Math.random() * 0.12 - 0.04,
        waveFreq: Math.random() * 0.01 + 0.003,
        waveAmp: Math.random() * 1.8 + 0.4,
        alpha: (Math.random() * 0.09 + 0.04) * smokeAlphaMult,
        color: smokeColors[Math.floor(Math.random() * smokeColors.length)],
        angle: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.002
      });
    }

    // 2. Soft Luminous Natural Embers
    const softEmberCount = isMobile ? 18 : 35;
    const emberSizeScale = isMobile ? 0.5 : 1.0;

    interface SoftEmber {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      alpha: number;
      pulseSpeed: number;
    }

    const softEmbers: SoftEmber[] = [];
    for (let i = 0; i < softEmberCount; i++) {
      softEmbers.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: (Math.random() * 1.6 + 0.5) * emberSizeScale,
        speedY: -Math.random() * 0.3 - 0.07,
        speedX: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.65 + 0.35, // More vivid and bright
        pulseSpeed: Math.random() * 0.03 + 0.01
      });
    }

    // 3. Bright Vivid Golden Micro Glowing Sparks
    const brightEmberCount = isMobile ? 10 : 16;
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
        size: (Math.random() * 1.1 + 0.5) * emberSizeScale,
        speedY: -Math.random() * 0.5 - 0.2,
        speedX: (Math.random() - 0.5) * 0.3,
        alpha: 0,
        maxAlpha: Math.random() * 0.7 + 0.3,
        life: 0,
        maxLife: Math.random() * 240 + 150
      };
    };

    const brightEmbers: BrightEmber[] = [];
    for (let i = 0; i < brightEmberCount; i++) {
      brightEmbers.push(createBrightEmber(Math.random() * canvas.height));
    }

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const beatCycle = (time * 6.28) % 3.14;
      const bpmPulse = Math.pow(Math.sin(beatCycle), 6) * (isMobile ? 0.15 : 0.3);

      // --- PASS 1: Render Luminous Smoke Clouds & Soft Embers ---
      ctx.globalCompositeOperation = "source-over";

      smokePuffs.forEach((p) => {
        p.x += p.speedX + Math.sin(time * p.waveFreq) * p.waveAmp;
        p.y += p.speedY;
        p.angle += p.spinSpeed;

        if (p.y < -p.baseRadius) {
          p.y = canvas.height + p.baseRadius;
          p.x = Math.random() * canvas.width;
        }

        const currentRadius = p.baseRadius + Math.sin(time * 1.2 + p.x * 0.005) * 15 + bpmPulse * 10;
        const currentAlpha = p.alpha + Math.sin(time * 1.1 + p.y * 0.005) * 0.015;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, currentRadius);
        gradient.addColorStop(0, `${p.color}${Math.max(0, currentAlpha)})`);
        gradient.addColorStop(0.5, `${p.color}${Math.max(0, currentAlpha * 0.4)})`);
        gradient.addColorStop(1, `${p.color}0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, currentRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Bright Golden Natural Embers
      softEmbers.forEach((e) => {
        e.y += e.speedY;
        e.x += e.speedX + Math.sin(time * 2 + e.y * 0.02) * 0.25;

        if (e.y < -10) {
          e.y = canvas.height + 10;
          e.x = Math.random() * canvas.width;
        }

        const currentAlpha = (e.alpha + bpmPulse * 0.1) * (0.65 + 0.35 * Math.sin(time * 3 + e.x));

        // Bright Warm Golden Yellow
        ctx.fillStyle = `rgba(255, 205, 50, ${Math.max(0, currentAlpha)})`;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * (1 + bpmPulse * 0.15), 0, Math.PI * 2);
        ctx.fill();
      });

      // --- PASS 2: Vivid Light Golden Accent Sparks ---
      ctx.globalCompositeOperation = "lighter";

      brightEmbers.forEach((e, idx) => {
        e.life += 1;
        e.y += e.speedY;
        e.x += e.speedX + Math.sin(time * 2.5 + e.y * 0.02) * 0.5;

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
        const currentAlpha = Math.min(1.0, Math.max(0, (e.alpha + bpmPulse * 0.1) * (0.85 + 0.15 * Math.sin(time * 6 + e.x))));
        
        const emberGradient = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, glowRadius);
        emberGradient.addColorStop(0, `rgba(255, 255, 245, ${currentAlpha})`);
        emberGradient.addColorStop(0.35, `rgba(255, 215, 60, ${currentAlpha * 0.85})`);
        emberGradient.addColorStop(0.7, `rgba(255, 120, 20, ${currentAlpha * 0.45})`);
        emberGradient.addColorStop(1, `rgba(220, 50, 0, 0)`);

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
        className="w-full h-full opacity-90 mix-blend-screen"
      />
    </div>
  );
}
