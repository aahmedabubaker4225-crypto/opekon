import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import DashboardPreview from "../components/sections/DashboardPreview";
import FooterCTA from "../components/sections/FooterCTA";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="overflow-hidden bg-black text-white">
        <Hero />
        <DashboardPreview />
        <FooterCTA />
      </main>

      <Footer />
    </>
  );
}