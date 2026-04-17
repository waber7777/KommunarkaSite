"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface TypewriterTextProps {
    text: string;
    className?: string;
    speed?: number;
}

export default function TypewriterText({ text, className = "", speed = 50 }: TypewriterTextProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [displayedCount, setDisplayedCount] = useState(0);
    const [cursorVisible, setCursorVisible] = useState(true);

    useEffect(() => {
        if (!isInView) return;

        if (displayedCount < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedCount((prev) => prev + 1);
            }, speed);
            return () => clearTimeout(timeout);
        }
    }, [isInView, displayedCount, text.length, speed]);

    // Blinking cursor
    useEffect(() => {
        const interval = setInterval(() => {
            setCursorVisible((prev) => !prev);
        }, 530);
        return () => clearInterval(interval);
    }, []);

    const isTypingDone = displayedCount >= text.length;

    return (
        <div ref={ref} className={className}>
            <span className="whitespace-pre-wrap">
                {text.slice(0, displayedCount)}
            </span>
            <span
                className={`inline-block w-[2px] h-[1em] bg-accent ml-[2px] align-middle transition-opacity duration-100 ${cursorVisible ? "opacity-100" : "opacity-0"
                    } ${isTypingDone ? "animate-pulse" : ""}`}
            />
        </div>
    );
}
