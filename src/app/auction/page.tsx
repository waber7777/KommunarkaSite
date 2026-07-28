"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import TypewriterText from "@/components/TypewriterText";
import Counter from "@/components/Counter";

export default function AuctionPage() {
  const [auctionBid, setAuctionBid] = useState<number>(25000); // USD value of auction

  const burnRate = 0.75;
  const artistRate = 0.25;
  const burnedUSD = auctionBid * burnRate;
  const artistUSD = auctionBid * artistRate;
  const tokensEstimate = (burnedUSD * 1250).toLocaleString(); // Estimated token count

  return (
    <main className="flex-grow flex flex-col bg-black text-white selection:bg-accent selection:text-black">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 relative overflow-hidden">
        {/* Decorative Glow Background */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] md:text-xs font-mono tracking-[0.25em] text-secondary uppercase">
              Phygital Protocol • Solana Blockchain • Burn Tokenomics
            </span>
          </div>

          <h1 className="text-[7.5vw] min-[500px]:text-[9vw] md:text-[6vw] lg:text-[5vw] font-bold font-montserrat uppercase leading-[0.88] tracking-tighter flex flex-col">
            <span className="overflow-hidden">
              <motion.span
                initial={{ y: "120%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="block text-secondary opacity-40"
              >
                Sacred Industrial
              </motion.span>
            </span>
            <span className="overflow-hidden">
              <motion.span
                initial={{ y: "120%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="block text-accent"
              >
                Аукцион & Протокол
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-8 max-w-2xl"
          >
            <p className="text-secondary text-sm md:text-lg leading-relaxed uppercase font-light tracking-[0.1em] border-l-2 border-accent/50 pl-6">
              Московская мастерская «Коммунарка» представляет первое поколение Phygital-аукционов. <br className="hidden md:block" />
              Трансформация фарфора и метала в высокую токеномику: каждая победная ставка сжигает токены на рынке.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-12 flex flex-wrap items-center gap-6"
          >
            <a
              href="#first-auction"
              className="px-8 py-4 bg-accent text-black font-bold uppercase tracking-[0.15em] font-mono text-xs hover:bg-white transition-colors"
            >
              Смотреть 1-й Аукцион
            </a>
            <a
              href="#burn-simulator"
              className="px-8 py-4 border border-white/20 text-white font-mono uppercase tracking-[0.15em] text-xs hover:border-accent hover:text-accent transition-colors bg-white/[0.02]"
            >
              Симулятор Сжигания
            </a>
          </motion.div>
        </div>
      </section>

      {/* Manifesto / Architecture Section */}
      <section className="py-32 px-6 md:px-12 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.5em] text-accent uppercase font-mono block">
              01 / Architecture / Архитектура
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-montserrat uppercase tracking-tighter">
              Триада Phygital-Протокола
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-white/10 space-y-6 hover:border-accent/50 transition-colors bg-black/40">
              <span className="text-2xl font-mono text-accent">01.</span>
              <h3 className="text-xl font-bold font-montserrat uppercase tracking-tight">Физический Артефакт</h3>
              <p className="text-secondary text-sm leading-relaxed font-light">
                Художники мастерской создают утончённые объекты из индустриального фарфора, бетона и металла. Каждый предмет оснащается NFC-чипом подлинности и 1-of-1 NFT паспортом.
              </p>
            </div>

            <div className="p-8 border border-white/10 space-y-6 hover:border-accent/50 transition-colors bg-black/40">
              <span className="text-2xl font-mono text-accent">02.</span>
              <h3 className="text-xl font-bold font-montserrat uppercase tracking-tight">Burn Auction Engine</h3>
              <p className="text-secondary text-sm leading-relaxed font-light">
                Торги проходят на смарт-контрактах Solana. 75% от победной ставки насовсем сжигаются в прямом эфире, создавая постоянный дефицит предложения токена на рынке.
              </p>
            </div>

            <div className="p-8 border border-white/10 space-y-6 hover:border-accent/50 transition-colors bg-black/40">
              <span className="text-2xl font-mono text-accent">03.</span>
              <h3 className="text-xl font-bold font-montserrat uppercase tracking-tight">Vault & Exhibition Yield</h3>
              <p className="text-secondary text-sm leading-relaxed font-light">
                Картины выставляются в реальных арт-галереях. Держатели токенов и NFT участвуют в доходах от выставочных билетов, мерча и коммерческих лицензий.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Burn Simulator Section */}
      <section id="burn-simulator" className="py-32 px-6 md:px-12">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="space-y-4 text-center">
            <span className="text-[10px] tracking-[0.5em] text-accent uppercase font-mono block">
              02 / Simulator / Симулятор
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-montserrat uppercase tracking-tighter">
              Калькулятор Сжигания $KOMMUNARKA
            </h2>
            <p className="text-secondary text-sm md:text-base max-w-xl mx-auto font-light">
              Посчитайте, какой объем токенов уничтожается при проведении физического арт-аукциона.
            </p>
          </div>

          <div className="p-8 md:p-14 border border-white/10 bg-white/[0.01] space-y-12">
            {/* Slider */}
            <div className="space-y-6">
              <div className="flex justify-between items-center text-xs md:text-sm font-mono uppercase tracking-widest">
                <span className="text-secondary">Победная ставка на аукционе:</span>
                <span className="text-accent font-bold text-2xl">${auctionBid.toLocaleString()} USD</span>
              </div>
              <input
                type="range"
                min="5000"
                max="250000"
                step="5000"
                value={auctionBid}
                onChange={(e) => setAuctionBid(Number(e.target.value))}
                className="w-full h-2 bg-white/10 appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-[10px] font-mono text-secondary/60 uppercase tracking-widest">
                <span>$5,000</span>
                <span>$100,000</span>
                <span>$250,000</span>
              </div>
            </div>

            {/* Metric Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div className="p-6 border border-accent/30 bg-accent/5 space-y-3">
                <span className="text-[10px] font-mono text-accent uppercase tracking-widest block">
                  Насовсем сжигается (75%):
                </span>
                <div className="text-3xl font-bold text-white font-montserrat">
                  ${burnedUSD.toLocaleString()}
                </div>
                <div className="text-[10px] font-mono text-secondary">~{tokensEstimate} $KOMMUNARKA</div>
              </div>

              <div className="p-6 border border-white/10 bg-black/40 space-y-3">
                <span className="text-[10px] font-mono text-secondary uppercase tracking-widest block">
                  Доход Автора (25%):
                </span>
                <div className="text-3xl font-bold text-accent font-montserrat">
                  ${artistUSD.toLocaleString()}
                </div>
                <div className="text-[10px] font-mono text-secondary">Прямое вознаграждение художнику</div>
              </div>

              <div className="p-6 border border-white/10 bg-black/40 space-y-3">
                <span className="text-[10px] font-mono text-secondary uppercase tracking-widest block">
                  Эффект на рынок:
                </span>
                <div className="text-xl font-bold text-white font-montserrat uppercase">
                  Дефицит Supply 🚀
                </div>
                <div className="text-[10px] font-mono text-secondary">Увеличение ценности токена на DEX</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artist Section & Botto DAO Case */}
      <section className="py-32 px-6 md:px-12 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <span className="text-[10px] tracking-[0.5em] text-accent uppercase font-mono block">
                03 / Artist Gateway / Для Художников
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-montserrat uppercase tracking-tighter leading-tight">
                Почему это выгодно авторам?
              </h2>
              <p className="text-secondary text-base leading-relaxed font-light">
                Мы предлагаем авторам трансформировать классическую модель продаж. Традиционная галерея забирает до 50% комиссии, в то время как наш протокол гарантирует высокую оплату за работу и пожизненные роялти.
              </p>

              <div className="space-y-6 border-l-2 border-accent/40 pl-6 font-mono text-xs md:text-sm uppercase tracking-wider text-secondary leading-loose">
                <p className="hover:text-white transition-colors">1. Гарантированный доход за каждую физическую работу сразу после аукциона</p>
                <p className="hover:text-white transition-colors">2. 5–10% роялти от ВСЕХ будущих перепродаж NFT-паспорта картины</p>
                <p className="hover:text-white transition-colors">3. Глобальная аудитория коллекционеров по всему миру</p>
                <p className="hover:text-white transition-colors">4. Сохранение ценности физического холста (масло, фарфор, сталь)</p>
              </div>
            </div>

            <div className="p-10 border border-white/10 bg-black space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-accent uppercase tracking-widest block">
                  Proof of Concept / Доказанный Кейс
                </span>
                <h3 className="text-2xl font-bold font-montserrat uppercase tracking-tight">
                  Успех Botto DAO ($4M+ Продаж)
                </h3>
              </div>
              <p className="text-secondary text-sm font-light leading-relaxed">
                Децентрализованный проект Botto доказал эффективность арт-токеномики: с 2021 года было продано более 140 оригинальных работ на аукционах SuperRare на общую сумму свыше $4,000,000+, а рекордные картины уходили по $300,000 за штуку.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 text-xs font-mono uppercase tracking-widest">
                <a
                  href="https://botto.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent hover:underline"
                >
                  Официальный сайт Botto →
                </a>
                <a
                  href="https://superrare.com/botto"
                  target="_blank"
                  rel="noreferrer"
                  className="text-secondary hover:text-white"
                >
                  Галерея SuperRare →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logistics & Vault Info */}
      <section className="py-32 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.5em] text-accent uppercase font-mono block">
              04 / Logistics & Security / Логистика
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-montserrat uppercase tracking-tighter">
              Доставка по миру и Vault-Хранение
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-8 border border-white/10 space-y-4 bg-white/[0.01]">
              <h3 className="text-lg font-bold font-montserrat uppercase tracking-tight text-accent">
                📦 Отправка физических картин из РФ
              </h3>
              <p className="text-secondary text-sm font-light leading-relaxed">
                Работы современных авторов (до 50 лет) оформляются экспертом Минкульта РФ за 2-3 дня. Доставка осуществляется компаниями EMS, СДЭК Арт и Art Mail в жестких климатических боксах в 180+ стран мира с полным страхованием.
              </p>
            </div>

            <div className="p-8 border border-white/10 space-y-4 bg-white/[0.01]">
              <h3 className="text-lg font-bold font-montserrat uppercase tracking-tight text-accent">
                🏛️ Vault & Claim (Депозитарная Гарантия)
              </h3>
              <p className="text-secondary text-sm font-light leading-relaxed">
                Чтобы не пересылать картину при каждой перепродаже NFT, произведение хранится в безопасном хранилище проекта. Инвестор может свободно торговать NFT 24/7 или в любой момент заказать доставку через кнопку Redeem Physical.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* First Auction Teaser */}
      <section id="first-auction" className="py-32 px-6 md:px-12 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center space-y-8 border border-accent/40 p-12 md:p-20 bg-black">
          <span className="text-[10px] font-mono tracking-[0.5em] text-accent uppercase block">
            Upcoming Auction #01
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-montserrat uppercase tracking-tighter">
            Первый Phygital Арт-Аукцион
          </h2>
          <TypewriterText
            text="Индустриальный фарфор, металл и сжигание токенов на Solana..."
            className="text-base md:text-xl text-accent font-mono"
            speed={40}
          />
          <p className="text-secondary text-sm max-w-lg mx-auto font-light">
            Физическая арт-скульптура + 1-of-1 NFT Паспорт. 75% от победной ставки сжигается в прямом эфире.
          </p>

          <div className="pt-6">
            <button className="px-10 py-5 bg-accent text-black font-bold uppercase tracking-[0.2em] font-mono text-xs hover:bg-white transition-colors">
              Скоро Открытие Торгов
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 px-6 md:px-12 border-t border-white/5">
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
              <span className="text-white block">Protocol</span>
              <p>Solana Mainnet</p>
              <p>Phygital Auction Engine</p>
              <p>Burn Module 0.75</p>
            </div>
            <div className="space-y-4">
              <span className="text-white block">Navigation</span>
              <p><a href="/#archive">Артефакты</a></p>
              <p><a href="/exhibitions">Выставки</a></p>
              <p><a href="/about">Студия</a></p>
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
