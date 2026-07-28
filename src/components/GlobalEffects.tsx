"use client";

import SmokeEffect from "@/components/SmokeEffect";
import AmbientAudio from "@/components/AmbientAudio";

export default function GlobalEffects() {
  return (
    <>
      <SmokeEffect />
      <AmbientAudio lang="ru" />
    </>
  );
}
