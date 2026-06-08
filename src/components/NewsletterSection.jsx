import React, { useState } from "react";
import { Mail, Phone } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribed with email:", email);
    setEmail("");
  };

  const socialLinks = [
    { icon: "f", name: "Facebook", url: "#facebook" },
    { icon: "𝕏", name: "Twitter", url: "#twitter" },
    { icon: "📷", name: "Instagram", url: "#instagram" },
    { icon: "in", name: "LinkedIn", url: "#linkedin" },
  ];

  return (
    <section className="w-full bg-linear-to-b from-pink-100 to-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* RECENTLY VIEWED */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            Recently Viewed
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer">
              <div className="h-48 bg-gray-300 overflow-hidden">
                <img
                  src="https://picsum.photos/200/200?random=70"
                  alt="Recent Cake"
                  className="w-full h-full object-cover hover:scale-110 transition"
                />
              </div>
              <div className="p-4">
                <p className="font-semibold text-gray-800 text-sm">
                  Semi-iced Birthday...
                </p>
                <p className="text-gray-600 text-xs">2.5 KG | Rs. 1,299</p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-xs text-gray-600 ml-1">4.7 (245)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-[#ff3333] mb-2 italic">
              BakeCake
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              Subscribe to our newsletter for special offers and updates!
            </p>
          </div>

          {/* NEWSLETTER FORM */}
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#ff3333]"
                required
              />
              <button
                type="submit"
                className="bg-[#ff3333] hover:bg-[#ff5555] text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Subscribe
              </button>
            </div>
          </form>

          {/* SOCIAL LINKS */}
          <div className="flex justify-center gap-6 mb-12">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="text-[#ff3333] hover:scale-110 transition text-2xl md:text-3xl font-bold"
                title={social.name}
              >
                {social.name === "Instagram"
                  ? "📷"
                  : social.name === "Twitter"
                    ? "𝕏"
                    : social.name === "Facebook"
                      ? "f"
                      : "in"}
              </a>
            ))}
          </div>

          {/* FOOTER CONTENT */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t pt-8">
            {/* ABOUT */}
            <div>
              <h4 className="font-bold text-gray-800 mb-4">ABOUT US</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#about" className="hover:text-[#ff3333]">
                    About BakeCake
                  </a>
                </li>
                <li>
                  <a href="#careers" className="hover:text-[#ff3333]">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#blog" className="hover:text-[#ff3333]">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#press" className="hover:text-[#ff3333]">
                    Press
                  </a>
                </li>
              </ul>
            </div>

            {/* CUSTOMER CARE */}
            <div>
              <h4 className="font-bold text-gray-800 mb-4">CUSTOMER CARE</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#faq" className="hover:text-[#ff3333]">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#ff3333]">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#shipping" className="hover:text-[#ff3333]">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#returns" className="hover:text-[#ff3333]">
                    Returns
                  </a>
                </li>
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <h4 className="font-bold text-gray-800 mb-4">CONTACT US</h4>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail size={18} className="text-[#ff3333]" />
                  <span>support@bakecake.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={18} className="text-[#ff3333]" />
                  <span>1-800-BAKECAKE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="text-center text-gray-600 text-sm border-t pt-8">
          <p>
            © 2026 BakeCake. All rights reserved. |{" "}
            <a href="#privacy" className="hover:text-[#ff3333]">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="#terms" className="hover:text-[#ff3333]">
              Terms & Conditions
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
