# Example: Before & After

This is a worked example of the full conversion flow. Reference it when applying the skill to confirm the output structure matches.

## BEFORE

User's original component (`src/sections/ResultsSection.tsx`):

```tsx
import resultRq1 from '@/assets/charts/result-rq1.png';
import resultRq2 from '@/assets/charts/result-rq2.png';
import resultRq3 from '@/assets/charts/result-rq3.png';

export function ResultsSection() {
  return (
    <section className="bg-white border border-[#E5E7EB] rounded-md p-5 relative z-10">
      <div className="flex items-center gap-3 mb-3 pb-2 border-b border-[#E5E7EB]">
        <div className="w-10 h-10 rounded bg-[#0B2B61] text-white font-bold text-lg flex items-center justify-center">
          5
        </div>
        <h2 className="text-2xl font-bold text-[#0B2B61]">Kết quả thực nghiệm</h2>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="overflow-hidden rounded-md border border-[#E5E7EB] bg-white">
          <img src={resultRq1} alt="Ket qua RQ1" className="w-full h-[160px] object-contain" />
        </div>
        <div className="overflow-hidden rounded-md border border-[#E5E7EB] bg-white">
          <img src={resultRq2} alt="Ket qua RQ2" className="w-full h-[160px] object-contain" />
        </div>
        <div className="col-span-2 overflow-hidden rounded-md border border-[#E5E7EB] bg-white flex justify-center">
          <img src={resultRq3} alt="Ket qua RQ3" className="w-full max-w-[92%] h-[160px] object-contain" />
        </div>
      </div>
    </section>
  );
}
```

User attaches:
- `result-rq1.png` — stacked bar showing dataset breakdown
- `result-rq2.png` — grouped bar comparing 2 SFR methods on 2 sample types
- `result-rq3.png` — grouped bar comparing 3 LLMs on 4 metrics

## AFTER

### File 1: `src/components/charts/ResultRq1Chart.tsx` (new)

Stacked bar — content from `references/templates/stacked-bar-recharts.tsx`, with data extracted from the image.

### File 2: `src/components/charts/ResultRq2Chart.tsx` (new)

Grouped bar with 2 series (Static_SFR, Taint_SFR), 2 categories (Mã sạch, Mã độc), monochromatic blue.

### File 3: `src/components/charts/ResultRq3Chart.tsx` (new)

Grouped bar with 3 series (3 LLMs), 4 categories (metrics), Sage Elegant palette.

### File 4: `src/sections/ResultsSection.tsx` (modified)

```tsx
import { ResultRq1Chart } from '@/components/charts/ResultRq1Chart';
import { ResultRq2Chart } from '@/components/charts/ResultRq2Chart';
import { ResultRq3Chart } from '@/components/charts/ResultRq3Chart';

export function ResultsSection() {
  return (
    <section className="bg-white border border-[#E5E7EB] rounded-md p-5 relative z-10">
      <div className="flex items-center gap-3 mb-3 pb-2 border-b border-[#E5E7EB]">
        <div className="w-10 h-10 rounded bg-[#0B2B61] text-white font-bold text-lg flex items-center justify-center">
          5
        </div>
        <h2 className="text-2xl font-bold text-[#0B2B61]">Kết quả thực nghiệm</h2>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-md border border-[#E5E7EB] bg-white p-3">
          <ResultRq1Chart />
        </div>
        <div className="rounded-md border border-[#E5E7EB] bg-white p-3">
          <ResultRq2Chart />
        </div>
        <div className="col-span-2 rounded-md border border-[#E5E7EB] bg-white p-3">
          <ResultRq3Chart />
        </div>
      </div>
    </section>
  );
}
```

## Key changes summary (what the agent should report back to the user)

1. Created 3 new files under `src/components/charts/`
2. Removed image imports from `ResultsSection.tsx`
3. Replaced `<img>` tags with chart components
4. Increased grid gap from `gap-2` to `gap-3` for breathing room
5. Removed `overflow-hidden` and inner `h-[160px]` — let chart components manage their own height (380/400px each)
6. Added `p-3` padding to chart card wrappers
7. Removed `max-w-[92%]` on the full-width chart (let it use full width naturally)

Unused image files (safe to delete after verification):
- `src/assets/charts/result-rq1.png`
- `src/assets/charts/result-rq2.png`
- `src/assets/charts/result-rq3.png`

If `recharts` not yet installed: `npm install recharts`
