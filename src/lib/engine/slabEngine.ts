export interface SlabInputs {
  fck: number;
  fy: number;
  lxInput: number | string;
  lyInput: number | string;
  beamWidth: number | string;
  supportCond: string;
  ffLoad: number | string;
  llLoad: number | string;
  cover: number;
  barDia: number;
  customDepth?: number;
  customSx?: number;
}

const tableRatios = [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.75, 2.0];

const table26Data: Record<string, number[][]> = {
  interior: [
    [0.024, 0.032, 0.024, 0.032], [0.028, 0.037, 0.024, 0.032],
    [0.032, 0.043, 0.024, 0.032], [0.036, 0.047, 0.024, 0.032],
    [0.039, 0.051, 0.024, 0.032], [0.041, 0.053, 0.024, 0.032],
    [0.045, 0.06, 0.024, 0.032], [0.049, 0.065, 0.024, 0.032],
  ],
  one_short_discontinuous: [
    [0.028, 0.037, 0.028, 0.037], [0.032, 0.043, 0.028, 0.037],
    [0.036, 0.048, 0.028, 0.037], [0.039, 0.051, 0.028, 0.037],
    [0.041, 0.055, 0.028, 0.037], [0.044, 0.057, 0.028, 0.037],
    [0.048, 0.064, 0.028, 0.037], [0.052, 0.068, 0.028, 0.037],
  ],
  one_long_discontinuous: [
    [0.028, 0.037, 0.028, 0.037], [0.033, 0.044, 0.028, 0.037],
    [0.039, 0.052, 0.028, 0.037], [0.044, 0.057, 0.028, 0.037],
    [0.047, 0.063, 0.028, 0.037], [0.051, 0.067, 0.028, 0.037],
    [0.059, 0.077, 0.028, 0.037], [0.065, 0.085, 0.028, 0.037],
  ],
  two_adjacent_discontinuous: [
    [0.035, 0.047, 0.035, 0.047], [0.04, 0.053, 0.035, 0.047],
    [0.045, 0.06, 0.035, 0.047], [0.049, 0.065, 0.035, 0.047],
    [0.053, 0.071, 0.035, 0.047], [0.056, 0.075, 0.035, 0.047],
    [0.063, 0.084, 0.035, 0.047], [0.069, 0.091, 0.035, 0.047],
  ],
  two_short_discontinuous: [
    [0.035, 0.045, 0.035, 0], [0.037, 0.049, 0.035, 0],
    [0.04, 0.052, 0.035, 0], [0.043, 0.056, 0.035, 0],
    [0.044, 0.059, 0.035, 0], [0.045, 0.06, 0.035, 0],
    [0.049, 0.065, 0.035, 0], [0.052, 0.069, 0.035, 0],
  ],
  two_long_discontinuous: [
    [0.035, 0, 0.035, 0.045], [0.043, 0, 0.035, 0.045],
    [0.051, 0, 0.035, 0.045], [0.057, 0, 0.035, 0.045],
    [0.063, 0, 0.035, 0.045], [0.068, 0, 0.035, 0.045],
    [0.08, 0, 0.035, 0.045], [0.088, 0, 0.035, 0.045],
  ],
  three_discontinuous_one_long_continuous: [
    [0.043, 0.057, 0.043, 0], [0.048, 0.064, 0.043, 0],
    [0.053, 0.071, 0.043, 0], [0.057, 0.076, 0.043, 0],
    [0.06, 0.08, 0.043, 0], [0.064, 0.084, 0.043, 0],
    [0.069, 0.091, 0.043, 0], [0.073, 0.097, 0.043, 0],
  ],
  three_discontinuous_one_short_continuous: [
    [0.043, 0, 0.043, 0.057], [0.051, 0, 0.043, 0.057],
    [0.059, 0, 0.043, 0.057], [0.065, 0, 0.043, 0.057],
    [0.071, 0, 0.043, 0.057], [0.076, 0, 0.043, 0.057],
    [0.087, 0, 0.043, 0.057], [0.096, 0, 0.043, 0.057],
  ],
  four_edges_discontinuous: [
    [0.056, 0, 0.056, 0], [0.064, 0, 0.056, 0],
    [0.072, 0, 0.056, 0], [0.079, 0, 0.056, 0],
    [0.085, 0, 0.056, 0], [0.089, 0, 0.056, 0],
    [0.1, 0, 0.056, 0], [0.107, 0, 0.056, 0],
  ],
};

