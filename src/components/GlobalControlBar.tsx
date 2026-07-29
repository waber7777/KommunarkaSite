"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface GlobalControlBarProps {
  lang?: "ru" | "en";
  setLang?: (lang: "ru" | "en") => void;
}

// Global Singleton Audio Instance
let globalAudioInstance: HTMLAudioElement | null = null;
let globalIsPlaying = true; // Default ON as requested
let audioListeners: Array<(playing: boolean) => void> = [];

export default function GlobalControlBar({
  lang = "ru",
  setLang
}: GlobalControlBarProps) {
  const pathname = usePathname();
  const [isPlaying, setIsPlaying] = useState<boolean>(globalIsPlaying);
  const [currentLang, setCurrentLang] = useState<"ru" | "en">(lang);

  useEffect(() => {
    setCurrentLang(lang);
  }, [lang]);

  useEffect(() => {
    const listener = (playing: boolean) => setIsPlaying(playing);
    audioListeners.push(listener);

    if (typeof window !== "undefined") {
      if (!globalAudioInstance) {
        globalAudioInstance = new Audio("/assets/ambient-ritual.mp3");
        globalAudioInstance.loop = true;
        globalAudioInstance.preload = "auto";
      }

      const savedPref = localStorage.getItem("kommunarka_ambient_audio");
      const shouldPlay = savedPref === null || savedPref === "true";

      if (shouldPlay) {
        const attemptPlay = () => {
          if (!globalAudioInstance) return;
          globalAudioInstance
            .play()
            .then(() => {
              globalIsPlaying = true;
              notifyListeners(true);
              removeGestureListeners();
            })
            .catch(() => {
              // Browser blocked autoplay without user gesture - play on first interaction
              globalIsPlaying = true;
              notifyListeners(true);
              addGestureListeners();
            });
        };

        attemptPlay();
      } else {
        globalIsPlaying = false;
        notifyListeners(false);
      }
    }

    return () => {
      audioListeners = audioListeners.filter((l) => l !== listener);
    };
  }, []);

  const addGestureListeners = () => {
    const triggerAudioOnUserGesture = () => {
      if (globalAudioInstance && globalIsPlaying) {
        globalAudioInstance.play().then(() => {
          notifyListeners(true);
          removeGestureListeners();
        }).catch(() => {});
      }
    };

    window.addEventListener("click", triggerAudioOnUserGesture, { once: true });
    window.addEventListener("touchstart", triggerAudioOnUserGesture, { once: true });
    window.addEventListener("scroll", triggerAudioOnUserGesture, { once: true });
    window.addEventListener("pointerdown", triggerAudioOnUserGesture, { once: true });
  };

  const removeGestureListeners = () => {
    // Clean up if played
  };

  const notifyListeners = (playing: boolean) => {
    audioListeners.forEach((l) => l(playing));
  };

  const toggleAudio = () => {
    if (!globalAudioInstance) {
      globalAudioInstance = new Audio("/assets/ambient-ritual.mp3");
      globalAudioInstance.loop = true;
    }

    if (globalIsPlaying) {
      globalAudioInstance.pause();
      globalIsPlaying = false;
      localStorage.setItem("kommunarka_ambient_audio", "false");
      notifyListeners(false);
    } else {
      globalAudioInstance
        .play()
        .then(() => {
          globalIsPlaying = true;
          localStorage.setItem("kommunarka_ambient_audio", "true");
          notifyListeners(true);
        })
        .catch((err) => {
          console.log("Audio playback blocked by browser:", err);
        });
    }
  };

  const handleLangChange = (newLang: "ru" | "en") => {
    setCurrentLang(newLang);
    if (setLang) {
      setLang(newLang);
    }
  };

  const isAuctionPage = pathname === "/auction";

  return (
    <div
      className="fixed bottom-6 right-4 md:bottom-auto md:top-24 md:right-12 z-50 flex items-center border border-white/20 p-1 bg-black/90 backdrop-blur-lg text-xs font-mono shadow-2xl transition-all"
    >
      {/* Sound Button */}
      <button
        onClick={toggleAudio}
        className={`px-3 py-1.5 transition-all flex items-center gap-2 ${
          isAuctionPage ? "border-r border-white/15" : ""
        } ${
          isPlaying
            ? "text-accent font-bold bg-accent/15"
            : "text-zinc-400 hover:text-white"
        }`}
        title={isPlaying ? "Mute Ambient Sound" : "Play Ambient Sound"}
      >
        <span className="flex items-center gap-1.5">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isPlaying ? "bg-accent animate-ping" : "bg-zinc-600"
            }`}
          />
          {isPlaying ? (
            <svg
              className="w-4 h-4 fill-current text-accent"
              viewBox="0 0 24 24"
            >
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 fill-current text-zinc-500"
              viewBox="0 0 24 24"
            >
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          )}
        </span>
        <span className="hidden sm:inline tracking-wider">
          {isPlaying
            ? currentLang === "ru"
              ? "ЗВУК"
              : "SOUND"
            : currentLang === "ru"
            ? "ЗВУК"
            : "SOUND"}
        </span>
      </button>

      {/* Language Switcher Buttons (Only visible on /auction page) */}
      {isAuctionPage && (
        <div className="flex items-center pl-1 gap-1">
          <button
            onClick={() => handleLangChange("ru")}
            className={`px-2.5 py-1 transition-all ${
              currentLang === "ru"
                ? "bg-accent text-black font-bold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            RU
          </button>
          <button
            onClick={() => handleLangChange("en")}
            className={`px-2.5 py-1 transition-all ${
              currentLang === "en"
                ? "bg-accent text-black font-bold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            EN
          </button>
        </div>
      )}
    </div>
  );
}
