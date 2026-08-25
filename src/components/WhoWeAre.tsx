import Image from "next/image";
import Link from "next/link";

export default function WhoWeAre() {
  return (
    <section className="w-full bg-[#f8fafc] py-20 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Column: Text Content */}
        <div className="md:w-1/2 space-y-4">
          <div className="relative inline-block">
            {/* Scaled down the accent line */}
            <div className="absolute -top-2 left-0 w-8 h-[2px] bg-[#1d64d8]"></div>
            <p className="text-sm font-semibold text-[#1d64d8] tracking-wider uppercase">
              Who We Are
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-snug">
            Building Ideas.
            <br /> Creating Reality.
          </h2>

          <p className="text-sm md:text-base text-slate-600 max-w-md pb-2">
            StrucDesC is a modern web platform designed to accelerate structural
            analysis and component design. By combining advanced computational
            technology with a user-friendly interface, we deliver quick, precise
            tools that help you design efficient and sustainable structures.
          </p>

          <Link
            href="/about"
            className="inline-block bg-[#0f172a] text-white px-7 py-2.5 rounded-md font-medium text-sm hover:bg-slate-800 transition-colors"
          >
            Learn More
          </Link>
        </div>

        {/* Right Column: Building Sketch Image */}
        <div className="md:w-1/2 flex justify-end relative">
          {/* Main Building Sketch Image */}
          {/* Ensure you have the 'building-sketch.png' in your 'public' folder */}
          <div className="relative">
            <Image
              src="/building-s.png"
              alt="Detailed architectural building frame wireframe sketch"
              width={650}
              height={550}
              priority
              className="object-contain mix-blend-multiply [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_80%)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
