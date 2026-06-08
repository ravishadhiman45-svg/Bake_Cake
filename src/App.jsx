import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import MenuSection from "./components/MenuSection";
import PromotionalSection from "./components/PromotionalSection";
import OurPromiseSection from "./components/OurPromiseSection";
import NewsletterSection from "./components/NewsletterSection";

export default function App() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <HeroSection />
      <MenuSection />
      <PromotionalSection />
      <OurPromiseSection />
      <NewsletterSection />
    </main>
  );
}