function getDynamicCoefficients(targetRatio: number, condition: string) {
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
    dataset[lowerIdx][col] + (dataset[upperIdx][col] - dataset[lowerIdx][col]) * factor;

  return {
    alphaX: Number(interpolate(0).toFixed(4)),
    alphaX1: Number(interpolate(1).toFixed(4)),
    alphaY: Number(interpolate(2).toFixed(4)),
    alphaY1: Number(interpolate(3).toFixed(4)),
  };
}

export function executeSlabAnalysis(inputs: SlabInputs) {
  const { fck, fy, lxInput, lyInput, beamWidth, supportCond, ffLoad, llLoad, cover, barDia, customDepth, customSx } = inputs;

  const lxNum = Number(lxInput) || 0;
  const lyNum = Number(lyInput) || 0;
  const beamWNum = Number(beamWidth) || 0;
  const ffNum = Number(ffLoad) || 0;
  const llNum = Number(llLoad) || 0;

  if (!lxNum || !lyNum || !beamWNum || !ffNum || !llNum) {
    throw new Error("Please enter the required inputs for analysis.");
  }

  if (customDepth && customDepth <= cover + barDia) {
    throw new Error(`Manual thickness must be strictly greater than cover + bar diameter (${cover + barDia} mm).`);
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

    let rMaxFactor = 0.138;
    if (fy === 500) rMaxFactor = 0.133;
    if (fy === 550) rMaxFactor = 0.13;

    const Rmax = rMaxFactor * fck;
    const dReq = Math.sqrt((maxM * 1000000) / (Rmax * 1000));

    const calcPt = (M: number, d: number) => {
      if (M === 0) return 0;
      const momentInNmm = M * 1000000;
      const innerTerm = 1 - (4.6 * momentInNmm) / (fck * 1000 * d * d);
      if (innerTerm < 0) return null;
      return ((50 * fck) / fy) * (1 - Math.sqrt(innerTerm));
    };

    const Ptx = calcPt(Mtx, davg);
    const Ptx1 = calcPt(Mtx1, davg);
    const Pty = calcPt(Mty, davg);
    const Pty1 = calcPt(Mty1, davg);

    if (!customDepth && (Ptx === null || Ptx1 === null || Pty === null || Pty1 === null)) {
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
      return (astBar / AstReq) * 1000;
    };

    const sxReqExact = calcExactSpacing(safePtx, davg);
    const sx1ReqExact = calcExactSpacing(safePtx1, davg);
    const syReqExact = calcExactSpacing(safePty, davg);
    const sy1ReqExact = calcExactSpacing(safePty1, davg);

    const capAndRoundSpacingDown = (val: number, d: number) => {
      if (val <= 0) return 0;
      const maxAllowed = Math.min(3 * d, 300);
      return Math.floor(Math.min(val, maxAllowed) / 5) * 5;
    };

    const sxProvAuto = capAndRoundSpacingDown(sxReqExact, davg);

    if (customSx) {
      if (customSx <= 0) throw new Error("Manual spacing must be greater than 0 mm.");
      if (customSx > sxProvAuto) {
        throw new Error(`Error: Manual spacing (${customSx} mm) cannot exceed calculated max ${sxProvAuto} mm.`);
      }
    }

    const sxProv = customSx || sxProvAuto;
    const sx1Prov = capAndRoundSpacingDown(sx1ReqExact, davg);
    const syProv = capAndRoundSpacingDown(syReqExact, davg);
    const sy1Prov = capAndRoundSpacingDown(sy1ReqExact, davg);

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
    if (["interior", "one_short_discontinuous", "two_short_discontinuous"].includes(supportCond)) {
      basicLd = 26;
    } else if (["one_long_discontinuous", "two_adjacent_discontinuous", "three_discontinuous_one_long_continuous"].includes(supportCond)) {
      basicLd = 23;
    } else if (["two_long_discontinuous", "three_discontinuous_one_short_continuous", "four_edges_discontinuous"].includes(supportCond)) {
      basicLd = 20;
    }

    let modFactor = 1.9;
    if (PtxProv > 0) {
      const calculatedModFactor = 1 / (0.225 + 0.00328 * fs + 0.625 * Math.log10(PtxProv));
      const cappedModFactor = Math.min(Math.max(calculatedModFactor, 0.5), 2.0);
      modFactor = Math.floor(cappedModFactor * 10) / 10;
    }

    const allowedLd = basicLd * modFactor;
    const actualLd = effLx / davg;

    const isDepthAdequate = dReq < davg && safePtx > 0;
    const isDeflectionSafe = actualLd <= allowedLd;

    let adequacyComment = "";
    if (customDepth) {
      adequacyComment = safePtx === 0 ? "Fails - Moment exceeds section capacity" : isDepthAdequate ? `Safe (manual ${assumedD} mm thickness is adequate)` : "Unsafe - Depth inadequate";
    } else {
      adequacyComment = isDepthAdequate ? `Safe (auto-optimized to ${assumedD} mm)` : "Unsafe - Increase Depth";
    }

    let deflectionCheck = "";
    if (safePtx === 0) {
      deflectionCheck = "Fails - Section too thin";
    } else {
      deflectionCheck = isDeflectionSafe ? "Safe against excessive deflection" : "Fails deflection criteria";
    }

    finalResults = {
      effLx, effLy, ratio: ratio.toFixed(2), panelType: isTwoWay ? "Two Way" : "One Way",
      supportCond, assumedD, dx, dy, davg: davg.toFixed(2), DL: totalDL.toFixed(2), LL: llNum.toFixed(2),
      totalW: totalW.toFixed(2), alphaX: coeffs.alphaX, alphaX1: coeffs.alphaX1, alphaY: coeffs.alphaY, alphaY1: coeffs.alphaY1,
      Mtx: Mtx.toFixed(3), Mtx1: Mtx1.toFixed(3), Mty: Mty.toFixed(3), Mty1: Mty1.toFixed(3),
      dReq: dReq.toFixed(2), adequacyComment, MtxBd: ((Mtx * 1000000) / (1000 * davg * davg)).toFixed(3),
      Mtx1Bd: ((Mtx1 * 1000000) / (1000 * davg * davg)).toFixed(3), MtyBd: ((Mty * 1000000) / (1000 * davg * davg)).toFixed(3),
      Mty1Bd: ((Mty1 * 1000000) / (1000 * davg * davg)).toFixed(3), 
      PtxVal: safePtx, Ptx1Val: safePtx1, PtyVal: safePty, Pty1Val: safePty1,
      sxReq: sxReqExact > 0 ? sxReqExact.toFixed(2) : "-", sx1Req: sx1ReqExact > 0 ? sx1ReqExact.toFixed(2) : "-",
      syReq: syReqExact > 0 ? syReqExact.toFixed(2) : "-", sy1Req: sy1ReqExact > 0 ? sy1ReqExact.toFixed(2) : "-",
      sxProv: sxProv > 0 ? sxProv : "-", sx1Prov: sx1Prov > 0 ? sx1Prov : "-", syProv: syProv > 0 ? syProv : "-",
      sy1Prov: sy1Prov > 0 ? sy1Prov : "-", PtxProv: PtxProv.toFixed(3), Ptx1Prov: Ptx1Prov.toFixed(3),
      PtyProv: PtyProv.toFixed(3), Pty1Prov: Pty1Prov.toFixed(3), dxDavg: (dx / davg).toFixed(2),
      actualLd: actualLd.toFixed(2), basicLd, astRatio: astProvX > 0 ? (astReqX / astProvX).toFixed(3) : "N/A",
      fs: fs.toFixed(2), modFactor: modFactor.toFixed(1), allowedLd: allowedLd.toFixed(2), deflectionCheck,
    };

    if (customDepth) break;
    if (isDepthAdequate && isDeflectionSafe) break;

    assumedD += 5;
  }

  return finalResults;
}