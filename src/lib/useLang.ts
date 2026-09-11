"use client";

import { useSyncExternalStore } from "react";

function subscribeLang(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("kommunarka_lang_changed", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("kommunarka_lang_changed", callback);
  };
}

function getLangSnapshot(): "ru" | "en" {
  if (typeof window === "undefined") return "ru";
  const val = localStorage.getItem("kommunarka_lang");
  return val === "en" ? "en" : "ru";
}

function getServerLangSnapshot(): "ru" | "en" {
  return "ru";
}

export function useCurrentLang(): ["ru" | "en", (lang: "ru" | "en") => void] {
  const lang = useSyncExternalStore(subscribeLang, getLangSnapshot, getServerLangSnapshot);

  const setLang = (newLang: "ru" | "en") => {
    if (typeof window !== "undefined") {
      localStorage.setItem("kommunarka_lang", newLang);
      window.dispatchEvent(new CustomEvent("kommunarka_lang_changed", { detail: newLang }));
    }
  };

  return [lang, setLang];
}
