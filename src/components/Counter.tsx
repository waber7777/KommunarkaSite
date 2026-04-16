"use client";

import { useEffect, useState } from "react";

export default function Counter() {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        // We use a free zero-setup counter API.
        // The '/up' endpoint increments and returns the new value.
        fetch("https://api.counterapi.dev/v1/waber7777-kommunarka/visits/up")
            .then(res => res.json())
            .then(data => setCount(data.count))
            .catch(err => console.error("Counter error:", err));
    }, []);

    return (
        <div className="flex items-center space-x-4 border-t border-white/5 pt-4">
            <span className="text-[9px] uppercase tracking-widest font-mono text-secondary">
                Site Views
            </span>
            <span className="text-[12px] font-mono tracking-[0.2em] text-white">
                {count === null ? "[......]" : `[${count.toString().padStart(6, '0')}]`}
            </span>
        </div>
    );
}
