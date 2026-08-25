import { SquareArrowUpRight, PenLine, BadgeCheck } from "lucide-react";

const featureData = [
  {
    icon: (
      <SquareArrowUpRight className="w-7 h-7 text-slate-800" strokeWidth={2} />
    ),
    title: "Structural Analysis",
    description: "Analyze and evaluate structural components",
  },
  {
    icon: <PenLine className="w-7 h-7 text-slate-800" strokeWidth={2} />,
    title: "Design Tools",
    description: "Utilize powerful tools for efficient design",
  },
  {
    icon: <BadgeCheck className="w-7 h-7 text-slate-800" strokeWidth={2} />,
    title: "Reliable Results",
    description: "Ensure accuracy and code compliance",
  },
];

export default function Features() {
  return (
    <section className="flex flex-col md:flex-row justify-between gap-12 px-16 pt-8 pb-4 bg-white">
      {featureData.map((feature, index) => (
        <div key={index} className="flex gap-5 max-w-sm items-start">
          <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full border-2 border-slate-800 mt-1">
            {feature.icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#2d3748] mb-2">
              {feature.title}
            </h3>
            <p className="text-slate-600 text-lg leading-snug">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
