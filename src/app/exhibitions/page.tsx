import Navigation from "@/components/Navigation";

export default function ExhibitionsPage() {
    return (
        <main className="flex-grow flex flex-col min-h-screen">
            <Navigation />
            <div className="flex-grow flex flex-col items-center justify-center opacity-80 mt-16">
                <div
                    className="w-32 h-32 md:w-48 md:h-48 bg-[#E51B24] animate-pulse"
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
                <p className="mt-8 text-secondary font-mono text-[10px] uppercase tracking-[0.3em]">
                    В разработке
                </p>
            </div>
        </main>
    );
}
