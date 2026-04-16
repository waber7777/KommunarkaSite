import Navigation from "@/components/Navigation";

export default function ContactsPage() {
    return (
        <main className="flex-grow flex flex-col min-h-screen">
            <Navigation />
            <div className="flex-grow flex flex-col items-center justify-center opacity-80 mt-16">
                <img
                    src="/assets/butterfly-red.webp"
                    alt="Kommunarka Butterfly"
                    className="w-32 h-32 md:w-48 md:h-48 animate-pulse object-contain"
                />
                <p className="mt-8 text-secondary font-mono text-[10px] uppercase tracking-[0.3em]">
                    В разработке
                </p>
            </div>
        </main>
    );
}
