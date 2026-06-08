import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      title: "MANGO COLLECTION",
      subtitle: "IS NOW LIVE",
      buttonText: "ORDER NOW",
      bgImage: "https://picsum.photos/1920/1080?random=1",
      leftImage1: "https://picsum.photos/250/250?random=2",
      leftImage2: "https://picsum.photos/250/250?random=3",
      rightImage1: "https://picsum.photos/250/250?random=4",
      rightImage2: "https://picsum.photos/250/160?random=5",
      titleColor: "#f4c430",
    },
    {
      id: 2,
      title: "CUSTOMIZE YOUR CAKE",
      subtitle: "CREATE YOUR OWN MASTERPIECE",
      buttonText: "DESIGN NOW",
      bgImage: "https://picsum.photos/1920/1080?random=6",
      leftImage1: "https://picsum.photos/250/250?random=7",
      leftImage2: "https://picsum.photos/250/250?random=8",
      rightImage1: "https://picsum.photos/250/250?random=9",
      rightImage2: "https://picsum.photos/250/160?random=10",
      titleColor: "#ff69b4",
    },
    {
      id: 3,
      title: "SPECIAL OFFERS",
      subtitle: "UP TO 40% OFF ON SELECTED CAKES",
      buttonText: "SHOP NOW",
      bgImage: "https://picsum.photos/1920/1080?random=11",
      leftImage1: "https://picsum.photos/250/250?random=12",
      leftImage2: "https://picsum.photos/250/250?random=13",
      rightImage1: "https://picsum.photos/250/250?random=14",
      rightImage2: "https://picsum.photos/250/160?random=15",
      titleColor: "#ff6b6b",
    },
    {
      id: 4,
      title: "FRESH DELIVERY",
      subtitle: "SAME DAY DELIVERY AVAILABLE",
      buttonText: "ORDER FRESH",
      bgImage: "https://picsum.photos/1920/1080?random=16",
      leftImage1: "https://picsum.photos/250/250?random=17",
      leftImage2: "https://picsum.photos/250/250?random=18",
      rightImage1: "https://picsum.photos/250/250?random=19",
      rightImage2: "https://picsum.photos/250/160?random=20",
      titleColor: "#00d4aa",
    },
    {
      id: 5,
      title: "PREMIUM QUALITY",
      subtitle: "MADE WITH FINEST INGREDIENTS",
      buttonText: "EXPLORE",
      bgImage: "https://picsum.photos/1920/1080?random=21",
      leftImage1: "https://picsum.photos/250/250?random=22",
      leftImage2: "https://picsum.photos/250/250?random=23",
      rightImage1: "https://picsum.photos/250/250?random=24",
      rightImage2: "https://picsum.photos/250/160?random=25",
      titleColor: "#ffd700",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const banner = banners[currentSlide];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-between px-4 md:px-8 lg:px-16 transition-all duration-500"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url('${banner.bgImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col gap-4 items-center relative z-10">
          <img
            src={banner.leftImage1}
            alt="Cake 1"
            className="w-48 h-48 object-cover rounded-lg shadow-lg"
          />
          <img
            src={banner.leftImage2}
            alt="Cake 2"
            className="w-48 h-48 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* CENTER */}
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <h1
            className="text-6xl md:text-7xl font-bold mb-4 italic drop-shadow-lg transition-colors duration-300"
            style={{ color: banner.titleColor }}
          >
            {banner.title}
          </h1>
          <p className="text-2xl md:text-3xl text-white font-semibold mb-8 drop-shadow-md">
            {banner.subtitle}
          </p>
          <button
            className="text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 shadow-lg hover:scale-105"
            style={{ backgroundColor: "#fd3f5a" }}
          >
            {banner.buttonText}
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex flex-col gap-4 items-center relative z-10">
          <img
            src={banner.rightImage1}
            alt="Cake 3"
            className="w-48 h-48 object-cover rounded-lg shadow-lg"
          />
          <img
            src={banner.rightImage2}
            alt="Logo"
            className="w-48 h-32 object-contain"
          />
        </div>

        {/* ─── SINGLE WAVE — Menu Light Pink (#fff0f2) ─── */}
        <div className="absolute bottom-0 left-0 w-full z-20">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="w-full h-8 md:h-10"
          >
            <path
              fill="#fff8f9"
              d="
                M0,60
                C25,35 50,35 75,60
                C100,85 125,85 150,60
                C175,35 200,35 225,60
                C250,85 275,85 300,60
                C325,35 350,35 375,60
                C400,85 425,85 450,60
                C475,35 500,35 525,60
                C550,85 575,85 600,60
                C625,35 650,35 675,60
                C700,85 725,85 750,60
                C775,35 800,35 825,60
                C850,85 875,85 900,60
                C925,35 950,35 975,60
                C1000,85 1025,85 1050,60
                C1075,35 1100,35 1125,60
                C1150,85 1175,85 1200,60
                C1225,35 1250,35 1275,60
                C1300,85 1325,85 1350,60
                C1375,35 1400,35 1440,60
                L1440,120
                L0,120
                Z
              "
            />
          </svg>
        </div>

        {/* NAVIGATION */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white p-3 rounded-full transition duration-300 shadow-lg"
          style={{ color: "#fd3f5a" }}
        >
          <ChevronLeft size={32} />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white p-3 rounded-full transition duration-300 shadow-lg"
          style={{ color: "#fd3f5a" }}
        >
          <ChevronRight size={32} />
        </button>

        {/* DOTS */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="rounded-full transition-all duration-300"
              style={{
                width: index === currentSlide ? 28 : 12,
                height: 12,
                backgroundColor:
                  index === currentSlide
                    ? "#fd3f5a"
                    : "rgba(255, 255, 255, 0.6)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;