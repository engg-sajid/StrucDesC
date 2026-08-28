import { db } from "@/prisma/db";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FileText, Trash2 } from "lucide-react";
import { deleteCalculationHistory } from "@/actions/deleteHistory";

export default async function HistoryPage() {
  const session = await getSession();
  if (!session?.userId) {
    redirect("/");
  }

  const rawCalculations = await db.calculationHistory
    .where({ userId: session.userId })
    .all();

  const savedCalculations = rawCalculations.map((calc: any) => {
    let dateStr = new Date().toISOString();
    try {
      if (calc.createdAt) {
        dateStr = new Date(calc.createdAt.toString()).toISOString();
      }
    } catch {
      dateStr = new Date().toISOString();
    }

    return {
      id: String(calc.id),
      userId: String(calc.userId),
      moduleType: String(calc.moduleType || ""),
      title: String(calc.title || ""),
      createdAt: dateStr,
    };
  });

  savedCalculations.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-1 max-w-5xl mx-auto w-full px-8 pt-12 pb-24">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            My Saved Designs
          </h1>
          <p className="text-slate-600">
            Review your past structural analysis reports.
          </p>
        </div>

        {savedCalculations.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 shadow-sm">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              No saves found
            </h3>
            <p className="text-slate-500 mb-6">
              You haven't saved any calculations yet.
            </p>
            <Link
              href="/design"
              className="bg-[#1d64d8] text-white px-6 py-2.5 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Start a Design
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {savedCalculations.map((calc) => (
              <div
                key={calc.id}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-blue-300 transition-colors"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {calc.title}
                  </h3>
                  <div className="flex gap-4 mt-2 text-sm text-slate-500">
                    <span className="font-semibold text-blue-600 px-2 py-0.5 bg-blue-50 rounded">
                      {calc.moduleType}
                    </span>
                    <span>{new Date(calc.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <form
                  action={async () => {
                    "use server";
                    await deleteCalculationHistory(calc.id);
                  }}
                >
                  <button
                    type="submit"
                    className="text-slate-400 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
                    title="Delete Design"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
