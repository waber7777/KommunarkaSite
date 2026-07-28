"use client";

import { useState, useEffect, useRef } from "react";

interface AmbientAudioProps {
  lang?: "ru" | "en";
}

export default function AmbientAudio({ lang = "ru" }: AmbientAudioProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check saved audio preference
    const savedAudioPref = localStorage.getItem("kommunarka_ambient_audio");
    if (savedAudioPref === "true") {
      setIsPlaying(true);
    }
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem("kommunarka_ambient_audio", "false");
    } else {
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
    <div className="flex items-center">
      <audio
        ref={audioRef}
        src="/assets/ambient-ritual.mp3"
        loop
        preload="auto"
      />
      <button
        onClick={toggleAudio}
        className={`px-3 py-1 text-xs font-mono transition-all flex items-center gap-2 border ${
          isPlaying
            ? "border-accent text-accent bg-accent/10 font-bold"
            : "border-white/10 text-secondary hover:text-white bg-black/40"
        }`}
        title={isPlaying ? "Mute Ambient Sound" : "Play Ambient Sound"}
      >
        <span className="flex items-center gap-1">
          <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-accent animate-ping" : "bg-zinc-600"}`} />
          {isPlaying ? "🔊" : "📁"}
        </span>
        <span>
          {isPlaying
            ? lang === "ru" ? "ЗВУК: ВКЛ" : "SOUND: ON"
            : lang === "ru" ? "ЗВУК: ВЫКЛ" : "SOUND: OFF"}
        </span>
      </button>
    </div>
  );
}
