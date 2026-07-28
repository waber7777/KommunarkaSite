"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import TypewriterText from "@/components/TypewriterText";

export default function CoinPage() {
  const [auctionBid, setAuctionBid] = useState<number>(25000); // USD value of auction

  // Calculation metrics
  const burnPercentage = 75; // 75% burned
  const artistShare = 25; // 25% to artist
  const tokensBurnedEstimate = (auctionBid * 0.75 * 1000).toLocaleString(); // Hypothetical token amount

  return (
    <main className="flex-grow flex flex-col bg-black text-white selection:bg-accent selection:text-black">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono tracking-[0.2em] text-zinc-300 uppercase">
              Solana Blockchain • Phygital Art Protocol
            </span>
          </div>

          <h1 className="text-[8vw] min-[500px]:text-[9.5vw] md:text-[6.5vw] lg:text-[5.5vw] font-bold font-montserrat uppercase leading-[0.9] tracking-tighter flex flex-col">
            <span className="overflow-hidden">
              <motion.span
                initial={{ y: "120%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.1 }}
                className="block text-zinc-400"
              >
                Kommunarka
              </motion.span>
            </span>
            <span className="overflow-hidden">
              <motion.span
                initial={{ y: "120%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="block text-amber-500"
              >
                $KOMMUNARKA COIN
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-8 max-w-2xl text-zinc-400 text-base md:text-xl font-light leading-relaxed border-l-2 border-amber-500/60 pl-6"
          >
            Первое поколение Phygital-мемкоинов, подкрепленное реальными физическими артефактами из фарфора, металла и бетона. Каждый арт-аукцион уничтожает токены на рынке, создавая дефицит предложения.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#auction"
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-semibold uppercase tracking-wider font-mono text-sm transition-all rounded-none"
            >
              Смотреть 1-й Аукцион
            </a>
            <a
              href="#calculator"
              className="px-8 py-4 border border-white/20 hover:border-white/60 text-white font-mono uppercase tracking-wider text-sm transition-all bg-white/5 backdrop-blur-sm"
            >
              Калькулятор Сжигания
            </a>
          </motion.div>
        </div>
      </section>

      {/* Concept Architecture */}
      <section className="py-28 px-6 md:px-12 border-y border-white/10 bg-zinc-950/60">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4">
            <span className="text-xs font-mono tracking-[0.4em] text-amber-500 uppercase block">
              01 / Триада Ценности
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-montserrat uppercase tracking-tight">
              Как работает Phygital-Экосистема
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4 hover:border-amber-500/40 transition-colors">
              <div className="text-3xl text-amber-500">🎨</div>
              <h3 className="text-xl font-bold font-montserrat uppercase">1. Физический Артефакт</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Художники мастерской «Коммунарка» создают уникальные физические скульптуры и картины. Каждый предмет получает NFC-микрочип и 1-of-1 NFT паспорт.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4 hover:border-amber-500/40 transition-colors">
              <div className="text-3xl text-amber-500">🔥</div>
              <h3 className="text-xl font-bold font-montserrat uppercase">2. Burn Auction Engine</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Аукционы проводятся в токенах $KOMMUNARKA. 75% от победной ставки насовсем сжигается (отправляется на dead-адрес), сокращая общую эмиссию токена на рынке.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4 hover:border-amber-500/40 transition-colors">
              <div className="text-3xl text-amber-500">🏛️</div>
              <h3 className="text-xl font-bold font-montserrat uppercase">3. Vault & Exhibition Yield</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Картины выставляются в реальных арт-галереях. Держатели токенов и NFT участвуют в распределении доходов от выставочных билетов, мерча и коммерческих лицензий.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Burn Calculator Interactive Widget */}
      <section id="calculator" className="py-28 px-6 md:px-12 bg-black">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs font-mono tracking-[0.4em] text-amber-500 uppercase block">
              02 / Симулятор Дефляции
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-montserrat uppercase tracking-tight">
              Интерактивный Калькулятор Сжигания
            </h2>
            <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto">
              Посчитайте, какой объем токенов уничтожается при проведении арт-аукциона.
            </p>
          </div>

          <div className="p-8 md:p-12 rounded-3xl bg-zinc-950 border border-white/10 space-y-10">
            {/* Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-mono uppercase">
                <span className="text-zinc-400">Сумма победной ставки на аукционе:</span>
                <span className="text-amber-500 font-bold text-xl">${auctionBid.toLocaleString()} USD</span>
              </div>
              <input
                type="range"
                min="5000"
                max="250000"
                step="5000"
                value={auctionBid}
                onChange={(e) => setAuctionBid(Number(e.target.value))}
                className="w-full h-3 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase">
                <span>$5,000</span>
                <span>$100,000</span>
                <span>$250,000</span>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <span className="text-xs font-mono text-zinc-400 uppercase">Насовсем сжигается ({burnPercentage}%):</span>
                <div className="text-2xl font-bold text-emerald-400 font-mono">
                  ${(auctionBid * 0.75).toLocaleString()}
                </div>
                <div className="text-[10px] font-mono text-zinc-500">~{tokensBurnedEstimate} $KOMMUNARKA</div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <span className="text-xs font-mono text-zinc-400 uppercase">Выплата Художнику ({artistShare}%):</span>
                <div className="text-2xl font-bold text-amber-500 font-mono">
                  ${(auctionBid * 0.25).toLocaleString()}
                </div>
                <div className="text-[10px] font-mono text-zinc-500">Прямое вознаграждение автору</div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <span className="text-xs font-mono text-zinc-400 uppercase">Эффект на рынок:</span>
                <div className="text-xl font-bold text-white font-mono">
                  Дефицит Supply 🚀
                </div>
                <div className="text-[10px] font-mono text-zinc-500">Увеличивает ценность оставшихся токенов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study & Artists Section */}
      <section className="py-28 px-6 md:px-12 bg-zinc-950 border-y border-white/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-mono tracking-[0.4em] text-amber-500 uppercase block">
                03 / Кейс Botto DAO
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-montserrat uppercase tracking-tight leading-tight">
                Доказанный мировой успех арт-токеномики
              </h2>
              <p className="text-zinc-300 text-base leading-relaxed">
                Проект <strong>Botto DAO</strong> доказал эффективность связки токена и продаж арта: с 2021 года было продано более 140 оригинальных работ на общую сумму свыше <strong>$4,000,000+</strong>, а рекордные работы уходили за $300,000 за одну картину.
              </p>
              <div className="space-y-4 border-l-2 border-amber-500/50 pl-6 text-sm text-zinc-400 font-mono">
                <p>✓ 50% выручки аукционов выкупает токены с биржи и сжигает их</p>
                <p>✓ Авторы получают непрерывные роялти (5-10%) от перепродаж</p>
                <p>✓ Гарантированное международное признание и внимание СМИ</p>
              </div>

              <div className="pt-4 flex gap-4 text-xs font-mono">
                <a
                  href="https://botto.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-500 hover:underline"
                >
                  Официальный сайт Botto →
                </a>
                <a
                  href="https://superrare.com/botto"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-white"
                >
                  Галерея SuperRare →
                </a>
              </div>
            </div>

            <div className="p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6">
              <h3 className="text-xl font-bold font-montserrat uppercase text-amber-500">
                Преимущества для Художников мастерской «Коммунарка»
              </h3>
              <ul className="space-y-4 text-sm text-zinc-300 font-mono leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 font-bold">01.</span>
                  <span><strong>Гарантированная оплата:</strong> Фиксированный доход за каждую физическую работу сразу после завершения торгов.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 font-bold">02.</span>
                  <span><strong>Пожизненные роялти: </strong> Смарт-контракт автоматически пересчитывает 5-10% автору от каждой вторичной перепродажи NFT.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 font-bold">03.</span>
                  <span><strong>Сохранение физического холста:</strong> Произведение пишется маслом, акрилом или фарфором, а токен служит рекламным мотором.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 font-bold">04.</span>
                  <span><strong>Глобальный PR:</strong> Проект транслируется на весь мировой крипто-рынок без 50% комиссий традиционных галерей.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Auction Teaser */}
      <section id="auction" className="py-28 px-6 md:px-12 bg-black relative">
        <div className="max-w-5xl mx-auto text-center space-y-8 border border-amber-500/30 p-12 md:p-16 rounded-3xl bg-gradient-to-b from-amber-500/5 to-transparent">
          <span className="text-xs font-mono tracking-[0.5em] text-amber-500 uppercase block">
            Upcoming Auction #01
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-montserrat uppercase tracking-tight">
            Первый Phygital Аукцион Картины
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base">
            Физическая арт-скульптура из индустриального фарфора и стали + 1-of-1 NFT Паспорт подлинности. 75% победной ставки будет сожжено насовсем в эфире.
          </p>

          <div className="pt-6">
            <button className="px-10 py-5 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider font-mono text-sm transition-all">
              Скоро Открытие Торгов
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 md:px-12 border-t border-white/10 bg-zinc-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-xs font-mono text-zinc-500 uppercase tracking-widest">
          <div>© 2026 KommunarkaCoin Protocol. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="/KOMMUNARKA_STRATEGY.md" className="hover:text-amber-500">Стратегия (MD)</a>
            <a href="/exhibitions" className="hover:text-amber-500">Выставки</a>
            <a href="/contacts" className="hover:text-amber-500">Контакты</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
