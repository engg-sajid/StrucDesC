import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import WhoWeAre from "@/components/WhoWeAre";

export default function Home() {
  return (
    <div className="min-h-screen bg-white selection:bg-blue-100">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <WhoWeAre />
      </main>
      <Footer />
    </div>
  );
}
