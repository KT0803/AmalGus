import React from "react";

export default function Filters({ filters, onChange }) {
  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = filters.min_price || filters.max_price;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Price Range label */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
        <svg className="w-3.5 h-3.5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Price/sqft (₹):
      </div>

      {/* Min Price */}
      <input
        id="filter-min-price"
        type="number"
        placeholder="Min ₹/sqft"
        value={filters.min_price || ""}
        onChange={(e) => handleChange("min_price", e.target.value)}
        className="w-32 bg-glass-dark border border-glass-border rounded-xl px-3 py-2 text-sm text-slate-200
                   placeholder-slate-600 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400
                   transition-all duration-200"
      />

      <span className="text-slate-600 text-sm">—</span>

      {/* Max Price */}
      <input
        id="filter-max-price"
        type="number"
        placeholder="Max ₹/sqft"
        value={filters.max_price || ""}
        onChange={(e) => handleChange("max_price", e.target.value)}
        className="w-32 bg-glass-dark border border-glass-border rounded-xl px-3 py-2 text-sm text-slate-200
                   placeholder-slate-600 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400
                   transition-all duration-200"
      />

      {/* Reset — only shown when filters are active */}
      {hasActiveFilters && (
        <button
          id="filter-reset"
          onClick={() => onChange({ min_price: "", max_price: "" })}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-brand-400
                     border border-glass-border hover:border-brand-400 rounded-xl px-3 py-2
                     transition-all duration-200 hover:bg-brand-900/20"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Clear
        </button>
      )}

      {hasActiveFilters && (
        <span className="text-xs text-brand-400 font-medium">
          ₹{filters.min_price || "0"} – ₹{filters.max_price || "∞"}/sqft
        </span>
      )}
    </div>
  );
}
