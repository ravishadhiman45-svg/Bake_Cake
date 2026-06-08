import React from "react";
import { Truck, Clock, Gift, Heart } from "lucide-react";

const OurPromiseSection = () => {
  const promises = [
    {
      id: 1,
      icon: Truck,
      title: "DELIVERY ON TIME",
      description: "On-time delivery with tracking"
    },
    {
      id: 2,
      icon: Clock,
      title: "SAME DAY DELIVERY",
      description: "Order anytime, get it same day"
    },
    {
      id: 3,
      icon: Gift,
      title: "2-CHM DELIVERY",
      description: "Fastest delivery in the city"
    },
    {
      id: 4,
      icon: Heart,
      title: "MADE WITH LOVE",
      description: "Handcrafted with premium ingredients"
    },
  ];

  return (
    <section className="w-full bg-pink-100 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* TITLE */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#ff3333] mb-2">Our Promise</h2>
          <p className="text-gray-600 text-sm md:text-base">There's no secret spell—only honest, hard work!</p>
        </div>

        {/* PROMISES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {promises.map((promise) => {
            const IconComponent = promise.icon;
            return (
              <div key={promise.id} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-pink-300 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <IconComponent size={40} className="text-[#ff3333]" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{promise.title}</h3>
                <p className="text-gray-600 text-sm md:text-base">{promise.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurPromiseSection;
