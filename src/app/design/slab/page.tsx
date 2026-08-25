"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Calculator } from "lucide-react";

export default function SlabDesign() {
  return (
    <div className="min-h-screen bg-white selection:bg-blue-100">
      <Navbar />
      <main className="flex-1 flex flex-col items-center w-full pt-12 pb-24 bg-white">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto px-8 w-full mb-10">
          <Link
            href="/design"
            className="inline-flex items-center text-sm font-semibold text-[#1d64d8] hover:text-blue-800 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Modules
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
            Slab Design Workspace
          </h1>
          <p className="text-slate-600">
            Configure IS 456 parameters, loads, and dimensions to generate the
            slab design and detailing report.
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-8 w-full">
          <form className="bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm space-y-10">
            {/* Section 1: Material Properties */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-5 border-b border-slate-200 pb-2">
                1. Material Properties
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Concrete Grade
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1d64d8] bg-white">
                    <option value="M20">M20</option>
                    <option value="M25">M25</option>
                    <option value="M30">M30</option>
                    <option value="M35">M35</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Grade of Steel
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1d64d8] bg-white">
                    <option value="Fe415">Fe415</option>
                    <option value="Fe500">Fe500</option>
                    <option value="Fe550">Fe550</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Geometry & Boundary Conditions */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-5 border-b border-slate-200 pb-2">
                2. Span & Continuity
              </h2>

              {/* Updated to a 3-column grid for the dimensions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    c/c Dist (X-dir) in m
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1d64d8] bg-white"
                    placeholder="e.g., 4.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    c/c Dist (Y-dir) in m
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1d64d8] bg-white"
                    placeholder="e.g., 6.0"
                  />
                </div>
                {/* Added Beam Support Width here */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Support Beam Width (b) in mm
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1d64d8] bg-white"
                    placeholder="e.g., 230"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Continuity / Adjacent Spans (IS 456)
                </label>
                <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1d64d8] bg-white">
                  <option value="interior">Interior Panel</option>
                  <option value="one_short_continuous">
                    One Short Edge Continuous
                  </option>
                  <option value="one_long_continuous">
                    One Long Edge Continuous
                  </option>
                  <option value="two_adjacent_discontinuous">
                    Two Adjacent Edges Discontinuous
                  </option>
                  <option value="two_short_continuous">
                    Two Short Edges Continuous
                  </option>
                  <option value="two_long_continuous">
                    Two Long Edges Continuous
                  </option>
                  <option value="three_edges_continuous_one_long_discontinuous">
                    Three Edges Continuous (One Long Edge Discontinuous)
                  </option>
                  <option value="three_edges_continuous_one_short_discontinuous">
                    Three Edges Continuous (One Short Edge Discontinuous)
                  </option>
                  <option value="four_edges_discontinuous">
                    Four Edges Discontinuous
                  </option>
                </select>
              </div>
            </div>

            {/* Section 3: Loading Parameters */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-5 border-b border-slate-200 pb-2">
                3. Loading (kN/m²)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Floor Finish & Ceiling Plaster
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1d64d8] bg-white"
                    placeholder="e.g., 1.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Live Load Intensity
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1d64d8] bg-white"
                    placeholder="e.g., 3.0"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Durability & Detailing */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-5 border-b border-slate-200 pb-2">
                4. Durability & Detailing
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Environmental Exposure (Nominal Cover)
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1d64d8] bg-white">
                    <option value="20">Mild (20 mm)</option>
                    <option value="30">Moderate (30 mm)</option>
                    <option value="45">Severe (45 mm)</option>
                    <option value="50">Very Severe (50 mm)</option>
                    <option value="75">Extreme (75 mm)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Assumed Bar Diameter (ϕ)
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1d64d8] bg-white">
                    <option value="8">8 mm</option>
                    <option value="10">10 mm</option>
                    <option value="12">12 mm</option>
                    <option value="16">16 mm</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <button
                type="button"
                className="w-full bg-[#1d64d8] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-sm flex justify-center items-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Run Slab Analysis
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
