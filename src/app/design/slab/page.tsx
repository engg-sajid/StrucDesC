"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Calculator, RotateCcw } from "lucide-react";

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

  // Interactive Output States
  const [editableDepth, setEditableDepth] = useState<string | number>("");
  const [editableSx, setEditableSx] = useState<string | number>("");

  useEffect(() => {
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
  }, []);

  const tableRatios = [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.75, 2.0];

  const table26Data: Record<string, number[][]> = {
    interior: [
      [0.032, 0.045, 0.024, 0.034],
      [0.036, 0.05, 0.022, 0.031],
      [0.039, 0.055, 0.02, 0.028],
      [0.043, 0.059, 0.018, 0.025],
      [0.046, 0.063, 0.016, 0.023],
      [0.05, 0.067, 0.015, 0.021],
      [0.056, 0.075, 0.012, 0.017],
      [0.06, 0.081, 0.01, 0.014],
    ],
    one_short_discontinuous: [
      [0.04, 0.054, 0.03, 0.041],
      [0.045, 0.06, 0.027, 0.037],
      [0.049, 0.065, 0.025, 0.034],
      [0.053, 0.07, 0.023, 0.031],
      [0.057, 0.075, 0.021, 0.028],
      [0.06, 0.079, 0.019, 0.026],
      [0.068, 0.089, 0.015, 0.021],
      [0.074, 0.095, 0.012, 0.017],
    ],
    one_long_discontinuous: [
      [0.04, 0.054, 0.03, 0.041],
      [0.044, 0.058, 0.028, 0.038],
      [0.048, 0.063, 0.026, 0.035],
      [0.051, 0.067, 0.024, 0.032],
      [0.054, 0.071, 0.022, 0.03],
      [0.057, 0.074, 0.02, 0.028],
      [0.064, 0.083, 0.016, 0.022],
      [0.069, 0.089, 0.013, 0.018],
    ],
    two_adjacent_discontinuous: [
      [0.045, 0.06, 0.035, 0.047],
      [0.051, 0.067, 0.032, 0.043],
      [0.056, 0.073, 0.029, 0.039],
      [0.061, 0.079, 0.026, 0.035],
      [0.065, 0.084, 0.024, 0.032],
      [0.069, 0.088, 0.022, 0.029],
      [0.078, 0.098, 0.017, 0.023],
      [0.084, 0.105, 0.014, 0.019],
    ],
    two_short_discontinuous: [
      [0.045, 0.06, 0.035, 0.047],
      [0.05, 0.066, 0.031, 0.042],
      [0.055, 0.072, 0.028, 0.038],
      [0.059, 0.077, 0.025, 0.034],
      [0.063, 0.082, 0.023, 0.031],
      [0.067, 0.086, 0.021, 0.028],
      [0.075, 0.095, 0.016, 0.022],
      [0.081, 0.102, 0.013, 0.018],
    ],
    two_long_discontinuous: [
      [0.045, 0.06, 0.035, 0.047],
      [0.049, 0.065, 0.03, 0.041],
      [0.053, 0.07, 0.027, 0.036],
      [0.057, 0.074, 0.024, 0.032],
      [0.06, 0.078, 0.021, 0.029],
      [0.063, 0.082, 0.019, 0.026],
      [0.071, 0.09, 0.014, 0.02],
      [0.076, 0.097, 0.011, 0.015],
    ],
    three_discontinuous_one_long_continuous: [
      [0.051, 0.068, 0.04, 0.054],
      [0.057, 0.075, 0.036, 0.049],
      [0.063, 0.081, 0.033, 0.044],
      [0.068, 0.087, 0.03, 0.04],
      [0.072, 0.092, 0.027, 0.037],
      [0.076, 0.097, 0.025, 0.034],
      [0.085, 0.107, 0.019, 0.026],
      [0.092, 0.115, 0.015, 0.021],
    ],
    three_discontinuous_one_short_continuous: [
      [0.051, 0.068, 0.04, 0.054],
      [0.056, 0.073, 0.033, 0.045],
      [0.06, 0.078, 0.029, 0.039],
      [0.064, 0.083, 0.026, 0.035],
      [0.068, 0.088, 0.023, 0.031],
      [0.071, 0.091, 0.021, 0.028],
      [0.079, 0.101, 0.015, 0.021],
      [0.085, 0.108, 0.012, 0.016],
    ],
    four_edges_discontinuous: [
      [0.062, 0.083, 0.048, 0.064],
      [0.069, 0.091, 0.043, 0.058],
      [0.075, 0.099, 0.039, 0.052],
      [0.081, 0.106, 0.035, 0.047],
      [0.086, 0.112, 0.032, 0.043],
      [0.09, 0.118, 0.029, 0.039],
      [0.1, 0.13, 0.023, 0.031],
      [0.107, 0.138, 0.019, 0.026],
    ],
  };

  const getDynamicCoefficients = (targetRatio: number, condition: string) => {
    const dataset = table26Data[condition] || table26Data["interior"];
    const r = Math.max(1.0, Math.min(2.0, targetRatio));

    let lowerIdx = 0;
    for (let i = 0; i < tableRatios.length - 1; i++) {
      if (r >= tableRatios[i] && r <= tableRatios[i + 1]) {
        lowerIdx = i;
        break;
      }
    }

    const upperIdx = Math.min(lowerIdx + 1, tableRatios.length - 1);
    const r1 = tableRatios[lowerIdx];
    const r2 = tableRatios[upperIdx];

    if (r1 === r2) {
      return {
        alphaX: dataset[lowerIdx][0],
        alphaX1: dataset[lowerIdx][1],
        alphaY: dataset[lowerIdx][2],
        alphaY1: dataset[lowerIdx][3],
      };
    }

    const factor = (r - r1) / (r2 - r1);
    const interpolate = (col: number) =>
      dataset[lowerIdx][col] +
      (dataset[upperIdx][col] - dataset[lowerIdx][col]) * factor;

    return {
      alphaX: Number(interpolate(0).toFixed(4)),
      alphaX1: Number(interpolate(1).toFixed(4)),
      alphaY: Number(interpolate(2).toFixed(4)),
      alphaY1: Number(interpolate(3).toFixed(4)),
    };
  };

  const runAnalysis = (
    e?: React.FormEvent,
    customDepth?: number,
    customSx?: number,
  ) => {
    if (e) e.preventDefault();

    const lxNum = Number(lxInput) || 0;
    const lyNum = Number(lyInput) || 0;
    const beamWNum = Number(beamWidth) || 0;
    const ffNum = Number(ffLoad) || 0;
    const llNum = Number(llLoad) || 0;

    if (!lxNum || !lyNum || !beamWNum || !ffNum || !llNum) {
      alert("Please enter the required inputs for analysis.");
      return;
    }

    if (customDepth && customDepth <= cover + barDia) {
      alert(
        `Manual thickness must be strictly greater than cover + bar diameter (${cover + barDia} mm).`,
      );
      return;
    }

    const clearLx = lxNum * 1000;
    const clearLy = lyNum * 1000;

    let assumedD = customDepth || 100;
    let finalResults: any = {};
    const maxIterations = customDepth ? 1 : 100;

    for (let i = 0; i < maxIterations; i++) {
      const dx = assumedD - cover - barDia / 2;
      const dy = assumedD - cover - barDia - barDia / 2;
      const davg = (dx + dy) / 2;

      const effLx = Math.min(clearLx + davg, clearLx + beamWNum);
      const effLy = Math.min(clearLy + davg, clearLy + beamWNum);

      const ratio = effLy / effLx;
      const isTwoWay = ratio <= 2.0;

      const coeffs = getDynamicCoefficients(ratio, supportCond);

      const selfWeight = (assumedD / 1000) * 25;
      const totalDL = selfWeight + ffNum;
      const totalW = totalDL + llNum;
      const factoredW = totalW * 1.5;

      const Mtx = coeffs.alphaX * factoredW * Math.pow(effLx / 1000, 2);
      const Mtx1 = coeffs.alphaX1 * factoredW * Math.pow(effLx / 1000, 2);
      const Mty = coeffs.alphaY * factoredW * Math.pow(effLx / 1000, 2);
      const Mty1 = coeffs.alphaY1 * factoredW * Math.pow(effLx / 1000, 2);
      const maxM = Math.max(Mtx, Mtx1, Mty, Mty1);

      const Rmax = 0.138 * fck;
      const dReq = Math.sqrt((maxM * 1000000) / (Rmax * 1000));

      const calcPt = (M: number, d: number) => {
        const momentInNmm = M * 1000000;
        const innerTerm = 1 - (4.6 * momentInNmm) / (fck * 1000 * d * d);
        if (innerTerm < 0) return null;
        return ((50 * fck) / fy) * (1 - Math.sqrt(innerTerm));
      };

      // Used davg for Required Pt sizing
      const Ptx = calcPt(Mtx, davg);
      const Ptx1 = calcPt(Mtx1, davg);
      const Pty = calcPt(Mty, davg);
      const Pty1 = calcPt(Mty1, davg);

      if (
        !customDepth &&
        (Ptx === null || Ptx1 === null || Pty === null || Pty1 === null)
      ) {
        assumedD += 5;
        continue;
      }

      const safePtx = Ptx ?? 0;
      const safePtx1 = Ptx1 ?? 0;
      const safePty = Pty ?? 0;
      const safePty1 = Pty1 ?? 0;

      const astBar = (Math.PI / 4) * barDia * barDia;

      const calcExactSpacing = (Pt: number, d: number) => {
        if (Pt === 0) return 0;
        const AstReq = (Pt / 100) * 1000 * d;
        const rawSpacing = (astBar / AstReq) * 1000;
        return Math.min(rawSpacing, 300);
      };

      // Used davg for Required Exact Spacing
      const sxReqExact = calcExactSpacing(safePtx, davg);
      const sx1ReqExact = calcExactSpacing(safePtx1, davg);
      const syReqExact = calcExactSpacing(safePty, davg);
      const sy1ReqExact = calcExactSpacing(safePty1, davg);

      const roundSpacingDown = (val: number) =>
        val > 0 ? Math.floor(val / 5) * 5 : 0;
      const sxProvAuto = roundSpacingDown(sxReqExact);

      // Validation Guardrail for Manual Sx Input
      if (customSx) {
        if (customSx <= 0) {
          alert("Manual spacing must be greater than 0 mm.");
          return;
        }
        if (customSx > sxProvAuto) {
          alert(
            `Error: Manual spacing (${customSx} mm) cannot exceed the safe calculated maximum of ${sxProvAuto} mm. Please enter a smaller value to provide more steel.`,
          );
          return;
        }
      }

      // If manual spacing is provided and safe, use it. Otherwise, use auto-calculated.
      const sxProv = customSx || sxProvAuto;
      const sx1Prov = roundSpacingDown(sx1ReqExact);
      const syProv = roundSpacingDown(syReqExact);
      const sy1Prov = roundSpacingDown(sy1ReqExact);

      const astReqX = (safePtx / 100) * 1000 * dx;

      const astProvX = sxProv > 0 ? (astBar / sxProv) * 1000 : 0;
      const astProvX1 = sx1Prov > 0 ? (astBar / sx1Prov) * 1000 : 0;
      const astProvY = syProv > 0 ? (astBar / syProv) * 1000 : 0;
      const astProvY1 = sy1Prov > 0 ? (astBar / sy1Prov) * 1000 : 0;

      const PtxProv = astProvX > 0 ? (astProvX / (1000 * dx)) * 100 : 0;
      const Ptx1Prov = astProvX1 > 0 ? (astProvX1 / (1000 * dx)) * 100 : 0;
      const PtyProv = astProvY > 0 ? (astProvY / (1000 * dy)) * 100 : 0;
      const Pty1Prov = astProvY1 > 0 ? (astProvY1 / (1000 * dy)) * 100 : 0;

      const fs = astProvX > 0 ? 0.58 * fy * (astReqX / astProvX) : 0;

      let basicLd = 26;
      if (
        [
          "interior",
          "one_short_discontinuous",
          "two_short_discontinuous",
        ].includes(supportCond)
      ) {
        basicLd = 26;
      } else if (
        [
          "one_long_discontinuous",
          "two_adjacent_discontinuous",
          "three_discontinuous_one_long_continuous",
        ].includes(supportCond)
      ) {
        basicLd = 23;
      } else if (
        [
          "two_long_discontinuous",
          "three_discontinuous_one_short_continuous",
          "four_edges_discontinuous",
        ].includes(supportCond)
      ) {
        basicLd = 20;
      }

      let modFactor = 1.9;
      if (PtxProv > 0) {
        const calculatedModFactor =
          1 / (0.225 + 0.00328 * fs + 0.625 * Math.log10(PtxProv));
        const cappedModFactor = Math.min(
          Math.max(calculatedModFactor, 0.5),
          2.0,
        );
        modFactor = Math.floor(cappedModFactor * 10) / 10;
      }

      const allowedLd = basicLd * modFactor;
      // Using davg for provided actual ratio limit as requested
      const actualLd = effLx / davg;

      const isDepthAdequate = dReq < davg && safePtx > 0;
      const isDeflectionSafe = actualLd <= allowedLd;

      let adequacyComment = "";
      if (customDepth) {
        adequacyComment =
          safePtx === 0
            ? "Fails - Moment exceeds section capacity"
            : isDepthAdequate
              ? `Safe (manual ${assumedD} mm thickness is adequate)`
              : "Unsafe - Depth inadequate";
      } else {
        adequacyComment = isDepthAdequate
          ? `Safe (auto-optimized to ${assumedD} mm)`
          : "Unsafe - Increase Depth";
      }

      let deflectionCheck = "";
      if (safePtx === 0) {
        deflectionCheck = "Fails - Section too thin";
      } else {
        deflectionCheck = isDeflectionSafe
          ? "Safe against excessive deflection"
          : "Fails deflection criteria";
      }

      finalResults = {
        effLx,
        effLy,
        ratio: ratio.toFixed(2),
        panelType: isTwoWay ? "Two Way" : "One Way",
        supportCond,
        assumedD,
        dx,
        dy,
        davg: davg.toFixed(2),
        DL: totalDL.toFixed(2),
        LL: llNum.toFixed(2),
        totalW: totalW.toFixed(2),
        alphaX: coeffs.alphaX,
        alphaX1: coeffs.alphaX1,
        alphaY: coeffs.alphaY,
        alphaY1: coeffs.alphaY1,
        Mtx: Mtx.toFixed(3),
        Mtx1: Mtx1.toFixed(3),
        Mty: Mty.toFixed(3),
        Mty1: Mty1.toFixed(3),
        dReq: dReq.toFixed(2),
        adequacyComment,
        MtxBd: ((Mtx * 1000000) / (1000 * davg * davg)).toFixed(3),
        Mtx1Bd: ((Mtx1 * 1000000) / (1000 * davg * davg)).toFixed(3),
        MtyBd: ((Mty * 1000000) / (1000 * davg * davg)).toFixed(3),
        Mty1Bd: ((Mty1 * 1000000) / (1000 * davg * davg)).toFixed(3),
        Ptx: safePtx.toFixed(3),
        Ptx1: safePtx1.toFixed(3),
        Pty: safePty.toFixed(3),
        Pty1: safePty1.toFixed(3),
        sxReq: sxReqExact > 0 ? sxReqExact.toFixed(2) : "0",
        sx1Req: sx1ReqExact > 0 ? sx1ReqExact.toFixed(2) : "0",
        syReq: syReqExact > 0 ? syReqExact.toFixed(2) : "0",
        sy1Req: sy1ReqExact > 0 ? sy1ReqExact.toFixed(2) : "0",
        sxProv,
        sx1Prov,
        syProv,
        sy1Prov,
        PtxProv: PtxProv.toFixed(3),
        Ptx1Prov: Ptx1Prov.toFixed(3),
        PtyProv: PtyProv.toFixed(3),
        Pty1Prov: Pty1Prov.toFixed(3),
        dxDavg: (dx / davg).toFixed(2),
        actualLd: actualLd.toFixed(2),
        basicLd,
        astRatio: astProvX > 0 ? (astReqX / astProvX).toFixed(3) : "N/A",
        fs: fs.toFixed(2),
        modFactor: modFactor.toFixed(1),
        allowedLd: allowedLd.toFixed(2),
        deflectionCheck,
      };

      if (customDepth) break;
      if (isDepthAdequate && isDeflectionSafe) break;

      assumedD += 5;
    }

    setResults(finalResults);
    setEditableDepth(finalResults.assumedD);
    setEditableSx(finalResults.sxProv); // Sync the editable state with the auto or validated spacing
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
  };

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center w-full pt-12 pb-24 bg-white">
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
            {/* 1. Material Properties */}
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
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1d64d8] bg-white"
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
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1d64d8] bg-white"
                  >
                    <option value="415">Fe415</option>
                    <option value="500">Fe500</option>
                    <option value="550">Fe550</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Span & Continuity */}
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
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1d64d8] bg-white"
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
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1d64d8] bg-white"
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
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1d64d8] bg-white"
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
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1d64d8] bg-white"
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

            {/* 3. Loading Parameters */}
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
                    value={llLoad}
                    onChange={(e) => setLlLoad(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1d64d8] bg-white"
                    placeholder="e.g., 3.0"
                  />
                </div>
              </div>
            </div>

            {/* 4. Durability & Detailing */}
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
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1d64d8] bg-white"
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
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1d64d8] bg-white"
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

          {/* --- DYNAMIC RESULTS OUTPUT TABLE --- */}
          {results && (
            <div className="mt-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Slab Calculation Output Table
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
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
                    {/* Geometry */}
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

                    {/* EDITABLE THICKNESS ROW */}
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
                              className="w-24 px-3 py-1.5 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1d64d8] bg-white font-bold text-[#1d64d8]"
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
                            className="bg-slate-800 text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-slate-700 transition-colors shadow-sm"
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

                    {/* Loading */}
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

                    {/* Coefficients */}
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

                    {/* Factored B.M. */}
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

                    {/* Adequacy */}
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

                    {/* Mt/bd^2 */}
                    <tr className="bg-slate-50">
                      <td
                        colSpan={2}
                        className="px-6 py-2 font-semibold text-slate-900 border-y border-slate-200"
                      >
                        Mt/bd² Per m width of slab b=1000
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">Mtx/bd²</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.MtxBd}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">Mtx1/bd²</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.Mtx1Bd}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">Mty/bd²</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.MtyBd}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">Mty1/bd²</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.Mty1Bd}
                      </td>
                    </tr>

                    {/* Percentage of Steel Required */}
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
                        {results.Ptx} %
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">Ptx1 (reqd)</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.Ptx1} %
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">Pty (reqd)</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.Pty} %
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">Pty1 (reqd)</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.Pty1} %
                      </td>
                    </tr>

                    {/* Spacing Required (Exact Calculation) */}
                    <tr className="bg-slate-50">
                      <td
                        colSpan={2}
                        className="px-6 py-2 font-semibold text-slate-900 border-y border-slate-200"
                      >
                        Spacing Required (for 8mm dia bar)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">Sx (reqd) mm</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.sxReq}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">Sx1 (reqd)</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.sx1Req}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">Sy (reqd)</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.syReq}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">Sy1 (reqd)</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.sy1Req}
                      </td>
                    </tr>

                    {/* EDITABLE SPACING PROVIDED ROW */}
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
                              className="w-24 px-3 py-1.5 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1d64d8] bg-white font-bold text-[#1d64d8]"
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
                            className="bg-slate-800 text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-slate-700 transition-colors shadow-sm"
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

                    {/* % Ast Provided */}
                    <tr className="bg-slate-50">
                      <td
                        colSpan={2}
                        className="px-6 py-2 font-semibold text-slate-900 border-y border-slate-200"
                      >
                        % Ast Provided
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">Ptx (Prov)</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.PtxProv} %
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">Ptx1 (Prov)</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.Ptx1Prov} %
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">Pty (Prov)</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.PtyProv} %
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium">Pty1 (Prov)</td>
                      <td className="px-6 py-3 border-l border-slate-100">
                        {results.Pty1Prov} %
                      </td>
                    </tr>

                    {/* Deflection */}
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
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
