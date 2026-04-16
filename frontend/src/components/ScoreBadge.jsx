import React from "react";

function getScoreColor(score) {
  if (score >= 80) return { ring: "#22c55e", bg: "bg-emerald-500/10", text: "text-emerald-400", label: "Excellent" };
  if (score >= 60) return { ring: "#0ea5e9", bg: "bg-brand-500/10", text: "text-brand-400", label: "Great" };
  if (score >= 40) return { ring: "#f59e0b", bg: "bg-amber-500/10", text: "text-amber-400", label: "Good" };
  return { ring: "#ef4444", bg: "bg-red-500/10", text: "text-red-400", label: "Fair" };
}

export default function ScoreBadge({ score, breakdown }) {
  const { ring, bg, text, label } = getScoreColor(score);
  const circumference = 2 * Math.PI * 22;
  const strokeDash = (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      {/* SVG Ring Score */}
      <div className="relative w-16 h-16">
        <svg viewBox="0 0 52 52" className="w-16 h-16 rotate-[-90deg]">
          <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(30,58,95,0.6)" strokeWidth="4" />
          <circle
            cx="26" cy="26" r="22"
            fill="none"
            stroke={ring}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${strokeDash} ${circumference}`}
            className="transition-all duration-700 ease-out"
            style={{ filter: `drop-shadow(0 0 6px ${ring}80)` }}
          />
        </svg>
        <div className={`absolute inset-0 flex flex-col items-center justify-center ${text}`}>
          <span className="text-lg font-bold leading-none">{score}</span>
          <span className="text-[9px] font-medium opacity-80">/ 100</span>
        </div>
      </div>

      {/* Label */}
      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${bg} ${text}`}>
        {label}
      </span>

      {/* Score Breakdown Tooltip */}
      {breakdown && (
        <div className="w-full text-[10px] space-y-1 mt-1">
          {[
            { label: "Semantic", value: breakdown.semantic, max: 50, weight: "50%" },
            { label: "Category", value: breakdown.category, max: 20, weight: "20%" },
            { label: "Thickness", value: breakdown.thickness, max: 15, weight: "15%" },
            { label: "Keywords", value: breakdown.keyword, max: 15, weight: "15%" },
          ].map(({ label, value, max, weight }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="text-slate-600 w-14 shrink-0">{label}</span>
              <div className="flex-1 h-1 bg-glass-border rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${value}%`,
                    background: ring,
                    opacity: 0.7,
                  }}
                />
              </div>
              <span className={`${text} w-6 text-right`}>{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
