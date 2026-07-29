"use client";

import { useState, useEffect, useRef } from "react";

// Global Audio Frequency & Beat Detector
let audioContext: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
let frequencyData: Uint8Array | null = null;

export const getBassLevel = (): number => {
  if (!analyser || !frequencyData) return 0;
  // @ts-ignore
  analyser.getByteFrequencyData(frequencyData);
  
  // Read Low Bass Frequency Bins (Sub-bass / Kick drum: 0 to 6)
  let bassSum = 0;
  for (let i = 0; i < 6; i++) {
    bassSum += frequencyData[i];
  }
  return bassSum / 6; // Returns average volume 0..255
};

interface AmbientAudioProps {
  lang?: "ru" | "en";
}

export default function AmbientAudio({ lang = "ru" }: AmbientAudioProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check saved preference
    const savedAudioPref = localStorage.getItem("kommunarka_ambient_audio");
    if (savedAudioPref === "true" && audioRef.current) {
      // Audio autoplay requires user gesture
    }
  }, []);

  const setupWebAudioAPI = () => {
    if (!audioRef.current || audioContext) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioContext = new AudioCtx();
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.4; // Responsive kick detection

      const source = audioContext.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      frequencyData = new Uint8Array(analyser.frequencyBinCount);
    } catch (e) {
      console.log("AudioContext setup:", e);
    }
  };

  const toggleAudio = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem("kommunarka_ambient_audio", "false");
    } else {
      setupWebAudioAPI();
      if (audioContext && audioContext.state === "suspended") {
        await audioContext.resume();
      }

      try {
        await audioRef.current.play();
        setIsPlaying(true);
        localStorage.setItem("kommunarka_ambient_audio", "true");
      } catch (err) {
        console.log("Audio playback blocked:", err);
      }
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
