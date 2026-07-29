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

    // 1. Vibrant Orange-Golden Clouds (Rendered BEHIND artwork cards on z-0)
    const smokePuffCount = isMobile ? 6 : 12;
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
        x: Math.random() * smokeCanvas.width,
        y: Math.random() * smokeCanvas.height,
        baseRadius: (Math.random() * 260 + 200) * (isMobile ? 0.75 : 1.0),
        speedX: (Math.random() - 0.4) * 0.06,
        speedY: -Math.random() * 0.03 - 0.008,
        waveFreq: Math.random() * 0.004 + 0.001,
        waveAmp: Math.random() * 1.2 + 0.3,
        alpha: Math.random() * 0.12 + 0.05,
        color: smokeColors[Math.floor(Math.random() * smokeColors.length)],
        angle: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.0008
      });
    }

    // 2. Soft Natural Embers
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
        x: Math.random() * sparkCanvas.width,
        y: Math.random() * sparkCanvas.height,
        size: (Math.random() * 1.6 + 0.6) * emberSizeScale,
        speedY: -Math.random() * 0.2 - 0.05,
        speedX: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.6 + 0.3
      });
    }

    // 3. Bright Micro Golden Sparks (Rendered OVER cards on z-25)
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
        x: Math.random() * sparkCanvas.width,
        y: initialY !== undefined ? initialY : sparkCanvas.height + Math.random() * 40,
        size: (Math.random() * 1.2 + 0.5) * emberSizeScale,
        speedY: -Math.random() * 0.4 - 0.15,
        speedX: (Math.random() - 0.5) * 0.2,
        alpha: 0,
        maxAlpha: Math.random() * 0.75 + 0.3,
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

      // --- CANVAS 1 (z-0): BACKGROUND SMOKE CLOUDS (Strictly BEHIND all artwork cards) ---
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
        const currentAlpha = p.alpha + Math.sin(time * 0.5 + p.y * 0.003) * 0.01;

        smokeCtx.save();
        smokeCtx.translate(p.x, p.y);
        smokeCtx.rotate(p.angle);

        const gradient = smokeCtx.createRadialGradient(0, 0, 0, 0, 0, currentRadius);
        gradient.addColorStop(0, `${p.color}${Math.max(0, currentAlpha * 1.3)})`);
        gradient.addColorStop(0.4, `${p.color}${Math.max(0, currentAlpha * 0.7)})`);
        gradient.addColorStop(0.8, `${p.color}${Math.max(0, currentAlpha * 0.2)})`);
        gradient.addColorStop(1, `${p.color}0)`);

        smokeCtx.fillStyle = gradient;
        smokeCtx.beginPath();
        smokeCtx.arc(0, 0, currentRadius, 0, Math.PI * 2);
        smokeCtx.fill();
        smokeCtx.restore();
      });

      // --- CANVAS 2 (z-25): FOREGROUND SPARKS & EMBERS (Fly all over the screen) ---
      sparkCtx.globalCompositeOperation = "source-over";

      softEmbers.forEach((e) => {
        e.y += e.speedY;
        e.x += e.speedX + Math.sin(time * 1.5 + e.y * 0.02) * 0.15;

        if (e.y < -10) {
          e.y = sparkCanvas.height + 10;
          e.x = Math.random() * sparkCanvas.width;
        }

        const currentAlpha = (e.alpha + bpmPulse * 0.1) * (0.7 + 0.3 * Math.sin(time * 2.0 + e.x));

        sparkCtx.fillStyle = `rgba(255, 170, 30, ${Math.max(0, currentAlpha)})`;
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

        const glowRadius = (e.size * 2.8) * (1 + bpmPulse * 0.15);
        const currentAlpha = Math.min(1.0, Math.max(0, (e.alpha + bpmPulse * 0.08) * (0.85 + 0.15 * Math.sin(time * 4 + e.x))));
        
        const emberGradient = sparkCtx.createRadialGradient(e.x, e.y, 0, e.x, e.y, glowRadius);
        emberGradient.addColorStop(0, `rgba(255, 255, 245, ${currentAlpha})`);
        emberGradient.addColorStop(0.35, `rgba(255, 185, 30, ${currentAlpha * 0.85})`);
        emberGradient.addColorStop(0.7, `rgba(255, 100, 10, ${currentAlpha * 0.45})`);
        emberGradient.addColorStop(1, `rgba(210, 40, 0, 0)`);

        sparkCtx.fillStyle = emberGradient;
        sparkCtx.beginPath();
        sparkCtx.arc(e.x, e.y, glowRadius, 0, Math.PI * 2);
        sparkCtx.fill();

        sparkCtx.fillStyle = `rgba(255, 255, 255, ${Math.min(1.0, currentAlpha * 1.2)})`;
        sparkCtx.beginPath();
        sparkCtx.arc(e.x, e.y, e.size * 0.7, 0, Math.PI * 2);
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
      {/* 1. Smoke Canvas Layer: Strictly BEHIND artwork cards on z-0 */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <canvas
          ref={smokeCanvasRef}
          className="w-full h-full opacity-90 mix-blend-screen"
        />
      </div>

      {/* 2. Spark/Ember Canvas Layer: Flying over screen on z-25 */}
      <div className="fixed inset-0 pointer-events-none z-25 overflow-hidden">
        <canvas
          ref={sparkCanvasRef}
          className="w-full h-full opacity-95 mix-blend-screen"
        />
      </div>
    </>
  );
}
