import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SpecsSection from "./components/SpecsSection";
import FeaturesSection from "./components/FeaturesSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <main style={{ background: "#0a0a0a", overflowX: "hidden" }}>
      <Navbar />
      <HeroSection />
      <SpecsSection />
      <FeaturesSection />
      <Footer />
    </main>
  );
}
