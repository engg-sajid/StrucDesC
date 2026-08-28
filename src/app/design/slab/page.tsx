"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Calculator, RotateCcw, Save } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import { saveCalculationHistory } from "@/actions/history";
import { executeSlabAnalysis } from "@/lib/engine/slabEngine";

export default function SlabDesign() {
  const [fck, setFck] = useState(25);
  const [fy, setFy] = useState(500);
  const [lxInput, setLxInput] = useState<string | number>("");
  const [lyInput, setLyInput] = useState<string | number>("");
  const [beamWidth, setBeamWidth] = useState<string | number>("");
  const [supportCond, setSupportCond] = useState("interior");
  const [ffLoad, setFfLoad] = useState<string | number>("");
  const [llLoad, setLlLoad] = useState<string | number>("");
  const [cover, setCover] = useState(20);
  const [barDia, setBarDia] = useState(8);

  const [results, setResults] = useState<any>(null);
  const [editableDepth, setEditableDepth] = useState<string | number>("");
  const [editableSx, setEditableSx] = useState<string | number>("");

  const [title, setTitle] = useState("");
  const [saveStatus, setSaveStatus] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    resetForm();
  }, []);

  const runAnalysis = (
    e?: React.FormEvent,
    customDepth?: number,
    customSx?: number,
  ) => {
    if (e) e.preventDefault();
    try {
      const res = executeSlabAnalysis({
        fck,
        fy,
        lxInput,
        lyInput,
        beamWidth,
        supportCond,
        ffLoad,
        llLoad,
        cover,
        barDia,
        customDepth,
        customSx,
      });
      setResults(res);
      setEditableDepth(res.assumedD);
      setEditableSx(res.sxProv !== "-" ? res.sxProv : "");
      setSaveStatus("");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleSave = async () => {
    if (!results) return;
    setSaveStatus("Saving...");

    const inputs = {
      fck,
      fy,
      lxInput,
      lyInput,
      beamWidth,
      supportCond,
      ffLoad,
      llLoad,
      cover,
      barDia,
    };
    const res = await saveCalculationHistory(
      "Slab",
      title || "Untitled Slab",
      inputs,
      results,
    );

    if (res?.error === "Unauthorized") {
      setSaveStatus("");
      setIsAuthModalOpen(true);
    } else if (res?.success) {
      setSaveStatus("Calculation saved successfully!");
      setTimeout(() => setSaveStatus(""), 4000);
    } else {
      setSaveStatus("An error occurred while saving.");
    }
  };

  const resetForm = () => {
    setFck(25);
    setFy(500);
    setLxInput("");
    setLyInput("");
    setBeamWidth("");
    setSupportCond("interior");
    setFfLoad("");
    setLlLoad("");
    setCover(20);
    setBarDia(8);
    setResults(null);
    setEditableDepth("");
    setEditableSx("");
    setTitle("");
    setSaveStatus("");
  };

  const formatPt = (pt: number) => {
    if (pt === 0) return "0.000 %";
    if (pt < 0.12) {
      return (
        <span className="flex items-center whitespace-nowrap">
          {pt.toFixed(3)} %
          <span className="text-red-500 ml-2 text-xs font-medium">
            (minimum 0.12% as per IS 456:2000)
          </span>
        </span>
      );
    }
    return `${pt.toFixed(3)} %`;
  };

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 flex flex-col">
      <main className="flex-1 flex flex-col items-center w-full pt-12 pb-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-8 w-full mb-10 flex justify-between items-start">
          <div>
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
          <button
            onClick={resetForm}
            className="hidden md:flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mt-8"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Defaults
          </button>
        </div>

        <div className="max-w-4xl mx-auto px-8 w-full">
          <form
            onSubmit={runAnalysis}
            autoComplete="off"
            className="bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm space-y-10"
          >
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-5 border-b border-slate-200 pb-2">
                1. Material Properties
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Concrete Grade
                  </label>
                  <select
                    value={fck}
                    onChange={(e) => setFck(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="20">M20</option>
                    <option value="25">M25</option>
                    <option value="30">M30</option>
                    <option value="35">M35</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Grade of Steel
                  </label>
                  <select
                    value={fy}
                    onChange={(e) => setFy(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="415">Fe415</option>
                    <option value="500">Fe500</option>
                    <option value="550">Fe550</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-5 border-b border-slate-200 pb-2">
                2. Span & Continuity
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Clear Span (Cx) in m
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={lxInput}
                    onChange={(e) => setLxInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white"
                    placeholder="e.g., 4.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Clear Span (Cy) in m
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={lyInput}
                    onChange={(e) => setLyInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white"
                    placeholder="e.g., 6.0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Support Beam Width (b) in mm
                  </label>
                  <input
                    type="number"
                    value={beamWidth}
                    onChange={(e) => setBeamWidth(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white"
                    placeholder="e.g., 230"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Continuity / Adjacent Spans (IS 456)
                </label>
                <select
                  value={supportCond}
                  onChange={(e) => setSupportCond(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white"
                >
                  <option value="interior">Case 1: Interior Panel</option>
                  <option value="one_short_discontinuous">
                    Case 2: One Short Edge Discontinuous
                  </option>
                  <option value="one_long_discontinuous">
                    Case 3: One Long Edge Discontinuous
                  </option>
                  <option value="two_adjacent_discontinuous">
                    Case 4: Two Adjacent Edges Discontinuous
                  </option>
                  <option value="two_short_discontinuous">
                    Case 5: Two Short Edges Discontinuous
                  </option>
                  <option value="two_long_discontinuous">
                    Case 6: Two Long Edges Discontinuous
                  </option>
                  <option value="three_discontinuous_one_long_continuous">
                    Case 7: Three Edges Discontinuous (One Long Edge Continuous)
                  </option>
                  <option value="three_discontinuous_one_short_continuous">
                    Case 8: Three Edges Discontinuous (One Short Edge
                    Continuous)
                  </option>
                  <option value="four_edges_discontinuous">
                    Case 9: Four Edges Discontinuous
                  </option>
                </select>
              </div>
            </div>

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
                    value={ffLoad}
                    onChange={(e) => setFfLoad(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white"
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
                    value={llLoad}
                    onChange={(e) => setLlLoad(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white"
                    placeholder="e.g., 3.0"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-5 border-b border-slate-200 pb-2">
                4. Durability & Detailing
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Environmental Exposure (Nominal Cover)
                  </label>
                  <select
                    value={cover}
                    onChange={(e) => setCover(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white"
                  >
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
                  <select
                    value={barDia}
                    onChange={(e) => setBarDia(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="8">8 mm</option>
                    <option value="10">10 mm</option>
                    <option value="12">12 mm</option>
                    <option value="16">16 mm</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#1d64d8] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-sm flex justify-center items-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Run Auto-Optimized Slab Analysis
              </button>
            </div>
          </form>

          {results && (
            <div className="mt-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Slab Calculation Output Table
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#1d64d8] text-white">
                      <th className="px-6 py-4 font-bold w-1/2">
                        Design Parameter / Step
                      </th>
                      <th className="px-6 py-4 font-bold border-l border-blue-600">
                        Slab Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
                    <tr>
                      <td className="px-6 py-3 font-medium">
                        Shorter span Length (Lx)
                      </td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.effLx} mm
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">
                        Longer span Length (Ly)
                      </td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.effLy} mm
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">(Ly/Lx) ratio</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.ratio}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">
                        Panel type (One way/2 way)
                      </td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.panelType}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">Support Condns</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.supportCond}
                      </td>
                    </tr>

                    <tr className="bg-blue-50/50">
                      <td className="px-6 py-3 font-bold text-slate-900">
                        Overall thickness assumed
                      </td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          <div className="flex items-center">
                            <input
                              type="number"
                              step="5"
                              value={editableDepth}
                              onChange={(e) => setEditableDepth(e.target.value)}
                              className="w-24 px-3 py-1.5 rounded border border-slate-300 bg-white font-bold text-[#1d64d8]"
                            />
                            <span className="text-slate-600 font-medium ml-2">
                              mm
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              runAnalysis(
                                undefined,
                                Number(editableDepth),
                                Number(editableSx),
                              )
                            }
                            className="bg-slate-800 text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-slate-700 transition-colors"
                          >
                            Recalculate using manual thickness
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">dx, dy, davg</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.dx}, {results.dy}, {results.davg} mm
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">
                        Intensity of DL(W)
                      </td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.DL} kN/m²
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">
                        Intensity of (LL)
                      </td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.LL} kN/m²
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">Total load (WT)</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.totalW} kN/m²
                      </td>
                    </tr>

                    <tr className="bg-slate-50">
                      <td
                        colSpan={2}
                        className="px-6 py-2 font-semibold text-slate-900 border-y border-slate-200"
                      >
                        B.M. Coefficients
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">
                        At mid span of shorter dire. ax
                      </td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.alphaX}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">Support ax1</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.alphaX1}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">
                        midspan longer Ly ay
                      </td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.alphaY}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">Support ay1</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.alphaY1}
                      </td>
                    </tr>

                    <tr className="bg-slate-50">
                      <td
                        colSpan={2}
                        className="px-6 py-2 font-semibold text-slate-900 border-y border-slate-200"
                      >
                        Factored B.M.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">
                        At midspan along shorter direct Mtx
                      </td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.Mtx} kN-m/m
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">support Mtx1</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.Mtx1} kN-m/m
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">midspan Mty</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.Mty} kN-m/m
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">support Mty1</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.Mty1} kN-m/m
                      </td>
                    </tr>

                    <tr className="bg-slate-50">
                      <td
                        colSpan={2}
                        className="px-6 py-2 font-semibold text-slate-900 border-y border-slate-200"
                      >
                        Adequacy & Section Design
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">
                        d reqd from Mt (as this is max)
                      </td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.dReq} mm
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">
                        comment on adequacy
                      </td>
                      <td
                        className={`px-6 py-3 border-l border-slate-100 font-bold ${results.adequacyComment.includes("Safe") ? "text-green-600" : "text-red-600"}`}
                      >
                        {results.adequacyComment}
                      </td>
                    </tr>

                    <tr className="bg-slate-50">
                      <td
                        colSpan={2}
                        className="px-6 py-2 font-semibold text-slate-900 border-y border-slate-200"
                      >
                        Percentage of Steel Required
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">Ptx (reqd)</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {formatPt(results.PtxVal)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">Ptx1 (reqd)</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {formatPt(results.Ptx1Val)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">Pty (reqd)</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {formatPt(results.PtyVal)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">Pty1 (reqd)</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {formatPt(results.Pty1Val)}
                      </td>
                    </tr>

                    <tr className="bg-slate-50">
                      <td
                        colSpan={2}
                        className="px-6 py-2 font-semibold text-slate-900 border-y border-slate-200"
                      >
                        Spacing Provided (with 8mm dia bar)
                      </td>
                    </tr>
                    <tr className="bg-blue-50/50">
                      <td className="px-6 py-3 font-bold text-slate-900">
                        Sx (Prov)
                      </td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          <div className="flex items-center">
                            <input
                              type="number"
                              step="5"
                              value={editableSx}
                              onChange={(e) => setEditableSx(e.target.value)}
                              className="w-24 px-3 py-1.5 rounded border border-slate-300 bg-white font-bold text-[#1d64d8]"
                            />
                            <span className="text-slate-600 font-medium ml-2">
                              mm
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              runAnalysis(
                                undefined,
                                Number(editableDepth),
                                Number(editableSx),
                              )
                            }
                            className="bg-slate-800 text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-slate-700"
                          >
                            Recalculate with manual Sx
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">Sx1 (Prov)</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.sx1Prov}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">Sy (Prov)</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.syProv}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">Sy1 (Prov)</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.sy1Prov}
                      </td>
                    </tr>

                    {/* RESTORED DEFLECTION CHECK SECTION */}
                    <tr className="bg-slate-50">
                      <td
                        colSpan={2}
                        className="px-6 py-2 font-semibold text-slate-900 border-y border-slate-200"
                      >
                        Check for Deflection
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">dx/davg (Prov)</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.dxDavg}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">Lx/d (basic)</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.basicLd}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">
                        Ast_x(reqd) / Ast_x(prov)
                      </td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.astRatio}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">fs =</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.fs}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">
                        modification factor from fig. 4
                      </td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.modFactor}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">(Lx/d) allowed</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.allowedLd}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">(Lx/d) provided</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.actualLd}
                      </td>
                    </tr>

                    <tr className="bg-slate-50">
                      <td
                        colSpan={2}
                        className="px-6 py-2 font-semibold text-slate-900 border-y border-slate-200"
                      >
                        Remark & Deflection Check
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-bold text-slate-900">
                        Overall remarks
                      </td>
                      <td
                        className={`px-6 py-3 border-l border-slate-100 font-bold ${results.deflectionCheck.includes("Safe") ? "text-green-600" : "text-red-600"}`}
                      >
                        {results.deflectionCheck}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <input
                  type="text"
                  placeholder="Project Name (e.g., Ground Floor Master Bedroom)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border border-slate-200 bg-white w-full"
                />
                <button
                  onClick={handleSave}
                  className="bg-slate-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-sm flex justify-center items-center gap-2 w-full md:w-auto whitespace-nowrap"
                >
                  <Save className="w-5 h-5" />
                  Save Design
                </button>
              </div>
              {saveStatus && (
                <p
                  className={`mt-3 text-sm font-semibold text-center ${saveStatus.includes("success") ? "text-green-600" : saveStatus.includes("Saving") ? "text-slate-600" : "text-red-600"}`}
                >
                  {saveStatus}
                </p>
              )}
            </div>
          )}
        </div>
      </main>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setIsAuthModalOpen(false);
          handleSave();
        }}
      />
    </div>
  );
}
