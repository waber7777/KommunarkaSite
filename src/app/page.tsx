"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import ArtGallery from "@/components/ArtGallery";
import Counter from "@/components/Counter";
import TypewriterText from "@/components/TypewriterText";

export default function Home() {
  return (
    <main className="flex-grow flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32">
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-[9vw] min-[500px]:text-[11vw] md:text-[7.5vw] lg:text-[6.5vw] font-bold font-montserrat uppercase leading-[0.85] tracking-tighter flex flex-col">
            <span className="overflow-hidden">
              <motion.span
                initial={{ y: "120%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Sacred
              </motion.span>
            </span>
            <span className="overflow-hidden">
              <motion.span
                initial={{ y: "120%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="block text-accent"
              >
                Industrial
              </motion.span>
            </span>
            <span className="overflow-hidden">
              <motion.span
                initial={{ y: "120%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Transformation
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 md:mt-16 max-w-2xl"
          >
            <p className="text-secondary text-sm md:text-base leading-relaxed uppercase font-light tracking-[0.15em] border-l-2 border-accent/50 pl-6">
              Московская творческая мастерская Лары Метревели и Облепихи. <br className="hidden md:block" />
              Трансформация индустриального мусора в высокое искусство. <br className="hidden md:block" />
              Легкость фарфора встречает тяжесть металла.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-80 px-6 md:px-12 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.5em] text-accent uppercase font-mono block">
              Manifesto / Манифест
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-montserrat uppercase tracking-tighter">
              Баланс — лейтмотив практики
            </h2>
          </div>
          <div className="space-y-12 text-xl md:text-2xl font-light leading-relaxed text-secondary/90">
            <p className="indent-12">
              Состояние баланса возникает в момент
              преодоления напряжения между контрастными состояниями, когда максимально
              широкий спектр противоположностей объединяется в одной точке пространства:
            </p>
            <ul className="space-y-6 border-l-2 border-accent/20 pl-10 text-xs md:text-sm uppercase tracking-[0.2em] text-secondary font-mono leading-loose">
              <li className="hover:text-white transition-colors">подвижность и статичность — лёгкость фарфора и тяжесть металла</li>
              <li className="hover:text-white transition-colors">творчество и дисциплина — жесткость конструкции и динамика композиции</li>
              <li className="hover:text-white transition-colors">ребенок и воин — преодоление границ и ограничения свойствами материалов</li>
              <li className="hover:text-white transition-colors">беспечность и служение — хаотичное положение фрагментов и геометрия композиции</li>
              <li className="hover:text-white transition-colors">обучение и игра — концентрация и распад композиции</li>
            </ul>
            <div className="border-t border-white/5 pt-12">
              <TypewriterText
                text="Работая с глиной и мусором, мы играем, и наши персонажи пытаются построить храм на руинах..."
                className="text-base md:text-lg text-accent"
                speed={50}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section Header */}
      <div id="archive" className="px-6 md:px-12 pt-32">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[4vw] font-bold font-montserrat uppercase tracking-tighter mb-4">
            Artifacts <span className="text-secondary opacity-30">/ Артефакты</span>
          </h2>
        </div>
      </div>

      <ArtGallery />

      {/* Footer */}
      <footer className="py-32 px-6 md:px-12 border-t border-white/5 mt-32">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="text-4xl font-bold font-montserrat uppercase tracking-[0.15em] flex items-baseline">
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
            OMMUNARKA<span className="text-accent underline decoration-1 underline-offset-8 ml-2">©</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-[10px] font-mono text-secondary uppercase tracking-[0.2em]">
            <div className="space-y-4">
              <span className="text-white block">Contact</span>
              <p>Москва, Россия</p>
              <p>lara.metreveli@gmail.com</p>
              <p>+7 925 376 2086</p>
            </div>
            <div className="space-y-4">
              <span className="text-white block">Social</span>
              <p>Instagram: @kommunarkazames</p>
              <p>Telegram</p>
            </div>
            <div className="space-y-4">
              <span className="text-white block">Analytics</span>
              <Counter />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
