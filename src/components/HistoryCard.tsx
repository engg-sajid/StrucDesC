"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import DeleteHistoryButton from "./DeleteHistoryButton";

export default function HistoryCard({ calc }: { calc: any }) {
  const [isOpen, setIsOpen] = useState(false);

  const formatLabel = (key: string) => {
    const spaced = key.replace(/([A-Z])/g, " $1");
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
  };

  // 1. SPECIFIC LAYOUT: Slab Design
  const renderSlabDetails = () => (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h4 className="font-semibold text-slate-700 mb-3 border-b border-slate-200 pb-2">
          Slab Parameters & Loads
        </h4>
        <table className="w-full text-sm">
          <tbody>
            {calc.inputs &&
              Object.entries(calc.inputs).map(([key, value]) => (
                <tr
                  key={key}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="py-2 text-slate-500">{formatLabel(key)}</td>
                  <td className="py-2 font-medium text-right text-slate-800">
                    {String(value)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div>
        <h4 className="font-semibold text-slate-700 mb-3 border-b border-slate-200 pb-2">
          Reinforcement & Checks (IS 456)
        </h4>
        <table className="w-full text-sm bg-blue-50/50 rounded-lg overflow-hidden">
          <tbody>
            {calc.results &&
              Object.entries(calc.results).map(([key, value]) => (
                <tr
                  key={key}
                  className="border-b border-blue-100/50 last:border-0"
                >
                  <td className="py-2 px-3 text-slate-600">
                    {formatLabel(key)}
                  </td>
                  <td className="py-2 px-3 font-semibold text-right text-blue-800">
                    {String(value)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // 2. DEFAULT LAYOUT: Generic fallback for future modules
  const renderDefaultDetails = () => (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h4 className="font-semibold text-slate-700 mb-3 border-b border-slate-200 pb-2">
          Inputs
        </h4>
        <pre className="text-xs bg-white p-4 rounded-md border border-slate-200 overflow-auto">
          {JSON.stringify(calc.inputs, null, 2)}
        </pre>
      </div>
      <div>
        <h4 className="font-semibold text-slate-700 mb-3 border-b border-slate-200 pb-2">
          Results
        </h4>
        <pre className="text-xs bg-white p-4 rounded-md border border-slate-200 overflow-auto text-blue-700">
          {JSON.stringify(calc.results, null, 2)}
        </pre>
      </div>
    </div>
  );

  // 3. ROUTER: Decide which layout to show based on moduleType
  const renderExpandedContent = () => {
    const type = calc.moduleType?.toLowerCase() || "";

    if (type.includes("slab")) {
      return renderSlabDetails();
    }
    // Add future conditions here (e.g., if (type.includes('beam')) return renderBeamDetails(); )

    return renderDefaultDetails();
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:border-blue-300 transition-colors">
      <div
        className="p-6 flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          <h3 className="text-lg font-bold text-slate-900">{calc.title}</h3>
          <div className="flex gap-4 mt-2 text-sm text-slate-500">
            <span className="font-semibold text-blue-600 px-2 py-0.5 bg-blue-50 rounded">
              {calc.moduleType}
            </span>
            <span>{new Date(calc.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div onClick={(e) => e.stopPropagation()}>
            <DeleteHistoryButton id={calc.id} />
          </div>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </div>
      </div>

      {isOpen && (
        <div className="px-6 pb-6 border-t border-slate-100 pt-6 bg-slate-50/50">
          {renderExpandedContent()}
        </div>
      )}
    </div>
  );
}
