"use client";

import { useEffect, useState } from "react";

export default function Counter() {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        // Safe fetch with fallback
        fetch("https://api.counterapi.dev/v1/waber7777-kommunarka/visits/up")
            .then(async (res) => {
                if (!res.ok) return null;
                const data = await res.json();
                if (data && typeof data.count === "number") {
                    return data.count;
                }
                return null;
            })
            .then((val) => {
                if (typeof val === "number") {
                    setCount(val);
                }
            })
            .catch((err) => {
                console.warn("Counter service temporarily unavailable:", err);
            });
    }, []);

    const formattedCount = typeof count === "number" && !isNaN(count)
        ? `[${count.toString().padStart(6, "0")}]`
        : "[......]";

    return (
        <div className="flex items-center space-x-4 border-t border-white/5 pt-4">
            <span className="text-[9px] uppercase tracking-widest font-mono text-secondary">
                Site Views
            </span>
            <span className="text-[12px] font-mono tracking-[0.2em] text-white">
                {formattedCount}
            </span>
        </div>
    );
}

