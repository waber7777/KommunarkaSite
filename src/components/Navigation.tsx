"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const navLinks = [
    { name: "Артефакты", href: "/archive" },
    { name: "Выставки", href: "/exhibitions" },
    { name: "Студия", href: "/about" },
    { name: "Контакты", href: "/contacts" },
];

export default function Navigation() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference px-6 py-8 md:px-12 pointer-events-none">
            <div className="flex flex-col md:flex-row justify-between items-start gap-y-4 md:gap-y-0">
                <Link href="/" className="group overflow-hidden pointer-events-auto">
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 className="inline-flex flex-col font-montserrat uppercase leading-none">
                            <span className="text-2xl font-bold tracking-[0.15em] flex items-baseline">
                                <span
                                    className="inline-block w-[0.85em] h-[0.7em] bg-white mr-[0.15em]"
                                    style={{
                                        WebkitMaskImage: "url('/assets/logo-k.png')",
                                        WebkitMaskSize: "contain",
                                        WebkitMaskRepeat: "no-repeat",
                                        WebkitMaskPosition: "center",
                                        maskImage: "url('/assets/logo-k.png')",
                                        maskSize: "contain",
                                        maskRepeat: "no-repeat",
                                        maskPosition: "center"
                                    }}
                                />
                                OMMUNARKA
                            </span>
                            <span className="flex justify-between w-full text-[10px] font-mono text-secondary group-hover:text-accent transition-colors duration-500 mt-1">
                                {"Art Studio / Moscow".toUpperCase().split("").map((char, index) => (
                                    <span key={index}>{char === " " ? "\u00A0" : char}</span>
                                ))}
                            </span>
                        </h1>
                    </motion.div>
                </Link>

                <div className="flex flex-row flex-wrap md:flex-col justify-end content-start md:content-end gap-x-4 gap-y-1 md:gap-x-0 md:space-y-2 max-w-[150px] md:max-w-none pointer-events-auto text-right">
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="group relative overflow-hidden h-6"
                        >
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.1 * i,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="flex flex-col transition-transform duration-500 group-hover:-translate-y-6"
                            >
                                <span className="text-xs uppercase tracking-widest font-mono h-6 flex items-center">
                                    {link.name}
                                </span>
                                <span className="text-xs uppercase tracking-widest font-mono h-6 flex items-center text-accent">
                                    {link.name}
                                </span>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
