# AmalGus — Smart Product Discovery & Intelligent Matching

> A production-quality MVP for a glass marketplace with a **Hybrid AI Matching Engine** that scores products across semantic similarity, category, thickness, and keyword dimensions.

---

## Quick Start

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### 1. Start Backend

```bash
cd backend
npm install
npm start
# API running at http://localhost:5001
```

### 2. Start Frontend (new terminal)

```bash
cd frontend
npm install
npm run dev
# UI running at http://localhost:5173
```

Open **http://localhost:5173** in your browser and start searching!

---

## Matching Logic

### Hybrid Scoring Formula

```
Final Score = (0.5 × Semantic) + (0.2 × Category) + (0.15 × Thickness) + (0.15 × Keywords)
```

All components scored 0–100. Final score normalized to 0–100.

---

### Component Breakdown

#### 1. Semantic Similarity (50% weight)
- **Method**: TF-IDF vector + Cosine Similarity (no external API needed)
- A shared vocabulary is built from the query + all product descriptions
- Each text is represented as a term-frequency vector
- Cosine similarity between query vector and product vector gives semantic score
- Scaled to 0–100

#### 2. Category Match (20% weight)
- Query is parsed for category keywords using alias dictionaries
- Exact category match → **100**
- No category detected in query → **30** (neutral)
- Category mismatch → **0**

#### 3. Thickness Match (15% weight)
- Extracts numeric mm value from query (regex: `/(\d+(?:\.\d+)?)\s*mm/`)
- Exact match → **100** | Within ±2mm → **70** | Within ±4mm → **40** | Beyond → **0**
- No thickness in query → **50** (neutral)

#### 4. Keyword / Use-Case Match (15% weight)
- Tokenizes product's use_cases, features, description, coating into a word set
- Score = `(overlap count / total query tokens) × 100`

---

### Explanation Generation Rules
1. Always mentions thickness, category, use-case, and feature — at least 3 attributes
2. Always specific (actual mm value, actual use cases, supplier + price)
3. Never generic sentences

---

### Fallback System
- Matching engine uses pure in-memory JS — never throws on empty inputs
- UI shows clear error if server unreachable
- Category/thickness/keyword scoring runs independently of semantic similarity

---

## API Reference

### `POST /match`

**Request:**
```json
{
  "query": "6mm tempered glass for office partition",
  "filters": { "category": "tempered", "max_price": 10000 }
}
```

**Response:**
```json
{
  "query": "...",
  "results": [{
    "product": { ... },
    "match_score": 87,
    "explanation": "Matches your requirement — exact 6mm thickness match, confirmed tempered category...",
    "score_breakdown": { "semantic": 74, "category": 100, "thickness": 100, "keyword": 65 }
  }],
  "total_matched": 5
}
```

### `GET /products`
Returns all 15 products in the catalog.

---

## Trade-offs

| Decision | Trade-off |
|----------|-----------|
| **No database** | All products in-memory JSON. Fast, no setup, doesn't scale beyond ~1000 products. |
| **Approximate scoring** | TF-IDF cosine is a proxy for true semantic similarity. Real embeddings (OpenAI, Sentence-BERT) would be more accurate but require API keys and add latency. |
| **No vector DB** | For 15 products, full O(n) scan is faster than Pinecone overhead. |
| **Hand-crafted aliases** | Good domain coverage for glass, misses edge cases. |

---

## AI Tools Used

| Tool | Purpose |
|------|---------|
| **TF-IDF + Cosine Similarity** | Simulated semantic similarity — no external API |
| **Regex NLP** | Thickness extraction (`/(\d+(?:\.\d+)?)\s*mm/`) |
| **Alias Dictionary Matching** | Category + use-case + feature extraction |
| **Rule-based Explanation Generator** | Specific, attribute-rich match explanations |

> No OpenAI/Gemini embeddings used — TF-IDF delivers deterministic, fast, reliable scoring with zero API dependencies, ideal for a 2.5-hour MVP deadline.

---

## Project Structure

```
AmalGus/
├── backend/
│   ├── server.js          # Express API
│   ├── package.json
│   ├── data/products.json # 15 glass products
│   └── engine/matcher.js  # Hybrid scoring engine
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── src/
│       ├── App.jsx
│       ├── index.css
│       └── components/
│           ├── SearchBar.jsx
│           ├── Filters.jsx
│           ├── ResultCard.jsx
│           └── ScoreBadge.jsx
└── README.md
```