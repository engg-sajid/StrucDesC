import { Layers, MoveHorizontal, Columns, ArrowDownToLine } from "lucide-react";
import Link from "next/link";

export default function Design() {
  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 flex flex-col">
      <main className="flex-1 flex flex-col items-center w-full pt-12 pb-24">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto px-8 w-full mb-12 text-center">
          <p className="text-sm font-bold text-[#1d64d8] tracking-widest uppercase mb-3">
            Workspace
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Design Modules
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Select a structural component below to launch the analysis and
            design parameters workspace.
          </p>
        </div>

        <div className="max-w-screen-xl mx-auto px-8 w-full">
          {/* Concrete Section */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Concrete Design
              </h2>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            {/* Option Buttons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Slab Design Button */}
              <Link
                href="/design/slab"
                className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-[#1d64d8] hover:shadow-lg transition-all flex flex-col items-center text-center cursor-pointer"
              >
                <div className="bg-slate-50 p-4 rounded-full group-hover:bg-blue-50 transition-colors mb-5">
                  <Layers className="w-8 h-8 text-slate-700 group-hover:text-[#1d64d8] transition-colors" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">
                  Slab Design
                </h3>
                <p className="text-sm text-slate-500">
                  One-way and two-way spanning systems
                </p>
              </Link>

              {/* Beam Design Button */}
              <Link
                href="#"
                className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-[#1d64d8] hover:shadow-lg transition-all flex flex-col items-center text-center cursor-pointer"
              >
                <div className="bg-slate-50 p-4 rounded-full group-hover:bg-blue-50 transition-colors mb-5">
                  <MoveHorizontal className="w-8 h-8 text-slate-700 group-hover:text-[#1d64d8] transition-colors" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">
                  Beam Design
                </h3>
                <p className="text-sm text-slate-500">
                  Singly and doubly reinforced sections
                </p>
                <p className="text-xs text-slate-400 mt-2 font-medium italic">
                  Coming soon...
                </p>
              </Link>

              {/* Column Design Button */}
              <Link
                href="#"
                className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-[#1d64d8] hover:shadow-lg transition-all flex flex-col items-center text-center cursor-pointer"
              >
                <div className="bg-slate-50 p-4 rounded-full group-hover:bg-blue-50 transition-colors mb-5">
                  <Columns className="w-8 h-8 text-slate-700 group-hover:text-[#1d64d8] transition-colors" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">
                  Column Design
                </h3>
                <p className="text-sm text-slate-500">
                  Axial loads and biaxial bending
                </p>
                <p className="text-xs text-slate-400 mt-2 font-medium italic">
                  Coming soon...
                </p>
              </Link>

              {/* Footing Design Button */}
              <Link
                href="#"
                className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-[#1d64d8] hover:shadow-lg transition-all flex flex-col items-center text-center cursor-pointer"
              >
                <div className="bg-slate-50 p-4 rounded-full group-hover:bg-blue-50 transition-colors mb-5">
                  <ArrowDownToLine className="w-8 h-8 text-slate-700 group-hover:text-[#1d64d8] transition-colors" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">
                  Footing Design
                </h3>
                <p className="text-sm text-slate-500">
                  Isolated and combined foundations
                </p>
                <p className="text-xs text-slate-400 mt-2 font-medium italic">
                  Coming soon...
                </p>
              </Link>
            </div>
          </div>

          {/* Future Section Placeholder (e.g., Steel Design) */}
          <div className="opacity-50">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Steel Design
              </h2>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>
            <p className="text-slate-500 italic">
              Modules for steel structures coming soon...
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
