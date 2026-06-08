import React from "react";
import { Play } from "lucide-react";

const PromotionalSection = () => {
  return (
    <section className="w-full bg-gradient-to-b from-white to-pink-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* VIDEO PROMOTIONAL SECTION */}
        <div className="relative mb-20 bg-gradient-to-r from-red-900 to-red-700 rounded-lg overflow-hidden shadow-xl">
          <div className="flex items-center justify-between p-8 md:p-12">
            <div>
              <h3 className="text-white text-2xl md:text-4xl font-bold mb-2 text-center md:text-left">
                MEET LUCKY GRANDPAA WHO GOT AN
                <br />
                UNEXPECTED SURPRISE.
              </h3>
              <p className="text-red-100 text-lg text-center md:text-left">
                🎉 NEVER STOP WISHING
              </p>
            </div>
            <button className="hidden md:flex items-center justify-center w-24 h-24 bg-white rounded-full hover:scale-110 transition duration-300 shadow-lg">
              <Play className="text-red-700 fill-red-700" size={40} />
            </button>
          </div>
          <button className="md:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-16 h-16 bg-white rounded-full hover:scale-110 transition duration-300 shadow-lg">
            <Play className="text-red-700 fill-red-700" size={28} />
          </button>
        </div>

        {/* MAGICAL TICKET SECTION */}
        <div className="relative mb-20">
          <div
            className="relative bg-gradient-to-b from-pink-200 to-pink-100 rounded-3xl border-8 border-yellow-500 p-8 md:p-12 text-center overflow-hidden"
            style={{
              clipPath:
                "polygon(0 0, 100% 0, 100% 80%, 98% 85%, 96% 80%, 94% 85%, 92% 80%, 90% 85%, 88% 80%, 86% 85%, 84% 80%, 82% 85%, 80% 80%, 78% 85%, 76% 80%, 74% 85%, 72% 80%, 70% 85%, 68% 80%, 66% 85%, 64% 80%, 62% 85%, 60% 80%, 58% 85%, 56% 80%, 54% 85%, 52% 80%, 50% 85%, 48% 80%, 46% 85%, 44% 80%, 42% 85%, 40% 80%, 38% 85%, 36% 80%, 34% 85%, 32% 80%, 30% 85%, 28% 80%, 26% 85%, 24% 80%, 22% 85%, 20% 80%, 18% 85%, 16% 80%, 14% 85%, 12% 80%, 10% 85%, 8% 80%, 6% 85%, 4% 80%, 2% 85%, 0 80%)",
            }}
          >
            <div className="absolute top-4 left-8 text-4xl">🌶️</div>
            <div className="absolute top-4 right-8 text-4xl">✨</div>

            <h3 className="text-3xl md:text-5xl font-bold text-[#ff3333] mb-4 italic">
              THE MAGICAL TICKET
            </h3>
            <p className="text-gray-800 text-lg md:text-xl mb-6">
              Add 3 reminders in your account.
              <br />
              Win offers worth Rs. 750
            </p>
            <button className="bg-[#ff3333] hover:bg-[#ff5555] text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-lg">
              UNLOCK NOW
            </button>
          </div>
        </div>

        {/* WHAT'S IN YOUR HEART SECTION */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-[#ff3333] mb-2">
            What's In Your Heart?
          </h3>
          <p className="text-gray-600 text-sm md:text-base">
            A glimpse from our social world 🌹
          </p>
        </div>

        {/* SOCIAL MEDIA GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            "https://picsum.photos/150/150?random=40",
            "https://picsum.photos/150/150?random=41",
            "https://picsum.photos/150/150?random=42",
            "https://picsum.photos/150/150?random=43",
            "https://picsum.photos/150/150?random=44",
            "https://picsum.photos/150/150?random=45",
            "https://picsum.photos/150/150?random=46",
            "https://picsum.photos/150/150?random=47",
            "https://picsum.photos/150/150?random=48",
            "https://picsum.photos/150/150?random=49",
            "https://picsum.photos/150/150?random=50",
            "https://picsum.photos/150/150?random=51",
            "https://picsum.photos/150/150?random=52",
            "https://picsum.photos/150/150?random=53",
            "https://picsum.photos/150/150?random=54",
            "https://picsum.photos/150/150?random=55",
            "https://picsum.photos/150/150?random=56",
            "https://picsum.photos/150/150?random=57",
            "https://picsum.photos/150/150?random=58",
            "https://picsum.photos/150/150?random=59",
            "https://picsum.photos/150/150?random=60",
            "https://picsum.photos/150/150?random=61",
            "https://picsum.photos/150/150?random=62",
            "https://picsum.photos/150/150?random=63",
          ].map((img, idx) => (
            <div
              key={idx}
              className="h-32 md:h-40 bg-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={img}
                alt={`Social ${idx + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionalSection;
