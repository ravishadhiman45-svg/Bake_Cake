import React, { useState, useEffect, useCallback } from "react";

const MenuSection = () => {
  // ─── Color Palette (based on #fd3f5a) ───
  const colors = {
    primary: "#fd3f5a",
    primaryDark: "#e63650",
    primaryLight: "#ff6b80",
    primaryLighter: "#ff99a8",
    primarySoft: "#ffc2cb",
    primaryMuted: "#ffe4e8",
    primaryFaint: "#fff0f2",
    primaryGhost: "#fff8f9",
    textMain: "#2a2a2a",
    textBody: "#555555",
    textLight: "#888888",
    white: "#ffffff",
  };

  const menuItems = [
    { id: 1, name: "Classic", image: "https://picsum.photos/300/400?random=10" },
    { id: 2, name: "Gourmet", image: "https://picsum.photos/300/400?random=11" },
    { id: 3, name: "Designer", image: "https://picsum.photos/300/400?random=12" },
    { id: 4, name: "Photo Cake", image: "https://picsum.photos/300/400?random=13" },
    { id: 5, name: "Desserts", image: "https://picsum.photos/300/400?random=14" },
    { id: 6, name: "Hampers", image: "https://picsum.photos/300/400?random=15" },
  ];

  const cakes = [
    { id: 1, name: "Rich Chocolate Truffle", price: "$5.99", image: "https://picsum.photos/300/300?random=20" },
    { id: 2, name: "Choco Chip Truffle", price: "$5.99", image: "https://picsum.photos/300/300?random=21" },
    { id: 3, name: "Tropical Fruit Amaze", price: "$6.99", image: "https://picsum.photos/300/300?random=22" },
    { id: 4, name: "Butterscotch Crunch", price: "$5.99", image: "https://picsum.photos/300/300?random=23" },
    { id: 5, name: "Whipped Cream Pie", price: "$4.99", image: "https://picsum.photos/300/300?random=24" },
    { id: 6, name: "Rose Petal & Pistachio", price: "$6.99", image: "https://picsum.photos/300/300?random=25" },
    { id: 7, name: "Chocolate Vanilla Mix", price: "$5.99", image: "https://picsum.photos/300/300?random=26" },
    { id: 8, name: "Red Lip Chocolate Truffle", price: "$5.99", image: "https://picsum.photos/300/300?random=27" },
    { id: 9, name: "Blueberry Cheesecake", price: "$6.99", image: "https://picsum.photos/300/300?random=28" },
    { id: 10, name: "Classic Black Forest", price: "$5.99", image: "https://picsum.photos/300/300?random=29" },
    { id: 11, name: "Choco Truffle Cake", price: "$5.99", image: "https://picsum.photos/300/300?random=30" },
    { id: 12, name: "Belgian Chocolate Cake", price: "$6.99", image: "https://picsum.photos/300/300?random=31" },
  ];

  // ─── Carousel Logic ───
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(6);
  const [isPaused, setIsPaused] = useState(false);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(2);
      else if (window.innerWidth < 1024) setItemsPerView(4);
      else setItemsPerView(6);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, cakes.length - itemsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-scroll every 3 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section
      className="w-full py-24 px-4"
      style={{ background: `linear-gradient(180deg, ${colors.white} 0%, ${colors.primaryGhost} 30%, ${colors.primaryFaint} 100%)` }}
    >
      {/* ─── MENU TITLE ─── */}
      <div className="text-center mb-24">
        <span
          className="inline-block text-xs font-semibold tracking-[0.35em] uppercase mb-5 px-5 py-2 rounded-full"
          style={{ color: colors.primary, backgroundColor: colors.primaryMuted, fontFamily: "'Inter', sans-serif" }}
        >
          Our Collection
        </span>
        <h2
          className="text-5xl md:text-6xl font-bold mb-5 tracking-tight"
          style={{ fontFamily: "'Playfair Display', 'Georgia', serif", color: colors.textMain }}
        >
          The Menu
        </h2>
        <div className="w-20 h-1 mx-auto mb-5 rounded-full" style={{ backgroundColor: colors.primary }} />
        <p className="text-lg font-light tracking-wide" style={{ fontFamily: "'Inter', sans-serif", color: colors.textLight }}>
          What will you order today?
        </p>
      </div>

      {/* ─── MENU ITEMS GRID (Portrait Cards) ─── */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 mb-28">
        {menuItems.map((item) => (
          <div key={item.id} className="flex flex-col items-center group cursor-pointer">
            {/* Portrait Card: width ~ 160px, height ~ 220px (3:4 ratio) */}
            <div
              className="w-36 h-48 md:w-40 md:h-52 lg:w-48 lg:h-60 rounded-2xl overflow-hidden mb-5 transition-all duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-2 relative"
              style={{
                boxShadow: `0 12px 40px -8px ${colors.primarySoft}`,
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 rounded-2xl"
                style={{ background: `linear-gradient(135deg, ${colors.primaryMuted}80 0%, transparent 100%)` }}
              />
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Bottom gradient overlay for text readability */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1/3 z-10 rounded-b-2xl"
                style={{ background: `linear-gradient(to top, ${colors.primaryDark}cc 0%, transparent 100%)` }}
              />
              {/* Name on card */}
              <div className="absolute bottom-3 left-0 right-0 z-20 text-center">
                <p
                  className="text-white text-xs md:text-sm font-bold tracking-wide uppercase"
                  style={{ fontFamily: "'Inter', sans-serif", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
                >
                  {item.name}
                </p>
              </div>
            </div>
            {/* Optional: keep name below card too, or remove this if you prefer name only on card */}
            <p
              className="font-semibold text-sm md:text-base text-center tracking-wide transition-colors duration-300 group-hover:text-[#fd3f5a] lg:hidden"
              style={{ fontFamily: "'Inter', sans-serif", color: colors.textMain }}
            >
              {item.name}
            </p>
            <div
              className="w-6 h-0.5 mt-2 rounded-full transition-all duration-300 group-hover:w-10 lg:hidden"
              style={{ backgroundColor: colors.primarySoft }}
            />
          </div>
        ))}
      </div>

      {/* ─── INDIA LOVES CAROUSEL ─── */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs font-semibold tracking-[0.35em] uppercase mb-5 px-5 py-2 rounded-full"
            style={{ color: colors.primary, backgroundColor: colors.primaryMuted, fontFamily: "'Inter', sans-serif" }}
          >
            Trending Now
          </span>
          <h3
            className="text-4xl md:text-5xl font-bold mb-5 tracking-tight"
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif", color: colors.primary }}
          >
            India Loves
          </h3>
          <div className="w-16 h-0.5 mx-auto mb-5 rounded-full" style={{ backgroundColor: colors.primaryLight }} />
          <p className="text-base md:text-lg font-light" style={{ fontFamily: "'Inter', sans-serif", color: colors.textLight }}>
            Best cakes from across the country, handpicked for you
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative group/carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 -translate-x-2 group-hover/carousel:translate-x-0 hover:scale-110"
            style={{
              backgroundColor: colors.white,
              boxShadow: `0 4px 20px ${colors.primarySoft}`,
              border: `1px solid ${colors.primaryFaint}`,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 translate-x-2 group-hover/carousel:translate-x-0 hover:scale-110"
            style={{
              backgroundColor: colors.white,
              boxShadow: `0 4px 20px ${colors.primarySoft}`,
              border: `1px solid ${colors.primaryFaint}`,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden mx-2 md:mx-8">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {cakes.map((cake) => (
                <div
                  key={cake.id}
                  className="flex-shrink-0 px-2 md:px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="flex flex-col items-center group cursor-pointer">
                    <div
                      className="w-full aspect-square rounded-2xl overflow-hidden mb-4 transition-all duration-500 ease-out group-hover:shadow-xl group-hover:-translate-y-1 relative"
                      style={{
                        boxShadow: `0 4px 24px -6px ${colors.primarySoft}`,
                        border: `1px solid ${colors.primaryFaint}`,
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 rounded-2xl"
                        style={{ background: `linear-gradient(to top, ${colors.primaryMuted}cc 0%, transparent 70%)` }}
                      />
                      <img
                        src={cake.image}
                        alt={cake.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Hover Price Tag */}
                      <div
                        className="absolute top-3 right-3 z-20 px-3 py-1.5 rounded-full text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                        style={{ backgroundColor: colors.primary, boxShadow: `0 4px 16px ${colors.primaryMuted}` }}
                      >
                        {cake.price}
                      </div>
                    </div>
                    <p
                      className="text-xs md:text-sm font-semibold text-center leading-snug mb-1.5 transition-colors duration-300 group-hover:text-[#fd3f5a] px-1"
                      style={{ fontFamily: "'Inter', sans-serif", color: colors.textMain }}
                    >
                      {cake.name}
                    </p>
                    <p
                      className="text-xs font-bold tracking-wide"
                      style={{ color: colors.primary, fontFamily: "'Inter', sans-serif" }}
                    >
                      {cake.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center items-center gap-2 mt-10">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: currentIndex === idx ? 24 : 8,
                  height: 8,
                  backgroundColor: currentIndex === idx ? colors.primary : colors.primarySoft,
                  borderRadius: 9999,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;