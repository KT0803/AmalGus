import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import ResultCard from "./components/ResultCard";

// In production this points to the Render backend URL (set via Vercel env var VITE_API_URL).
// In local dev it is empty so the Vite proxy forwards requests to http://localhost:5001.
const API_BASE = import.meta.env.VITE_API_URL || "";

function SkeletonCard() {
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex gap-4">
        <div className="w-20 h-24 shimmer-bg rounded-xl" />
        <div className="flex-1 space-y-3">
          <div className="h-4 shimmer-bg rounded-lg w-3/4" />
          <div className="h-3 shimmer-bg rounded-lg w-1/2" />
          <div className="h-12 shimmer-bg rounded-xl" />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-3 shimmer-bg rounded-lg" />
            <div className="h-3 shimmer-bg rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ message, icon }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="w-20 h-20 rounded-full border border-brand-700/40 flex items-center justify-center mb-5"
        style={{ background: "rgba(13,21,38,0.8)" }}>
        {icon}
      </div>
      <p className="text-slate-400 text-sm max-w-xs leading-relaxed">{message}</p>
    </div>
  );
}

export default function App() {
  const [query, setQuery]       = useState("");
  const [filters, setFilters]   = useState({ min_price: "", max_price: "" });
  const [results, setResults]   = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [lastQuery, setLastQuery]     = useState("");

  // Refs always hold the latest values — prevents stale-closure bug on filters
  const queryRef   = React.useRef(query);
  const filtersRef = React.useRef(filters);
  queryRef.current   = query;
  filtersRef.current = filters;

  const handleSearch = React.useCallback(async (overrideQuery) => {
    const q = (overrideQuery !== undefined ? overrideQuery : queryRef.current).trim();
    if (!q || q.length < 3) {
      setError("Please enter at least 3 characters to search.");
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);
    setLastQuery(q);

    const currentFilters = filtersRef.current;
    const payload = { query: q };
    const activeFilters = {};
    if (currentFilters.min_price) activeFilters.min_price = Number(currentFilters.min_price);
    if (currentFilters.max_price) activeFilters.max_price = Number(currentFilters.max_price);
    if (Object.keys(activeFilters).length > 0) payload.filters = activeFilters;

    try {
      const res = await fetch(`${API_BASE}/match`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Server error. Please try again.");
      }

      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      setError(err.message || "Failed to connect to the server. Make sure the backend is running.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen">

      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="border-b border-glass-border bg-glass-dark/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold gradient-text tracking-tight">AmalGus</h1>
            <p className="text-[10px] text-slate-500 leading-none">Smart Glass Marketplace</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              AI Matching Active
            </div>
            <span className="tag-pill bg-brand-900/40 text-brand-300 border border-brand-700/30 text-[11px]">
              15 Products
            </span>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-brand-900/30 border border-brand-700/40 rounded-full px-4 py-1.5 text-xs text-brand-300 mb-5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Powered by Hybrid AI Matching Engine
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
            Find the{" "}
            <span className="gradient-text">Perfect Glass</span>
            <br />for Your Project
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Describe your requirement in plain language. Our AI matches category, thickness,
            use-case, and features to surface the best products for you.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-3">
          <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} loading={loading} />
        </div>

        {/* Price Filter */}
        <div className="max-w-3xl mx-auto mb-8 px-1">
          <Filters filters={filters} onChange={setFilters} />
        </div>

        {/* Scoring legend */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500">
            {[
              { label: "Semantic",   pct: "50%", color: "#0ea5e9" },
              { label: "Category",   pct: "20%", color: "#6366f1" },
              { label: "Thickness",  pct: "15%", color: "#22c55e" },
              { label: "Keywords",   pct: "15%", color: "#f59e0b" },
            ].map(({ label, pct, color }) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                <span>{label} <span style={{ color }} className="font-semibold">{pct}</span></span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Results ──────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto">

          {/* Loading Skeletons */}
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="glass-card rounded-2xl p-5 animate-fade-in">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-red-400">Matching Error</p>
                  <p className="text-xs text-slate-400 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Initial empty state */}
          {!loading && !error && !hasSearched && (
            <EmptyState
              message="Enter your glass requirement above — describe category, thickness, use-case, or any feature. Our AI will find the best matches instantly."
              icon={
                <svg className="w-9 h-9 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
          )}

          {/* No results */}
          {!loading && !error && hasSearched && results.length === 0 && (
            <EmptyState
              message="No products matched your search. Try broadening your query or adjusting the price filter."
              icon={
                <svg className="w-9 h-9 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          )}

          {/* Results list */}
          {!loading && !error && results.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-400">
                  Showing <span className="text-white font-semibold">{results.length}</span> best matches
                  for <span className="text-brand-300 italic">"{lastQuery}"</span>
                </p>
                <span className="text-xs text-slate-600">Sorted by match score</span>
              </div>

              {results.map((result, i) => (
                <ResultCard
                  key={result.product.id}
                  result={result}
                  rank={i + 1}
                  style={{ animationDelay: `${i * 80}ms` }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="border-t border-glass-border mt-16 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>© 2025 AmalGus — Smart Glass Marketplace. Powered by Hybrid AI Matching.</p>
          <p>Scoring: 50% Semantic · 20% Category · 15% Thickness · 15% Keywords</p>
        </div>
      </footer>
    </div>
  );
}
