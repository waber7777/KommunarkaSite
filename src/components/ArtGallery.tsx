"use client";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface Artwork {
    id: string;
    title: string;
    materials: string;
    dimensions: string;
    year: string;
    collection: string;
    image: string;
}

const artworks: Artwork[] = [
    // ОБЪЕКТЫ
    { id: "obj-1", title: "Танец. Изделие №1", materials: "Фарфор, металл, дерево", dimensions: "550 х 280 х h390", year: "2025", collection: "Объекты", image: "page_2" },
    { id: "obj-2", title: "Танец. Изделие №2", materials: "Фарфор, металл, дерево", dimensions: "580 х 80 х h190", year: "2025", collection: "Объекты", image: "page_3" },
    { id: "obj-2-detail", title: "Танец. Изделие №2 (Деталь)", materials: "Фарфор, металл, дерево", dimensions: "100 х 230 см", year: "2025", collection: "Объекты", image: "page_4" },
    { id: "obj-3", title: "Танец. Изделие №3", materials: "Фарфор, металл, дерево", dimensions: "400 х 260 х h425", year: "2025", collection: "Объекты", image: "page_5" },
    { id: "obj-4", title: "Танец. Изделие №4", materials: "Фарфор, металл, дерево", dimensions: "250 х 300 х h380", year: "2025", collection: "Объекты", image: "page_6" },
    { id: "obj-5", title: "Танец. Изделие №5", materials: "Фарфор, металл, дерево", dimensions: "330 х 230 х h610", year: "2025", collection: "Объекты", image: "page_7" },
    { id: "obj-6", title: "Танец. Изделие №6", materials: "Фарфор, металл, дерево", dimensions: "270 х 220 х h500", year: "2025", collection: "Объекты", image: "page_8" },
    { id: "obj-7", title: "Танец. Изделие №7", materials: "Фарфор, металл, дерево", dimensions: "330 х 230 х h610", year: "2026", collection: "Объекты", image: "page_9" },
    { id: "el-1", title: "Элемент. Изделие №1", materials: "Фарфор, металл, дерево", dimensions: "210 х 120 х h550", year: "2026", collection: "Объекты", image: "page_10" },
    { id: "el-2", title: "Элемент. Изделие №2", materials: "Фарфор, металл, дерево", dimensions: "180 х 150 х h525", year: "2026", collection: "Объекты", image: "page_11" },
    { id: "el-34", title: "Элемент. Изделия №3 и №4", materials: "Фарфор, металл, песок, дерево", dimensions: "Различные", year: "2026", collection: "Объекты", image: "page_12" },
    { id: "el-56", title: "Элемент. Изделия №5 и №6", materials: "Фарфор, металл, дерево", dimensions: "Различные", year: "2026", collection: "Объекты", image: "page_13" },
    { id: "el-78", title: "Элемент. Изделия №7 и №8", materials: "Фарфор, металл, дерево", dimensions: "Различные", year: "2026", collection: "Объекты", image: "page_14" },
    { id: "el-910", title: "Элемент. Изделия №9 и №10", materials: "Фарфор, металл, дерево", dimensions: "Различные", year: "2026", collection: "Объекты", image: "page_15" },
    { id: "el-11", title: "Элемент №11 и Облепиха №1", materials: "Смешанная техника", dimensions: "Различные", year: "2025-2026", collection: "Объекты", image: "page_16" },

    // СКУЛЬПТУРА
    { id: "ob-23", title: "Облепиха. Изделия №2 и №3", materials: "Глина, глазурь", dimensions: "Различные", year: "2025", collection: "Скульптура", image: "page_17" },
    { id: "totem-1", title: "Тотем. Изделие №1", materials: "Глина, глазурь, металлы, дерево", dimensions: "380 х 200 х h300", year: "2025", collection: "Скульптура", image: "page_19" },
    { id: "totem-2", title: "Тотем. Изделие №2", materials: "Глина, глазурь, металлы", dimensions: "290 х 155 х h330", year: "2025", collection: "Скульптура", image: "page_20" },
    { id: "obl-12", title: "Облепиха. Лепиха №1 и №2", materials: "Глина, глазурь, медь", dimensions: "Различные", year: "2025", collection: "Скульптура", image: "page_21" },
    { id: "obl-34", title: "Облепиха. Лепиха №3 и №4", materials: "Глина, металл, глазурь, дерево", dimensions: "Различные", year: "2025", collection: "Скульптура", image: "page_22" },
    { id: "obl-56", title: "Облепиха. Лепиха №5 и №6", materials: "Глина, металл, глазурь", dimensions: "Различные", year: "2025", collection: "Скульптура", image: "page_23" },

    // ИКЕБАНА
    { id: "ik-1", title: "Икебана. Изделие №1", materials: "Фарфор, металл", dimensions: "220 х 200 х h270", year: "2025", collection: "Икебана", image: "page_25" },

    // ЖИВОПИСЬ / ГРАФИКА
    { id: "sam-1", title: "Самовар. Дымок и Зверь", materials: "Фанера, масло, металл", dimensions: "Различные", year: "2025", collection: "Живопись / Графика", image: "page_27" },
    { id: "sam-2", title: "Самовар. Японка", materials: "Фанера, масло, металл", dimensions: "1340 х 720", year: "2025", collection: "Живопись / Графика", image: "page_28" },
    { id: "kab", title: "Кабуки и Эскиз Пара", materials: "Смешанная техника", dimensions: "Различные", year: "2025", collection: "Живопись / Графика", image: "page_29" },
    { id: "com", title: "Комьюнити", materials: "Бумага, тушь", dimensions: "87 х 42", year: "2025", collection: "Живопись / Графика", image: "page_30" },

    // УЛИЧНЫЕ ОБЪЕКТЫ
    { id: "sv", title: "Светильник", materials: "Металл, бетон, реди-мейд", dimensions: "400 х 350 х 1860", year: "2025", collection: "Уличные объекты", image: "page_32" },
    { id: "pom", title: "Помощник. Макет и Станция", materials: "Картон, пластик, металл", dimensions: "Различные", year: "2025", collection: "Уличные объекты", image: "page_34" },
    { id: "inst", title: "Абсолютный танец. Визуализация", materials: "Инсталляция", dimensions: "Масштабная", year: "2026", collection: "Уличные объекты", image: "page_35" }
];

