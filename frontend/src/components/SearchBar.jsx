import React from "react";

const EXAMPLE_QUERIES = [
  "6mm tempered glass for office partition",
  "energy efficient double glazed window for cold climate",
  "acoustic laminated glass for recording studio",
  "balcony railing 8mm safety glass",
  "fire rated glass for emergency stairwell",
  "frosted privacy glass for bathroom",
];

export default function SearchBar({ query, setQuery, onSearch, loading }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) onSearch();
  };

  const fillExample = (q) => {
    setQuery(q);
    setTimeout(() => onSearch(q), 50);
  };

  return (
    <div className="space-y-4">
      {/* Main Search Input */}
      <div className="search-glow relative flex items-center gap-3 glass-card rounded-2xl p-2 transition-all duration-300">
        <div className="flex-shrink-0 pl-3">
          <svg className="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          id="search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Describe your glass requirement... e.g. "6mm tempered glass for office partition"'
          className="flex-1 bg-transparent text-slate-100 text-sm placeholder-slate-600
                     focus:outline-none py-3 pr-2"
          autoComplete="off"
        />

        {query && (
          <button
            id="search-clear"
            onClick={() => setQuery("")}
            className="flex-shrink-0 text-slate-600 hover:text-slate-300 transition-colors p-1 mr-1"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <button
          id="search-submit"
          onClick={() => onSearch()}
          disabled={loading || !query.trim()}
          className="btn-primary flex-shrink-0 flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:filter-none"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Matching...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Find Match
            </>
          )}
        </button>
      </div>

      {/* Example Queries */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-slate-600 font-medium self-center">Try:</span>
        {EXAMPLE_QUERIES.map((q, i) => (
          <button
            key={i}
            id={`example-query-${i}`}
            onClick={() => fillExample(q)}
            className="text-xs text-slate-400 border border-glass-border hover:border-brand-400
                       hover:text-brand-400 rounded-full px-3 py-1.5 transition-all duration-200
                       hover:bg-brand-900/20"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
