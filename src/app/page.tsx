import Hero from "@/components/Hero";
import Features from "@/components/Features";
import WhoWeAre from "@/components/WhoWeAre";

export default function Home() {
  return (
    <div className="min-h-screen bg-white selection:bg-blue-100">
      <main>
        <Hero />
        <Features />
        <WhoWeAre />
      </main>
    </div>
  );
}
