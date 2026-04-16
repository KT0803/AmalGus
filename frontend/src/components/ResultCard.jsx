import React, { useState } from "react";
import ScoreBadge from "./ScoreBadge";

const CATEGORY_COLORS = {
  tempered: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  laminated: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  float: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  IGU: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  mirror: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  decorative: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  "fire-rated": "bg-red-500/20 text-red-300 border-red-500/30",
  spandrel: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

const SPEC_ICONS = {
  thickness: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21l3-3-3-3m10 6l-3-3 3-3M3 12h18" />
    </svg>
  ),
  dimensions: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
    </svg>
  ),
  price: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  edge: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
    </svg>
  ),
};

export default function ResultCard({ result, rank, style }) {
  const [expanded, setExpanded] = useState(false);
  const { product, match_score, explanation, score_breakdown } = result;
  const categoryColor = CATEGORY_COLORS[product.category] || "bg-slate-500/20 text-slate-300 border-slate-500/30";

  return (
    <div
      className="glass-card rounded-2xl overflow-hidden transition-all duration-300 animate-slide-up cursor-pointer"
      style={style}
      onClick={() => setExpanded(!expanded)}
      id={`result-card-${product.id}`}
    >
      {/* Top strip - rank indicator */}
      {rank === 1 && (
        <div className="h-0.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400" />
      )}
      {rank === 2 && (
        <div className="h-0.5 bg-gradient-to-r from-slate-400 via-slate-300 to-slate-400" />
      )}
      {rank >= 3 && (
        <div className="h-0.5 bg-gradient-to-r from-brand-700 via-brand-500 to-brand-700" />
      )}

      <div className="p-5">
        <div className="flex gap-4">
          {/* Score Column */}
          <div className="flex-shrink-0 w-20">
            <ScoreBadge score={match_score} breakdown={score_breakdown} />
          </div>

          {/* Content Column */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  {rank === 1 && (
                    <span className="tag-pill bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px]">
                      ★ Best Match
                    </span>
                  )}
                  <span className={`tag-pill border text-[11px] ${categoryColor}`}>
                    {product.category}
                  </span>
                  <span className="tag-pill bg-brand-900/40 text-brand-300 border border-brand-700/30 text-[11px]">
                    {product.thickness}mm
                  </span>
                </div>
                <h3 className="font-semibold text-slate-100 text-sm leading-snug">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{product.supplier}</p>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="text-lg font-bold text-slate-100">
                  ₹{product.price_per_sqft}
                  <span className="text-xs text-slate-500 font-normal">/sqft</span>
                </div>
                <div className="text-xs text-slate-500">Total: ₹{product.price.toLocaleString()}</div>
              </div>
            </div>

            {/* Explanation */}
            <div className="bg-brand-900/20 border border-brand-700/30 rounded-xl p-3 mb-3">
              <div className="flex gap-2">
                <svg className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p className="text-xs text-slate-300 leading-relaxed">{explanation}</p>
              </div>
            </div>

            {/* Quick Specs Row */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: SPEC_ICONS.thickness, label: "Thickness", value: `${product.thickness}mm` },
                { icon: SPEC_ICONS.dimensions, label: "Dimensions", value: product.dimensions },
                { icon: SPEC_ICONS.edge, label: "Edge", value: product.edge_finish },
                { icon: SPEC_ICONS.price, label: "Coating", value: product.coating ? product.coating.split(",")[0] : "None" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs">
                  <span className="text-brand-400">{icon}</span>
                  <span className="text-slate-500">{label}:</span>
                  <span className="text-slate-300 truncate">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expanded Details */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-glass-border animate-fade-in space-y-3" onClick={(e) => e.stopPropagation()}>
            {/* Description */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">About This Product</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{product.description}</p>
            </div>

            {/* Features & Use Cases */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Features</h4>
                <div className="flex flex-wrap gap-1">
                  {product.features.map((f) => (
                    <span key={f} className="tag-pill bg-brand-900/30 text-brand-300 border border-brand-700/30 text-[10px]">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Use Cases</h4>
                <div className="flex flex-wrap gap-1">
                  {product.use_cases.map((uc) => (
                    <span key={uc} className="tag-pill bg-emerald-900/20 text-emerald-400 border border-emerald-700/30 text-[10px]">
                      {uc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Certifications</h4>
              <div className="flex flex-wrap gap-1">
                {product.certifications.map((cert) => (
                  <span key={cert} className="tag-pill bg-amber-900/20 text-amber-400 border border-amber-700/30 text-[10px]">
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              ↑ Collapse
            </button>
          </div>
        )}

        {/* Expand Hint */}
        {!expanded && (
          <div className="mt-3 text-center">
            <span className="text-[10px] text-slate-600 hover:text-slate-400 transition-colors">
              Click to see full specs &amp; certifications ↓
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
