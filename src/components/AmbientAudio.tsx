"use client";

import { useState, useEffect, useRef } from "react";

// Global Bass Level Exporter for Canvas Sync
export let getBassLevel = (): number => 0;

interface AmbientAudioProps {
  lang?: "ru" | "en";
}

export default function AmbientAudio({ lang = "ru" }: AmbientAudioProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    // Check saved audio preference
    const savedAudioPref = localStorage.getItem("kommunarka_ambient_audio");
    if (savedAudioPref === "true" && audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          initAudioAnalyser();
        })
        .catch(() => setIsPlaying(false));
    }

    // Attach global bass meter function
    getBassLevel = () => {
      if (!analyserRef.current || !dataArrayRef.current) return 0;
      // Read low frequencies (bass kick range 0..8)
      analyserRef.current.getByteFrequencyData(dataArrayRef.current as any);
      let bassSum = 0;
      for (let i = 0; i < 8; i++) {
        bassSum += dataArrayRef.current[i];
      }
      return bassSum / 8; // Average Bass Level (0..255)
    };
  }, []);

  const initAudioAnalyser = () => {
    if (audioCtxRef.current || !audioRef.current) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      const source = audioCtx.createMediaElementSource(audioRef.current);

      source.connect(analyser);
      analyser.connect(audioCtx.destination);

      audioCtxRef.current = audioCtx;
      analyserRef.current = analyser;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
    } catch (e) {
      console.log("Web Audio API initialization note:", e);
    }
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem("kommunarka_ambient_audio", "false");
    } else {
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      initAudioAnalyser();

      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          localStorage.setItem("kommunarka_ambient_audio", "true");
        })
        .catch((err) => {
          console.log("Audio play blocked by browser policy:", err);
        });
    }
  };

  return (
    <div className="fixed top-24 right-6 md:right-12 z-50 flex items-center gap-2">
      <audio
        ref={audioRef}
        src="/assets/ambient-ritual.mp3"
        loop
        preload="auto"
        crossOrigin="anonymous"
      />
      <button
        onClick={toggleAudio}
        className={`px-3 py-1.5 text-xs font-mono transition-all flex items-center gap-2 border backdrop-blur-md shadow-lg ${
          isPlaying
            ? "border-accent text-accent bg-accent/10 font-bold"
            : "border-white/20 text-secondary hover:text-white bg-black/80"
        }`}
        title={isPlaying ? "Mute Ambient Sound" : "Play Ambient Sound"}
      >
        <span className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-accent animate-ping" : "bg-zinc-600"}`} />
          {isPlaying ? (
            <svg className="w-3.5 h-3.5 fill-current text-accent" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5 fill-current text-zinc-400" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          )}
        </span>
        <span className="tracking-wider">
          {isPlaying
            ? lang === "ru" ? "ЗВУК: ВКЛ" : "SOUND: ON"
            : lang === "ru" ? "ЗВУК: ВЫКЛ" : "SOUND: OFF"}
        </span>
      </button>
    </div>
  );
}
