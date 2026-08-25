import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-14 py-2 bg-white">
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold text-[#2d3748] leading-[1.15]">
          Structural Design <br /> & Analysis
        </h1>
        <p className="text-xl text-slate-600 max-w-md pb-4">
          Web service for structural analysis and design
        </p>
        <Link
          href="/design"
          className="inline-block bg-[#1d64d8] text-white px-8 py-3.5 rounded-md font-medium text-lg hover:bg-blue-700 transition-colors"
        >
          Get Started
        </Link>
      </div>

      <div className="md:w-1/2 mt-12 md:mt-0 flex justify-end">
        <Image
          src="/building.png"
          alt="Structural Building Frame Wireframe"
          width={600}
          height={500}
          className="object-contain mix-blend-multiply"
          priority
        />
      </div>
    </section>
  );
}
