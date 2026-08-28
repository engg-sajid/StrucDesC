import Link from "next/link";
import { Target, Lightbulb, Code2 } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white selection:bg-blue-100">
      <main className="flex-1 flex flex-col items-center w-full pt-12 pb-20">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto px-8 w-full mb-16 text-center">
          <p className="text-sm font-bold text-[#1d64d8] tracking-widest uppercase mb-3">
            About The Founder
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Bridging Infrastructure & Technology
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            StrucDesC was founded to modernize the way we approach structural
            analysis by bringing highly scalable software development directly
            into the civil engineering workspace.
          </p>
        </div>

        {/* Bio Section */}
        <div className="max-w-screen-2xl mx-auto px-8 w-full flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">
              Hi, I'm Md Sajid Ali.
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              I am a Civil Engineering student at Jadavpur University,
              passionate about developing high-performance tech solutions for
              the built environment. My background gives me a deep understanding
              of structural mechanics, geoinformatics, and the complex hydraulic
              and geothermal frameworks that power our modern infrastructure.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              However, my core focus lies in the intersection of this domain
              expertise and software engineering. I specialize in full-stack web
              development and computational problem-solving. By leveraging
              robust data structures, efficient algorithms, and modern tech
              stacks like Next.js and Python, I aim to build secure, cloud-based
              tools that optimize the design and analysis process.
            </p>
          </div>

          {/* Core Pillars Grid */}
          <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <Code2 className="w-8 h-8 text-[#1d64d8] mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Modern Stack</h3>
              <p className="text-slate-600 text-sm">
                Building reliable, responsive interfaces using Next.js, React,
                and Python-driven backend engines.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <Lightbulb className="w-8 h-8 text-[#1d64d8] mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">
                Domain Knowledge
              </h3>
              <p className="text-slate-600 text-sm">
                Applied research in concrete mechanics, dam frameworks, and
                thermal power plant analysis.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 sm:col-span-2">
              <Target className="w-8 h-8 text-[#1d64d8] mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">The Mission</h3>
              <p className="text-slate-600 text-sm">
                To provide engineers and students with an accessible, high-speed
                platform for reliable structural analysis—eliminating the
                friction between complex design tools and real-world execution.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto px-8 w-full mt-24 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Want to collaborate or learn more?
          </h2>
          <Link
            href="/contact"
            className="inline-block bg-[#1d64d8] text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Contact Me
          </Link>
        </div>
      </main>
    </div>
  );
}
