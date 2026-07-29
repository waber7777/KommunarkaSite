"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import TypewriterText from "@/components/TypewriterText";
import Counter from "@/components/Counter";
import SmokeEffect from "@/components/SmokeEffect";
import AmbientAudio from "@/components/AmbientAudio";

export default function AuctionPage() {
  // Language State: 'ru' | 'en'
  const [lang, setLang] = useState<"ru" | "en">("ru");

  // Calculator mode: 'burn-bidding' or 'botto-buyback'
  const [calcMode, setCalcMode] = useState<"burn-bidding" | "botto-buyback">("burn-bidding");
  
  // Interactive Sliders
  const [marketCap, setMarketCap] = useState<number>(1000000); // Token Market Cap in USD ($100k - $50M)
  const [auctionBid, setAuctionBid] = useState<number>(25000); // Auction Bid in USD ($5k - $250k)
  const [auctionsCount, setAuctionsCount] = useState<number>(12); // Auctions per year

  // Lot #01 Photo Gallery
  const [lotImgIndex, setLotImgIndex] = useState<number>(0);
  const lotImages = [
    "/assets/artworks/zabor-1.jpg",
    "/assets/artworks/zabor-detail-1.jpg",
    "/assets/artworks/zabor-detail-2.jpg"
  ];

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

  // Translations dictionary
  const t = {
    ru: {
      badge: "Phygital Протокол • Solana Mainnet • Двухрежимное Сжигание",
      heroTitleSub: "Sacred Industrial",
      heroTitleMain: "Аукцион & Протокол",
      heroDesc: "Московская мастерская «Коммунарка» представляет Phygital-протокол. Трансформация фарфора и металла в дефляционную токеномику: каждая победная ставка уничтожает токены $KOMMUNARKA на рынке.",
      btnAuction: "Смотреть 1-й Аукцион",
      btnScenarios: "Сценарии 2-х Моделей",
      archSub: "01 / Architecture / Архитектура",
      archTitle: "Триада Phygital-Протокола",
      arch1Tag: "[01] АКТИВ",
      arch1Title: "Физический Артефакт",
      arch1Desc: "Художники мастерской создают утончённые объекты из фарфора, бетона и металла. Каждый предмет оснащается NFC-микрочипом подлинности и 1-of-1 NFT паспортом.",
      arch2Tag: "[02] ДЕФЛЯЦИЯ",
      arch2Title: "Burn Auction Engine",
      arch2Desc: "Торги проходят на смарт-контрактах Solana. Победная ставка рассчитывается в токенах $KOMMUNARKA и сжигается, сокращая общую эмиссию монеты.",
      arch3Tag: "[03] ДОХОДНОСТЬ",
      arch3Title: "Vault & Exhibition Yield",
      arch3Desc: "Картины выставляются в реальных арт-галереях. Держатели токенов и NFT участвуют в доходах от выставочных билетов, мерча и коммерческих лицензий.",
      stepSub: "02 / Execution Scenarios / Шаг за Шагом",
      stepTitle: "Пошаговый Сценарий Работы 2-х Моделей",
      stepDesc: "Сравнение механики проведения торгов, расчетов с Художником и прав проигравших участников.",
      calcSub: "03 / Simulator / Симулятор Капитализации & Сжигания",
      calcTitle: "Калькулятор Сжигания Токенов $KOMMUNARKA",
      calcDesc: "Настройте текущую капитализацию монеты $KOMMUNARKA и размер ставки, чтобы рассчитать точное количество уничтожаемых токенов.",
      mode1: "Модель 1: Burn Bidding (75% Burn)",
      mode2: "Модель 2: Botto-Style Buyback (50% Buyback)",
      sliderMC: "Капитализация монеты $KOMMUNARKA (Market Cap):",
      sliderBid: "Сумма победной ставки на аукционе:",
      sliderCount: "Количество аукционов в год:",
      resBurned: "Сожжено токенов с 1 аукциона:",
      resArtist: "Выплата Автору:",
      resAnnual: "Годовой дефляционный эффект:",
      analyticsSub: "04 / Analytics / Динамика Капитализации & Эмиссии",
      analyticsTitle: "Графики Зависимости & Дефляционная Кривая",
      artistSub: "05 / Artist Gateway / Для Художников",
      artistTitle: "Почему это выгодно авторам?",
      logisticsSub: "06 / Logistics & Security / Логистика",
      logisticsTitle: "Доставка по миру и Vault-Хранение",
      teaserSub: "Upcoming Auction #01",
      teaserTitle: "Первый Phygital Арт-Аукцион",
      teaserBtn: "Скоро Открытие Торгов",
      whitepaperBtn: "Whitepaper (English)",
      strategyBtn: "Стратегия (Russian)"
    },
    en: {
      badge: "Phygital Protocol • Solana Mainnet • Dual Burn Engine",
      heroTitleSub: "Sacred Industrial",
      heroTitleMain: "Auction & Protocol",
      heroDesc: "Moscow Studio Kommunarka presents the Phygital Protocol. Transforming porcelain and steel into deflationary tokenomics: every winning bid destroys $KOMMUNARKA tokens from circulation.",
      btnAuction: "View Auction #01",
      btnScenarios: "View 2 Protocol Models",
      archSub: "01 / Architecture",
      archTitle: "Phygital Protocol Triad",
      arch1Tag: "[01] ASSET",
      arch1Title: "Physical Artifact",
      arch1Desc: "Studio artists craft physical sculptures in porcelain, concrete, and steel. Each item is equipped with an NFC authentication chip and a 1-of-1 NFT provenance passport.",
      arch2Tag: "[02] DEFLATION",
      arch2Title: "Burn Auction Engine",
      arch2Desc: "Auctions execute on Solana smart contracts. Winning bids permanently burn $KOMMUNARKA tokens, generating systematic market scarcity.",
      arch3Tag: "[03] YIELD",
      arch3Title: "Vault & Exhibition Yield",
      arch3Desc: "Physical artworks tour global galleries. Token and NFT holders share in ticket sale revenues, merchandise profits, and commercial licensing.",
      stepSub: "02 / Execution Scenarios",
      stepTitle: "Step-by-Step Model Execution",
      stepDesc: "Comparison of auction mechanics, artist compensation, and non-winning bidder protection.",
      calcSub: "03 / Simulator",
      calcTitle: "$KOMMUNARKA Tokenomics Burn Calculator",
      calcDesc: "Adjust Market Cap and auction bid value to project exact token burn volume and supply reduction.",
      mode1: "Model 1: Burn Bidding (75% Burn)",
      mode2: "Model 2: Botto-Style Buyback (50% Buyback)",
      sliderMC: "$KOMMUNARKA Token Market Cap:",
      sliderBid: "Winning Auction Bid Value:",
      sliderCount: "Auctions per Year:",
      resBurned: "Tokens Burned per Auction:",
      resArtist: "Artist Compensation:",
      resAnnual: "Annual Deflation Impact:",
      analyticsSub: "04 / Analytics",
      analyticsTitle: "Market Cap & Deflation Curve Charts",
      artistSub: "05 / Artist Gateway",
      artistTitle: "Why Artists Win With Us",
      logisticsSub: "06 / Logistics & Security",
      logisticsTitle: "Global Shipping & Vault Depositories",
      teaserSub: "Upcoming Auction #01",
      teaserTitle: "First Phygital Art Auction",
      teaserBtn: "Bidding Opens Soon",
      whitepaperBtn: "Whitepaper (English)",
      strategyBtn: "Strategy (Russian)"
    }
  }[lang];

  return (
    <main className="flex-grow flex flex-col bg-black text-white selection:bg-accent selection:text-black relative">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 relative overflow-hidden">
        {/* Language Switcher Bar */}
        <div className="fixed top-24 right-6 md:right-12 z-50 flex items-center gap-1 border border-white/10 p-1 bg-black/80 backdrop-blur-md text-xs font-mono shadow-lg">
          <button
              onClick={() => setLang("ru")}
              className={`px-3 py-1 transition-all ${
                lang === "ru" ? "bg-accent text-black font-bold" : "text-secondary hover:text-white"
              }`}
            >
              RU
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1 transition-all ${
                lang === "en" ? "bg-accent text-black font-bold" : "text-secondary hover:text-white"
              }`}
            >
              EN
            </button>
          </div>

        {/* Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/[0.03] backdrop-blur-md mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] md:text-xs font-mono tracking-[0.25em] text-secondary uppercase">
              {t.badge}
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
                {t.heroTitleSub}
              </motion.span>
            </span>
            <span className="overflow-hidden">
              <motion.span
                initial={{ y: "120%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="block text-accent"
              >
                {t.heroTitleMain}
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
              {t.heroDesc}
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
              {t.btnAuction}
            </a>
            <a
              href="#step-by-step"
              className="px-8 py-4 border border-white/20 text-white font-mono uppercase tracking-[0.15em] text-xs hover:border-accent hover:text-accent transition-colors bg-white/[0.02]"
            >
              {t.btnScenarios}
            </a>
            <a
              href={lang === "en" ? "/WHITEPAPER.md" : "/KOMMUNARKA_STRATEGY.md"}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 border border-accent text-accent font-bold font-mono uppercase tracking-[0.15em] text-xs hover:bg-accent hover:text-black transition-colors"
            >
              {lang === "en" ? "Whitepaper (Strategy)" : "Whitepaper (Стратегия)"}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-32 px-6 md:px-12 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.5em] text-accent uppercase font-mono block">
              {t.archSub}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-montserrat uppercase tracking-tighter">
              {t.archTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-white/10 space-y-6 hover:border-accent/50 transition-colors bg-black/40">
              <span className="text-xs font-mono text-accent uppercase tracking-widest block">{t.arch1Tag}</span>
              <h3 className="text-xl font-bold font-montserrat uppercase tracking-tight">{t.arch1Title}</h3>
              <p className="text-secondary text-sm leading-relaxed font-light">
                {t.arch1Desc}
              </p>
            </div>

            <div className="p-8 border border-white/10 space-y-6 hover:border-accent/50 transition-colors bg-black/40">
              <span className="text-xs font-mono text-accent uppercase tracking-widest block">{t.arch2Tag}</span>
              <h3 className="text-xl font-bold font-montserrat uppercase tracking-tight">{t.arch2Title}</h3>
              <p className="text-secondary text-sm leading-relaxed font-light">
                {t.arch2Desc}
              </p>
            </div>

            <div className="p-8 border border-white/10 space-y-6 hover:border-accent/50 transition-colors bg-black/40">
              <span className="text-xs font-mono text-accent uppercase tracking-widest block">{t.arch3Tag}</span>
              <h3 className="text-xl font-bold font-montserrat uppercase tracking-tight">{t.arch3Title}</h3>
              <p className="text-secondary text-sm leading-relaxed font-light">
                {t.arch3Desc}
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
              {t.stepSub}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-montserrat uppercase tracking-tighter">
              {t.stepTitle}
            </h2>
            <p className="text-secondary text-sm md:text-base max-w-2xl mx-auto font-light">
              {t.stepDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Model 1 Walkthrough */}
            <div className="p-8 border border-accent/40 bg-white/[0.01] space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <h3 className="text-lg font-bold font-montserrat uppercase text-accent">
                  {lang === "ru" ? "Модель 1: Burn Bidding (Прямые ставки)" : "Model 1: Burn Bidding (Direct Bids)"}
                </h3>
                <span className="text-[10px] font-mono text-secondary uppercase border border-accent/30 px-2 py-1">
                  $KOMMUNARKA
                </span>
              </div>

              <div className="space-y-4 text-xs font-mono leading-relaxed text-secondary">
                <div className="p-4 bg-black border border-white/10 space-y-1">
                  <span className="text-accent font-bold">1. {lang === "ru" ? "Ставки Участников" : "Participant Bids"}:</span>
                  <p className="text-zinc-300">
                    {lang === "ru"
                      ? "Ставки принимаются исключительно в токенах $KOMMUNARKA. Средства участников замораживаются смарт-контрактом на время аукциона."
                      : "Bids are placed strictly in $KOMMUNARKA tokens. Participant funds are locked in smart contracts for the auction duration."}
                  </p>
                </div>

                <div className="p-4 bg-black border border-white/10 space-y-1">
                  <span className="text-accent font-bold">2. {lang === "ru" ? "Права Проигравших (100% Возврат)" : "Non-winning Bidders (100% Refund)"}:</span>
                  <p className="text-zinc-300">
                    {lang === "ru"
                      ? "Все несыгравшие ставки автоматически возвращаются на кошельки участников. Проигравшие сохраняют 100% токенов, которые дорожают от сжигания!"
                      : "All non-winning bids are instantly refunded to bidder wallets. Unsuccessful bidders retain 100% of their tokens, which appreciate from the burn!"}
                  </p>
                </div>

                <div className="p-4 bg-black border border-white/10 space-y-1">
                  <span className="text-accent font-bold">3. {lang === "ru" ? "Победная Ставка (75% Burn / 25% Artist)" : "Winning Bid Allocation"}:</span>
                  <p className="text-zinc-300">
                    {lang === "ru"
                      ? "75% токенов победителя сжигается на Dead-адрес (сокращая эмиссию). 25% токенов переводится Создателю/Художнику."
                      : "75% of winning tokens are permanently burned to a dead address. 25% is transferred directly to the Artist."}
                  </p>
                </div>
              </div>
            </div>

            {/* Model 2 Walkthrough */}
            <div className="p-8 border border-white/20 bg-white/[0.01] space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <h3 className="text-lg font-bold font-montserrat uppercase text-white">
                  {lang === "ru" ? "Модель 2: Botto-Style Buyback (Выкуп с рынка)" : "Model 2: Botto-Style Buyback"}
                </h3>
                <span className="text-[10px] font-mono text-secondary uppercase border border-white/30 px-2 py-1">
                  SOL / USDT / Fiat
                </span>
              </div>

              <div className="space-y-4 text-xs font-mono leading-relaxed text-secondary">
                <div className="p-4 bg-black border border-white/10 space-y-1">
                  <span className="text-white font-bold">1. {lang === "ru" ? "Ставки Участников" : "Participant Bids"}:</span>
                  <p className="text-zinc-300">
                    {lang === "ru"
                      ? "Ставки принимаются в SOL, USDT, USDC или фиатной картой. Низкий барьер для традиционных арт-коллекционеров."
                      : "Bids accepted in SOL, USDT, USDC, or credit cards. Frictionless onboarding for traditional art collectors."}
                  </p>
                </div>

                <div className="p-4 bg-black border border-white/10 space-y-1">
                  <span className="text-white font-bold">2. {lang === "ru" ? "Права Проигравших (100% Возврат)" : "Non-winning Bidders (100% Refund)"}:</span>
                  <p className="text-zinc-300">
                    {lang === "ru"
                      ? "Все несыгравшие SOL/USDT разблокируются на кошельки. Участники зарабатывают на росте курса своего портфеля токенов."
                      : "All non-winning funds instantly unlocked. Token holders benefit from market buyback appreciation."}
                  </p>
                </div>

                <div className="p-4 bg-black border border-white/10 space-y-1">
                  <span className="text-white font-bold">3. {lang === "ru" ? "Распределение (50% Buyback & Burn / 50% Artist)" : "Proceeds Allocation"}:</span>
                  <p className="text-zinc-300">
                    {lang === "ru"
                      ? "50% средств откупают токены $KOMMUNARKA с рынка на Raydium (создавая зеленые свечи) и сжигают их. 50% выплачиваются Художнику."
                      : "50% of proceeds execute DEX Market Buy on Raydium (green candles) and burn acquired tokens. 50% paid to Artist."}
                  </p>
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
              {t.calcSub}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-montserrat uppercase tracking-tighter">
              {t.calcTitle}
            </h2>
            <p className="text-secondary text-sm md:text-base max-w-xl mx-auto font-light">
              {t.calcDesc}
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
              {t.mode1}
            </button>
            <button
              onClick={() => setCalcMode("botto-buyback")}
              className={`px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] border-b-2 transition-all ${
                calcMode === "botto-buyback"
                  ? "border-accent text-accent bg-white/[0.02]"
                  : "border-transparent text-secondary hover:text-white"
              }`}
            >
              {t.mode2}
            </button>
          </div>

          <div className="p-8 md:p-14 border border-white/10 bg-white/[0.01] space-y-12">
            {/* Slider 1: Token Market Cap */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs md:text-sm font-mono uppercase tracking-widest">
                <span className="text-secondary">{t.sliderMC}</span>
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
                {lang === "ru" ? "Расчетная цена 1 токена:" : "Estimated Token Price:"}{" "}
                <span className="text-white">${tokenPrice.toFixed(6)} USD</span> (Supply 1B)
              </div>
            </div>

            {/* Slider 2: Auction Bid */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex justify-between items-center text-xs md:text-sm font-mono uppercase tracking-widest">
                <span className="text-secondary">{t.sliderBid}</span>
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
                <span className="text-secondary">{t.sliderCount}</span>
                <span className="text-accent font-bold text-xl">{auctionsCount} {lang === "ru" ? "аукционов" : "auctions"}</span>
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
                <span>2 ({lang === "ru" ? "Раз в полгода" : "Biannual"})</span>
                <span>12 ({lang === "ru" ? "Ежемесячно" : "Monthly"})</span>
                <span>52 ({lang === "ru" ? "Еженедельно" : "Weekly"})</span>
              </div>
            </div>

            {/* Dynamic Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div className="p-6 border border-accent/40 bg-accent/5 space-y-3">
                <span className="text-[10px] font-mono text-accent uppercase tracking-widest block">
                  {t.resBurned}
                </span>
                <div className="text-2xl font-bold text-white font-montserrat">
                  {burnedTokensCount.toLocaleString()} <span className="text-sm font-mono text-accent">$KOMMUNARKA</span>
                </div>
                <div className="text-xs font-mono text-accent font-bold">
                  {lang === "ru" ? "Сокращение эмиссии:" : "Supply Cut:"} -{burnedSupplyPercent}%
                </div>
                <div className="text-[10px] font-mono text-secondary">
                  USD: ${burnedUSD.toLocaleString()}
                </div>
              </div>

              <div className="p-6 border border-white/10 bg-black/40 space-y-3">
                <span className="text-[10px] font-mono text-secondary uppercase tracking-widest block">
                  {t.resArtist} ({artistRate * 100}%):
                </span>
                <div className="text-2xl font-bold text-accent font-montserrat">
                  {artistTokensCount.toLocaleString()} <span className="text-sm font-mono text-white">$KOMMUNARKA</span>
                </div>
                <div className="text-xs font-mono text-white font-bold">
                  USD: ${artistUSD.toLocaleString()}
                </div>
                <div className="text-[10px] font-mono text-secondary">
                  {lang === "ru" ? "Вознаграждение за артефакт" : "Direct artist compensation"}
                </div>
              </div>

              <div className="p-6 border border-white/10 bg-black/40 space-y-3">
                <span className="text-[10px] font-mono text-secondary uppercase tracking-widest block">
                  {t.resAnnual}
                </span>
                <div className="text-2xl font-bold text-white font-montserrat">
                  {annualBurnedTokensCount.toLocaleString()} <span className="text-sm font-mono text-accent">$KOMMUNARKA</span>
                </div>
                <div className="text-xs font-mono text-accent font-bold">
                  -{annualSupplyPercent}% {lang === "ru" ? "от эмиссии в год!" : "total annual supply burned!"}
                </div>
                <div className="text-[10px] font-mono text-secondary">USD: ${annualBurnedUSD.toLocaleString()}</div>
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
              {t.analyticsSub}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-montserrat uppercase tracking-tighter">
              {t.analyticsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Chart 1: Market Cap Projection */}
            <div className="p-8 border border-white/10 bg-black space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold font-montserrat uppercase text-accent">
                  {lang === "ru" ? "Прогноз Капитализации ($)" : "Market Cap Projection ($)"}
                </h3>
                <span className="text-[10px] font-mono text-secondary uppercase">
                  Cap: ${marketCap.toLocaleString()}
                </span>
              </div>
              <p className="text-secondary text-xs font-light">
                {lang === "ru"
                  ? "Рост капитализации при ежедневном/ежемесячном сокращении токенов $KOMMUNARKA на аукционах."
                  : "Market cap appreciation curve generated by systematic auction token burns."}
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
                <span>Start: ${marketCap.toLocaleString()}</span>
                <span>6M: ${(marketCap * 2.2).toLocaleString()}</span>
                <span className="text-accent font-bold">12M: ${(marketCap * 5.4).toLocaleString()}</span>
              </div>
            </div>

            {/* Chart 2: Deflation Curve vs Token Price */}
            <div className="p-8 border border-white/10 bg-black space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold font-montserrat uppercase text-accent">
                  {lang === "ru" ? "Сокращение Эмиссии Монеты (%)" : "Supply Reduction Deflation Curve (%)"}
                </h3>
                <span className="text-[10px] font-mono text-secondary uppercase">
                  Annual Burn: -{annualSupplyPercent}%
                </span>
              </div>
              <p className="text-secondary text-xs font-light">
                {lang === "ru"
                  ? "Кривая уменьшения штук токенов в обращении (оранжевая) и рост стоимости 1 монеты $KOMMUNARKA (белая)."
                  : "Circulating token reduction curve (orange) vs token unit price appreciation (white)."}
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
                <span className="text-accent">● {lang === "ru" ? "Эмиссия токена" : "Circulating Supply"}</span>
                <span className="text-white">-- {lang === "ru" ? "Цена 1 монеты" : "Token Price"}</span>
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
                {t.artistSub}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-montserrat uppercase tracking-tighter leading-tight">
                {t.artistTitle}
              </h2>
              <p className="text-secondary text-base leading-relaxed font-light">
                {lang === "ru"
                  ? "Мы предлагаем авторам трансформировать классическую модель продаж. Традиционная галерея забирает до 50% комиссии, в то время как наш протокол гарантирует высокую оплату за работу и пожизненные роялти."
                  : "We empower traditional artists to break free from traditional 50% gallery commissions. Our protocol provides direct auction payouts and lifetime secondary on-chain royalties."}
              </p>

              <div className="space-y-6 border-l-2 border-accent/40 pl-6 font-mono text-xs md:text-sm uppercase tracking-wider text-secondary leading-loose">
                <p className="hover:text-white transition-colors">1. {lang === "ru" ? "Гарантированный доход за каждую работу" : "Direct upfront compensation per artwork"}</p>
                <p className="hover:text-white transition-colors">2. {lang === "ru" ? "5–10% роялти от ВСЕХ вторичных перепродаж" : "5-10% lifetime secondary NFT royalties"}</p>
                <p className="hover:text-white transition-colors">3. {lang === "ru" ? "Глобальная аудитория коллекционеров" : "Global international collector audience"}</p>
                <p className="hover:text-white transition-colors">4. {lang === "ru" ? "Сохранение ценности физического холста" : "Preservation of physical craftsmanship"}</p>
              </div>
            </div>

            <div className="p-10 border border-white/10 bg-white/[0.01] space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-accent uppercase tracking-widest block">
                  Proof of Concept / Доказанный Кейс
                </span>
                <h3 className="text-2xl font-bold font-montserrat uppercase tracking-tight">
                  Botto DAO ($4M+ Sales)
                </h3>
              </div>
              <p className="text-secondary text-sm font-light leading-relaxed">
                {lang === "ru"
                  ? "Децентрализованный проект Botto доказал эффективность арт-токеномики: с 2021 года было продано более 140 оригинальных работ на аукционах SuperRare на общую сумму свыше $4,000,000+, а рекордные картины уходили по $300,000 за штуку."
                  : "Botto proved art tokenomics efficacy: over 140 pieces sold on SuperRare generating $4,000,000+ in sales, with top works reaching $300,000 per piece."}
              </p>

              <div className="pt-4 flex flex-wrap gap-4 text-xs font-mono uppercase tracking-widest">
                <a
                  href="https://botto.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent hover:underline"
                >
                  Botto Site →
                </a>
                <a
                  href="https://superrare.com/botto"
                  target="_blank"
                  rel="noreferrer"
                  className="text-secondary hover:text-white"
                >
                  SuperRare →
                </a>
                <a
                  href="https://dexscreener.com/ethereum/0x9dfad1b7102d4a994df7eed759f2fa88301ebca5"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent hover:underline"
                >
                  DexScreener ($BOTTO) →
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
              {t.logisticsSub}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-montserrat uppercase tracking-tighter">
              {t.logisticsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-8 border border-white/10 space-y-4 bg-black">
              <h3 className="text-lg font-bold font-montserrat uppercase tracking-tight text-accent">
                [A] {lang === "ru" ? "Отправка физических картин из РФ" : "Global Shipping from Russia"}
              </h3>
              <p className="text-secondary text-sm font-light leading-relaxed">
                {lang === "ru"
                  ? "Работы современных авторов (до 50 лет) оформляются экспертом Минкульта РФ за 2-3 дня. Доставка осуществляется компаниями EMS, СДЭК Арт и Art Mail в жестких климатических боксах в 180+ стран мира с полным страхованием."
                  : "Contemporary artwork export permits processed within 2-3 days via Ministry of Culture experts. Delivered to 180+ countries via EMS, CDEK Art, and Art Mail with wooden crate packaging and full insurance."}
              </p>
            </div>

            <div className="p-8 border border-white/10 space-y-4 bg-black">
              <h3 className="text-lg font-bold font-montserrat uppercase tracking-tight text-accent">
                [B] Vault & Claim ({lang === "ru" ? "Депозитарная Гарантия" : "Vault Depository"})
              </h3>
              <p className="text-secondary text-sm font-light leading-relaxed">
                {lang === "ru"
                  ? "Чтобы не пересылать картину при каждой перепродаже NFT, произведение хранится в безопасном хранилище проекта. Инвестор может свободно торговать NFT 24/7 или в любой момент заказать доставку через кнопку Redeem Physical."
                  : "Physical artwork remains securely stored in studio vaults while the NFT trades 24/7 globally. Collectors can trigger Physical Redemption anytime with full delivery guarantee."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* First Auction Teaser */}
      <section id="first-auction" className="py-32 px-6 md:px-12 bg-black border-t border-white/5">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <span className="text-[10px] font-mono tracking-[0.5em] text-accent uppercase block">
              {t.teaserSub}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-montserrat uppercase tracking-tighter">
              {t.teaserTitle}
            </h2>
            <TypewriterText
              text={lang === "ru" ? "Лот №01: Индустриальный арт-объект «Заборы. Лист №1»" : "Lot #01: Industrial Artwork «Fences. Sheet No. 1»"}
              className="text-base md:text-xl text-accent font-mono"
              speed={40}
            />
          </div>

          {/* Featured Lot Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-accent/40 bg-white/[0.01] p-8 md:p-12 items-center">
            {/* Artwork Image Container & Gallery Thumbnails */}
            <div className="space-y-4">
              <div className="relative group overflow-hidden border border-white/10 aspect-[3/4] bg-black flex items-center justify-center p-2">
                <img
                  src={lotImages[lotImgIndex]}
                  alt="Заборы. Лист №1"
                  className="w-full h-full object-contain filter contrast-110 group-hover:scale-105 transition-all duration-700"
                />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-3 gap-3">
                {lotImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setLotImgIndex(idx)}
                    className={`border overflow-hidden aspect-square bg-zinc-950 p-1 transition-all ${
                      lotImgIndex === idx ? "border-accent ring-1 ring-accent opacity-100" : "border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`Вид ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Artwork Details & Instagram Link */}
            <div className="space-y-6">
              <div className="space-y-4 border-b border-white/10 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[10px] font-mono text-secondary uppercase tracking-[0.25em]">
                    {lang === "ru" ? "Первый Арт-Лот" : "Featured Auction Item"}
                  </span>
                  <span className="px-3 py-1 bg-accent/10 border border-accent/40 text-accent font-mono font-bold text-[10px] uppercase tracking-widest">
                    LOT #01 • 1-OF-1 PHYGITAL
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl md:text-4xl font-bold font-montserrat uppercase text-white tracking-tight">
                    {lang === "ru" ? "Заборы. Лист №1" : "Fences. Sheet No. 1"}
                  </h3>
                  <span className="text-xs font-mono text-accent block mt-1.5">2026 • Moscow Studio</span>
                </div>
              </div>

              <div className="space-y-3 text-xs font-mono text-secondary">
                <p>
                  <span className="text-white font-bold">{lang === "ru" ? "Материалы:" : "Materials:"}</span>{" "}
                  {lang === "ru"
                    ? "Профлист, сварка, дерево, тушь, художественное ржавление."
                    : "Corrugated steel sheet, welding, wood, Indian ink, artistic rust patina."}
                </p>
                <p>
                  <span className="text-white font-bold">{lang === "ru" ? "Размеры:" : "Dimensions:"}</span> 200 × 120 см
                </p>
                <p>
                  <span className="text-white font-bold">{lang === "ru" ? "Сопровождение:" : "Provenance:"}</span>{" "}
                  {lang === "ru"
                    ? "Физический объект + NFC-чип + 1-of-1 NFT Паспорт Solana."
                    : "Physical artwork + NFC authentication + 1-of-1 Solana NFT Passport."}
                </p>
              </div>

              <div className="pt-4 flex flex-col gap-4">
                <a
                  href="https://www.instagram.com/p/Dau3m_RCI-T/?img_index=1"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 border border-accent text-accent font-bold font-mono text-center text-xs uppercase tracking-widest hover:bg-accent hover:text-black transition-colors"
                >
                  {lang === "ru" ? "Посмотреть в Instagram (@kommunarkazames) ↗" : "View on Instagram (@kommunarkazames) ↗"}
                </a>

                <button className="w-full py-4 bg-accent text-black font-bold uppercase tracking-[0.2em] font-mono text-xs hover:bg-white transition-colors">
                  {t.teaserBtn}
                </button>
              </div>
            </div>
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
              <span className="text-white block">Documentation</span>
              <p><a href={lang === "en" ? "/WHITEPAPER.md" : "/KOMMUNARKA_STRATEGY.md"} target="_blank" rel="noreferrer" className="text-accent font-bold">Whitepaper</a></p>
              <p><a href="/#archive">Артефакты</a></p>
            </div>
            <div className="space-y-4">
              <span className="text-white block">Social</span>
              <p>
                <a
                  href="https://www.instagram.com/kommunarkazames/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent font-bold hover:underline"
                >
                  Instagram @kommunarkazames ↗
                </a>
              </p>
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
