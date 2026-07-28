"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import TypewriterText from "@/components/TypewriterText";
import Counter from "@/components/Counter";

export default function AuctionPage() {
  // Calculator mode: 'burn-bidding' or 'botto-buyback'
  const [calcMode, setCalcMode] = useState<"burn-bidding" | "botto-buyback">("burn-bidding");
  
  // Interactive Sliders
  const [marketCap, setMarketCap] = useState<number>(1000000); // Token Market Cap in USD ($100k - $50M)
  const [auctionBid, setAuctionBid] = useState<number>(25000); // Auction Bid in USD ($5k - $250k)
  const [auctionsCount, setAuctionsCount] = useState<number>(12); // Auctions per year

  const TOTAL_SUPPLY = 1000000000; // 1,000,000,000 $KOMMUNARKA tokens
  const tokenPrice = marketCap / TOTAL_SUPPLY;

  // Total tokens in winning bid
  const bidTokensTotal = auctionBid / tokenPrice;

  // Rates based on mode
  const burnRate = calcMode === "burn-bidding" ? 0.75 : 0.50;
  const artistRate = calcMode === "burn-bidding" ? 0.25 : 0.50;

  // Burned & Artist Calculations
  const burnedTokensCount = Math.round(bidTokensTotal * burnRate);
  const burnedUSD = auctionBid * burnRate;
  const burnedSupplyPercent = ((burnedTokensCount / TOTAL_SUPPLY) * 100).toFixed(2);

  const artistTokensCount = Math.round(bidTokensTotal * artistRate);
  const artistUSD = auctionBid * artistRate;

  // Annual projections
  const annualBurnedTokensCount = burnedTokensCount * auctionsCount;
  const annualBurnedUSD = burnedUSD * auctionsCount;
  const annualSupplyPercent = ((annualBurnedTokensCount / TOTAL_SUPPLY) * 100).toFixed(1);

  return (
    <main className="flex-grow flex flex-col bg-black text-white selection:bg-accent selection:text-black">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/[0.03] backdrop-blur-md mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] md:text-xs font-mono tracking-[0.25em] text-secondary uppercase">
              Phygital Protocol • Solana Mainnet • Dual Burn Engine
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
              Московская мастерская «Коммунарка» представляет Phygital-протокол. <br className="hidden md:block" />
              Трансформация фарфора и металла в дефляционную токеномику: каждая победная ставка уничтожает токены $KOMMUNARKA на рынке.
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
              href="#step-by-step"
              className="px-8 py-4 border border-white/20 text-white font-mono uppercase tracking-[0.15em] text-xs hover:border-accent hover:text-accent transition-colors bg-white/[0.02]"
            >
              Сценарии 2-х Моделей
            </a>
          </motion.div>
        </div>
      </section>

      {/* Architecture Section */}
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
              <span className="text-xs font-mono text-accent uppercase tracking-widest block">[01] АКТИВ</span>
              <h3 className="text-xl font-bold font-montserrat uppercase tracking-tight">Физический Артефакт</h3>
              <p className="text-secondary text-sm leading-relaxed font-light">
                Художники мастерской создают утончённые объекты из фарфора, бетона и металла. Каждый предмет оснащается NFC-микрочипом подлинности и 1-of-1 NFT паспортом.
              </p>
            </div>

            <div className="p-8 border border-white/10 space-y-6 hover:border-accent/50 transition-colors bg-black/40">
              <span className="text-xs font-mono text-accent uppercase tracking-widest block">[02] ДЕФЛЯЦИЯ</span>
              <h3 className="text-xl font-bold font-montserrat uppercase tracking-tight">Burn Auction Engine</h3>
              <p className="text-secondary text-sm leading-relaxed font-light">
                Торги проходят на смарт-контрактах Solana. Победная ставка рассчитывается в токенах $KOMMUNARKA и сжигается, сокращая общую эмиссию монеты.
              </p>
            </div>

            <div className="p-8 border border-white/10 space-y-6 hover:border-accent/50 transition-colors bg-black/40">
              <span className="text-xs font-mono text-accent uppercase tracking-widest block">[03] ДОХОДНОСТЬ</span>
              <h3 className="text-xl font-bold font-montserrat uppercase tracking-tight">Vault & Exhibition Yield</h3>
              <p className="text-secondary text-sm leading-relaxed font-light">
                Картины выставляются в реальных арт-галереях. Держатели токенов и NFT участвуют в доходах от выставочных билетов, мерча и коммерческих лицензий.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Execution Scenarios Section */}
      <section id="step-by-step" className="py-32 px-6 md:px-12 bg-black border-b border-white/5">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4 text-center">
            <span className="text-[10px] tracking-[0.5em] text-accent uppercase font-mono block">
              02 / Execution Scenarios / Шаг за Шагом
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-montserrat uppercase tracking-tighter">
              Пошаговый Сценарий Работы 2-х Моделей
            </h2>
            <p className="text-secondary text-sm md:text-base max-w-2xl mx-auto font-light">
              Сравнение механики проведения торгов, расчетов с Художником и прав проигравших участников.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Model 1 Walkthrough */}
            <div className="p-8 border border-accent/40 bg-white/[0.01] space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <h3 className="text-lg font-bold font-montserrat uppercase text-accent">
                  Модель 1: Burn Bidding (Прямые ставки)
                </h3>
                <span className="text-[10px] font-mono text-secondary uppercase border border-accent/30 px-2 py-1">
                  Ставки в $KOMMUNARKA
                </span>
              </div>

              <div className="space-y-4 text-xs font-mono leading-relaxed text-secondary">
                <div className="p-4 bg-black border border-white/10 space-y-1">
                  <span className="text-accent font-bold">1. Ставки Участников:</span>
                  <p className="text-zinc-300">Ставки принимаются исключительно в токенах $KOMMUNARKA. Средства участников замораживаются смарт-контрактом на время аукциона.</p>
                </div>

                <div className="p-4 bg-black border border-white/10 space-y-1">
                  <span className="text-accent font-bold">2. Права Проигравших (100% Возврат):</span>
                  <p className="text-zinc-300">Все несыгравшие ставки автоматически возвращаются на кошельки участников. Проигравшие сохраняют 100% токенов, которые дорожают от сжигания!</p>
                </div>

                <div className="p-4 bg-black border border-white/10 space-y-1">
                  <span className="text-accent font-bold">3. Победная Ставка (75% Burn / 25% Artist):</span>
                  <p className="text-zinc-300">75% токенов победителя сжигается на Dead-адрес (сокращая эмиссию). 25% токенов переводится Создателю/Художнику.</p>
                </div>
              </div>
            </div>

            {/* Model 2 Walkthrough */}
            <div className="p-8 border border-white/20 bg-white/[0.01] space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <h3 className="text-lg font-bold font-montserrat uppercase text-white">
                  Модель 2: Botto-Style Buyback (Выкуп с рынка)
                </h3>
                <span className="text-[10px] font-mono text-secondary uppercase border border-white/30 px-2 py-1">
                  Ставки в SOL / USDT / Фиат
                </span>
              </div>

              <div className="space-y-4 text-xs font-mono leading-relaxed text-secondary">
                <div className="p-4 bg-black border border-white/10 space-y-1">
                  <span className="text-white font-bold">1. Ставки Участников:</span>
                  <p className="text-zinc-300">Ставки принимаются в SOL, USDT, USDC или фиатной картой. Низкий барьер для традиционных арт-коллекционеров.</p>
                </div>

                <div className="p-4 bg-black border border-white/10 space-y-1">
                  <span className="text-white font-bold">2. Права Проигравших (100% Возврат):</span>
                  <p className="text-zinc-300">Все несыгравшие SOL/USDT разблокируются на кошельки. Участники зарабатывают на росте курса своего портфеля токенов.</p>
                </div>

                <div className="p-4 bg-black border border-white/10 space-y-1">
                  <span className="text-white font-bold">3. Распределение (50% Buyback & Burn / 50% Artist):</span>
                  <p className="text-zinc-300">50% средств откупают токены $KOMMUNARKA с рынка на Raydium (создавая зеленые свечи) и сжигают их. 50% выплачиваются Художнику.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tokenomics Simulator */}
      <section id="burn-simulator" className="py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="space-y-4 text-center">
            <span className="text-[10px] tracking-[0.5em] text-accent uppercase font-mono block">
              03 / Simulator / Симулятор Капитализации & Сжигания
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-montserrat uppercase tracking-tighter">
              Калькулятор Сжигания Токенов $KOMMUNARKA
            </h2>
            <p className="text-secondary text-sm md:text-base max-w-xl mx-auto font-light">
              Настройте текущую капитализацию монеты $KOMMUNARKA и размер ставки, чтобы рассчитать точное количество уничтожаемых токенов.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex justify-center border-b border-white/10">
            <button
              onClick={() => setCalcMode("burn-bidding")}
              className={`px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] border-b-2 transition-all ${
                calcMode === "burn-bidding"
                  ? "border-accent text-accent bg-white/[0.02]"
                  : "border-transparent text-secondary hover:text-white"
              }`}
            >
              Модель 1: Burn Bidding (75% Burn)
            </button>
            <button
              onClick={() => setCalcMode("botto-buyback")}
              className={`px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] border-b-2 transition-all ${
                calcMode === "botto-buyback"
                  ? "border-accent text-accent bg-white/[0.02]"
                  : "border-transparent text-secondary hover:text-white"
              }`}
            >
              Модель 2: Botto-Style Buyback (50% Buyback)
            </button>
          </div>

          <div className="p-8 md:p-14 border border-white/10 bg-white/[0.01] space-y-12">
            {/* Slider 1: Token Market Cap */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs md:text-sm font-mono uppercase tracking-widest">
                <span className="text-secondary">Капитализация монеты $KOMMUNARKA (Market Cap):</span>
                <span className="text-accent font-bold text-2xl">${marketCap.toLocaleString()} USD</span>
              </div>
              <input
                type="range"
                min="100000"
                max="50000000"
                step="100000"
                value={marketCap}
                onChange={(e) => setMarketCap(Number(e.target.value))}
                className="w-full h-2 bg-white/10 appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-[10px] font-mono text-secondary/60 uppercase tracking-widest">
                <span>$100,000</span>
                <span>$1,000,000</span>
                <span>$10,000,000</span>
                <span>$50,000,000</span>
              </div>
              <div className="text-[10px] font-mono text-secondary">
                Расчетная цена 1 токена: <span className="text-white">${tokenPrice.toFixed(6)} USD</span> (при Supply 1 млрд монеты)
              </div>
            </div>

            {/* Slider 2: Auction Bid */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex justify-between items-center text-xs md:text-sm font-mono uppercase tracking-widest">
                <span className="text-secondary">Сумма победной ставки на аукционе:</span>
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
                <span>$50,000</span>
                <span>$250,000</span>
              </div>
            </div>

            {/* Slider 3: Auctions Count */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex justify-between items-center text-xs md:text-sm font-mono uppercase tracking-widest">
                <span className="text-secondary">Количество аукционов в год:</span>
                <span className="text-accent font-bold text-xl">{auctionsCount} аукционов</span>
              </div>
              <input
                type="range"
                min="2"
                max="52"
                step="1"
                value={auctionsCount}
                onChange={(e) => setAuctionsCount(Number(e.target.value))}
                className="w-full h-2 bg-white/10 appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-[10px] font-mono text-secondary/60 uppercase tracking-widest">
                <span>2 (Раз в полгода)</span>
                <span>12 (Ежемесячно)</span>
                <span>52 (Еженедельно)</span>
              </div>
            </div>

            {/* Dynamic Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div className="p-6 border border-accent/40 bg-accent/5 space-y-3">
                <span className="text-[10px] font-mono text-accent uppercase tracking-widest block">
                  Сожжено токенов с 1 аукциона:
                </span>
                <div className="text-2xl font-bold text-white font-montserrat">
                  {burnedTokensCount.toLocaleString()} <span className="text-sm font-mono text-accent">$KOMMUNARKA</span>
                </div>
                <div className="text-xs font-mono text-accent font-bold">
                  Сокращение эмиссии: -{burnedSupplyPercent}% за 1 торги
                </div>
                <div className="text-[10px] font-mono text-secondary">
                  Эквивалент: ${burnedUSD.toLocaleString()} USD
                </div>
              </div>

              <div className="p-6 border border-white/10 bg-black/40 space-y-3">
                <span className="text-[10px] font-mono text-secondary uppercase tracking-widest block">
                  Выплата Автору ({artistRate * 100}%):
                </span>
                <div className="text-2xl font-bold text-accent font-montserrat">
                  {artistTokensCount.toLocaleString()} <span className="text-sm font-mono text-white">$KOMMUNARKA</span>
                </div>
                <div className="text-xs font-mono text-white font-bold">
                  Эквивалент: ${artistUSD.toLocaleString()} USD
                </div>
                <div className="text-[10px] font-mono text-secondary">Вознаграждение за созданный артефакт</div>
              </div>

              <div className="p-6 border border-white/10 bg-black/40 space-y-3">
                <span className="text-[10px] font-mono text-secondary uppercase tracking-widest block">
                  Годовой дефляционный эффект:
                </span>
                <div className="text-2xl font-bold text-white font-montserrat">
                  {annualBurnedTokensCount.toLocaleString()} <span className="text-sm font-mono text-accent">$KOMMUNARKA</span>
                </div>
                <div className="text-xs font-mono text-accent font-bold">
                  -{annualSupplyPercent}% от общей эмиссии за год!
                </div>
                <div className="text-[10px] font-mono text-secondary">Суммарное сжигание: ${annualBurnedUSD.toLocaleString()} USD</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics & Projection Charts Section */}
      <section className="py-32 px-6 md:px-12 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.5em] text-accent uppercase font-mono block">
              04 / Analytics / Динамика Капитализации & Эмиссии
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-montserrat uppercase tracking-tighter">
              Графики Зависимости & Дефляционная Кривая
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Chart 1: Market Cap Projection */}
            <div className="p-8 border border-white/10 bg-black space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold font-montserrat uppercase text-accent">
                  Прогноз Капитализации ($)
                </h3>
                <span className="text-[10px] font-mono text-secondary uppercase">
                  Текущая Cap: ${marketCap.toLocaleString()}
                </span>
              </div>
              <p className="text-secondary text-xs font-light">
                Рост капитализации при ежедневном/ежемесячном сокращении токенов $KOMMUNARKA на аукционах.
              </p>

              {/* Styled SVG Chart */}
              <div className="h-64 w-full pt-4">
                <svg viewBox="0 0 500 200" className="w-full h-full">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffb703" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#ffb703" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  <line x1="0" y1="40" x2="500" y2="40" stroke="#ffffff10" strokeDasharray="4" />
                  <line x1="0" y1="90" x2="500" y2="90" stroke="#ffffff10" strokeDasharray="4" />
                  <line x1="0" y1="140" x2="500" y2="140" stroke="#ffffff10" strokeDasharray="4" />

                  <path
                    d="M 0 170 Q 120 150 250 90 T 500 30 L 500 190 L 0 190 Z"
                    fill="url(#chartGrad)"
                  />
                  <path
                    d="M 0 170 Q 120 150 250 90 T 500 30"
                    fill="none"
                    stroke="#ffb703"
                    strokeWidth="3"
                  />

                  <circle cx="0" cy="170" r="4" fill="#ffb703" />
                  <circle cx="250" cy="90" r="4" fill="#ffb703" />
                  <circle cx="500" cy="30" r="5" fill="#ffffff" stroke="#ffb703" strokeWidth="2" />
                </svg>
              </div>

              <div className="flex justify-between text-[10px] font-mono text-secondary uppercase pt-2 border-t border-white/5">
                <span>Текущая: ${marketCap.toLocaleString()}</span>
                <span>Прогноз 6 мес: ${(marketCap * 2.2).toLocaleString()}</span>
                <span className="text-accent font-bold">Прогноз 12 мес: ${(marketCap * 5.4).toLocaleString()}</span>
              </div>
            </div>

            {/* Chart 2: Deflation Curve vs Token Price */}
            <div className="p-8 border border-white/10 bg-black space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold font-montserrat uppercase text-accent">
                  Сокращение Эмиссии Монеты (%)
                </h3>
                <span className="text-[10px] font-mono text-secondary uppercase">
                  Годовое сжигание: -{annualSupplyPercent}%
                </span>
              </div>
              <p className="text-secondary text-xs font-light">
                Кривая уменьшения штук токенов в обращении (оранжевая) и рост стоимости 1 монеты $KOMMUNARKA (белая).
              </p>

              {/* Styled SVG Chart 2 */}
              <div className="h-64 w-full pt-4">
                <svg viewBox="0 0 500 200" className="w-full h-full">
                  <line x1="0" y1="50" x2="500" y2="50" stroke="#ffffff10" strokeDasharray="4" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="#ffffff10" strokeDasharray="4" />
                  <line x1="0" y1="150" x2="500" y2="150" stroke="#ffffff10" strokeDasharray="4" />

                  <path
                    d="M 0 30 Q 150 40 300 110 T 500 170"
                    fill="none"
                    stroke="#ffb703"
                    strokeWidth="3"
                  />
                  <path
                    d="M 0 180 Q 180 150 320 80 T 500 20"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeDasharray="6 3"
                  />
                </svg>
              </div>

              <div className="flex justify-between text-[10px] font-mono text-secondary uppercase pt-2 border-t border-white/5">
                <span className="text-accent">● Эмиссия монеты $KOMMUNARKA (Сжигание)</span>
                <span className="text-white">-- Рост цены 1 монеты ($)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artist Gateway Section */}
      <section className="py-32 px-6 md:px-12 bg-black">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <span className="text-[10px] tracking-[0.5em] text-accent uppercase font-mono block">
                05 / Artist Gateway / Для Художников
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

            <div className="p-10 border border-white/10 bg-white/[0.01] space-y-8">
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

      {/* Logistics & Security */}
      <section className="py-32 px-6 md:px-12 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.5em] text-accent uppercase font-mono block">
              06 / Logistics & Security / Логистика
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-montserrat uppercase tracking-tighter">
              Доставка по миру и Vault-Хранение
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-8 border border-white/10 space-y-4 bg-black">
              <h3 className="text-lg font-bold font-montserrat uppercase tracking-tight text-accent">
                [А] Отправка физических картин из РФ
              </h3>
              <p className="text-secondary text-sm font-light leading-relaxed">
                Работы современных авторов (до 50 лет) оформляются экспертом Минкульта РФ за 2-3 дня. Доставка осуществляется компаниями EMS, СДЭК Арт и Art Mail в жестких климатических боксах в 180+ стран мира с полным страхованием.
              </p>
            </div>

            <div className="p-8 border border-white/10 space-y-4 bg-black">
              <h3 className="text-lg font-bold font-montserrat uppercase tracking-tight text-accent">
                [Б] Vault & Claim (Депозитарная Гарантия)
              </h3>
              <p className="text-secondary text-sm font-light leading-relaxed">
                Чтобы не пересылать картину при каждой перепродаже NFT, произведение хранится в безопасном хранилище проекта. Инвестор может свободно торговать NFT 24/7 или в любой момент заказать доставку через кнопку Redeem Physical.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* First Auction Teaser */}
      <section id="first-auction" className="py-32 px-6 md:px-12 bg-black">
        <div className="max-w-4xl mx-auto text-center space-y-8 border border-accent/40 p-12 md:p-20 bg-white/[0.01]">
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
            Физическая арт-скульптура + 1-of-1 NFT Паспорт. Победная ставка сжигает монеты $KOMMUNARKA в прямом эфире.
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
              <p><a href="/KOMMUNARKA_STRATEGY.md" target="_blank" rel="noreferrer" className="text-accent font-bold">Белая Книга (MD)</a></p>
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
