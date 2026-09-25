"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { deleteCalculationHistory } from "@/actions/deleteHistory";

export default function DeleteHistoryButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this saved design?")) {
      startTransition(async () => {
        await deleteCalculationHistory(id);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className={`text-slate-400 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50 ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
      title="Delete Design"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
}