const collections = [
    "Все",
    "Объекты",
    "Скульптура",
    "Икебана",
    "Живопись / Графика",
    "Уличные объекты",
];

export default function ArtGallery() {
    const [activeCollection, setActiveCollection] = useState("Все");
    const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

    useEffect(() => {
        if (selectedArtwork) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [selectedArtwork]);

    const filteredArtworks = activeCollection === "Все"
        ? artworks
        : artworks.filter(art => art.collection === activeCollection);

    return (
        <section className="pt-2 pb-32 px-6 md:px-12 bg-background relative">
            <div className="max-w-7xl mx-auto space-y-16">
                {/* Filter Navigation */}
                <div className="flex overflow-x-auto md:flex-wrap no-scrollbar gap-x-8 md:gap-x-12 gap-y-6 border-b border-white/5 pb-2 md:pb-6 sticky top-0 z-30 bg-background/95 backdrop-blur-md pt-[85px] md:pt-[44px] -mt-[8px]">
                    {collections.map((col) => (
                        <button
                            key={col}
                            onClick={() => setActiveCollection(col)}
                            className={`text-[8px] md:text-[10px] font-mono uppercase tracking-[0.3em] transition-colors relative py-2 shrink-0 ${activeCollection === col ? "text-accent" : "text-secondary hover:text-white"
                                }`}
                        >
                            {col}
                            {activeCollection === col && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-px bg-accent"
                                />
                            )}
                        </button>
                    ))}
                </div>

                <LayoutGroup>
                    {/* CSS masonry using columns */}
                    <motion.div
                        layout
                        className="columns-1 md:columns-2 gap-12 w-full pt-12"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredArtworks.map((art, index) => (
                                <ArtworkCard key={art.id} art={art} index={index} onClick={() => setSelectedArtwork(art)} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </LayoutGroup>
            </div>

            <AnimatePresence>
                {selectedArtwork && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl p-4 md:p-12 overflow-y-auto"
                        onClick={() => setSelectedArtwork(null)}
                    >
                        <div className="absolute top-6 right-6 md:top-12 md:right-12 z-[110]">
                            <button
                                onClick={() => setSelectedArtwork(null)}
                                className="text-white/50 hover:text-white transition-colors uppercase tracking-[0.3em] font-mono text-[10px] flex items-center gap-4 group"
                            >
                                <span>Закрыть</span>
                                <div className="w-8 h-px bg-current group-hover:w-16 transition-all duration-300"></div>
                            </button>
                        </div>

                        <motion.div
                            layoutId={`card-${selectedArtwork.id}`}
                            className="w-full max-w-7xl min-h-[80vh] my-auto flex flex-col md:flex-row gap-12 md:gap-24 items-center justify-center pointer-events-none"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="w-full md:w-3/5 h-[50vh] md:h-[80vh] relative pt-12 md:pt-0">
                                <img
                                    src={`/assets/artworks/${selectedArtwork.image}.png?v=3`}
                                    alt={selectedArtwork.title}
                                    className="w-full h-full object-contain pointer-events-auto cursor-default"
                                />
                            </div>
                            <div className="w-full md:w-2/5 flex flex-col justify-center space-y-8 md:space-y-12 pointer-events-auto pb-12 md:pb-0">
                                <div className="space-y-6">
                                    <span className="text-accent font-mono text-[10px] tracking-[0.3em] uppercase border border-accent/20 px-3 py-1.5 inline-block">
                                        {selectedArtwork.collection}
                                    </span>
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat uppercase tracking-[0.1em] leading-[0.9]">
                                        {selectedArtwork.title}
                                    </h2>
                                    <p className="text-secondary font-mono tracking-[0.3em] uppercase text-xs md:text-sm">
                                        Год: {selectedArtwork.year}
                                    </p>
                                </div>

                                <div className="space-y-6 pt-8 border-t border-white/10 text-xs font-mono uppercase tracking-[0.2em] leading-relaxed">
                                    <div>
                                        <h4 className="text-secondary mb-2">Материалы</h4>
                                        <p className="text-white/90 normal-case tracking-normal text-sm">{selectedArtwork.materials}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-secondary mb-2">Габариты</h4>
                                        <p className="text-white/90">{selectedArtwork.dimensions}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

function ArtworkCard({ art, index, onClick }: { art: Artwork; index: number; onClick: () => void }) {
    const containerRef = useRef(null);

    return (
        <motion.div
            layout
            ref={containerRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="break-inside-avoid mb-24 relative group cursor-crosshair inline-block w-full"
            onClick={onClick}
            layoutId={`card-${art.id}`}
        >
            <div className="relative border border-white/5 overflow-hidden">
                {/* Image without fixed aspect ratio */}
                <img
                    src={`/assets/artworks/${art.image}.png?v=3`}
                    alt={art.title}
                    className="w-full h-auto object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.03] opacity-90 group-hover:opacity-100"
                />

                <div className="absolute inset-0 flex items-center justify-center text-secondary/5 uppercase tracking-[1em] text-[10px] font-mono select-none pointer-events-none">
                    {art.id}
                </div>
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-md px-4 py-1.5 text-[9px] font-mono text-white/90 uppercase tracking-widest border border-white/10 shadow-lg">
                    {art.collection}
                </div>
            </div>

            <div className="mt-8 space-y-4">
                <div className="flex justify-between items-baseline gap-4 pr-4">
                    <h3 className="text-xl md:text-2xl font-bold font-montserrat uppercase tracking-tighter">
                        {art.title}
                    </h3>
                    <span className="text-[10px] font-mono text-secondary/60 uppercase whitespace-nowrap">
                        {art.year}
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-3 text-[10px] font-mono text-secondary uppercase tracking-widest border-t border-white/5 pt-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 leading-relaxed">
                        <span className="text-[#444] shrink-0">Materials:</span>
                        <span className="text-left sm:text-right text-[9px] md:text-[10px] normal-case text-white/70">{art.materials}</span>
                    </div>
                    <div className="flex justify-between gap-4 leading-relaxed">
                        <span className="text-[#444] shrink-0">Dimensions:</span>
                        <span className="text-right text-[10px] text-white/50">{art.dimensions}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
