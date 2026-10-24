# Lexora – Practice First

Hindi → English practice app (Collocations, Connectors, Idioms, Phrasal Verbs).

## Features
- Practice-First view: Hindi shown first, English + examples hidden until you reveal
- Every item has at least 3 clear examples
- Mark as Weak / Semi Weak / Mastered (progress saved in localStorage)
- Side list of remaining items with status dots
- Search, Shuffle, filters, and classic list view

## Run
```bash
npm install
npm run dev
```
Open http://localhost:5173

## Replace data
Edit the `DATA` object at the top of `src/App.jsx`.
Each item must look like:
```js
{
  hindi: "...",
  english: "...",
  examples: ["example 1", "example 2", "example 3"]
}
```
