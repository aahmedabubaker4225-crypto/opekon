import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/marketing/Hero";
import DashboardPreview from "../components/marketing/DashboardPreview";
import FooterCTA from "../components/marketing/FooterCTA";

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