---
name: replace-chart-images
description: Use this skill when a React/Next.js codebase displays charts as imported static images (PNG, JPG, SVG screenshots from matplotlib, pgfplots, Excel, or thesis tools) and the user wants to replace those image imports with actual interactive React chart components. Triggers include user phrasing like "thay ảnh chart bằng React code", "redraw the imported chart images", "convert these PNG charts to Recharts", "vẽ lại các chart đang import bằng hình", "biểu đồ đang là ảnh, làm thành component đi", or showing a React file that has `import resultRq1 from './assets/...png'` followed by `<img src={resultRq1} />` with intent to upgrade. The skill handles the full flow: extracting data from chart images, picking the right chart component, generating Recharts code, and rewriting the JSX to swap `<img>` for `<ChartComponent />`.
---

# Replace Chart Images with React Components

This skill handles the specific task of replacing static chart images (`<img src={someChart} />`) in a React codebase with real, interactive Recharts components.

The starting state looks like this:

```tsx
import resultRq1 from './assets/result-rq1.png';
import resultRq2 from './assets/result-rq2.png';

<div className="grid grid-cols-2 gap-2">
  <img src={resultRq1} alt="Ket qua RQ1" className="w-full h-[160px] object-contain" />
  <img src={resultRq2} alt="Ket qua RQ2" className="w-full h-[160px] object-contain" />
</div>
```

The ending state should look like this:

```tsx
import { ResultRq1Chart } from './charts/ResultRq1Chart';
import { ResultRq2Chart } from './charts/ResultRq2Chart';

<div className="grid grid-cols-2 gap-3">
  <div className="rounded-md border border-gray-200 bg-white p-3">
    <ResultRq1Chart />
  </div>
  <div className="rounded-md border border-gray-200 bg-white p-3">
    <ResultRq2Chart />
  </div>
</div>
```

## When to use

Trigger this skill when:
- A React/Next.js file imports image files (`.png`, `.jpg`, `.svg`) and renders them as charts via `<img>`
- The user explicitly says "replace", "redraw", "vẽ lại", "convert to React", "make these real charts" about chart images
- Code review reveals chart images that should be interactive — and the user agrees to convert

Don't trigger for:
- Decorative images (logos, illustrations, photos) — those should stay as `<img>`
- Charts that are screenshots from external dashboards the user doesn't own the data for
- Diagrams (flowcharts, architecture) — those need a different tool (Mermaid, custom SVG), not Recharts

## The full workflow

### Step 1 — Inventory the chart images

Read the React file the user shared. List every chart image:

| Variable | Import path | Used in JSX | Container styling |
|---|---|---|---|
| `resultRq1` | `./assets/rq1.png` | line 14, `<img className="h-[160px]">` | grid-cols-2 cell |
| `resultRq2` | `./assets/rq2.png` | line 19, same | grid-cols-2 cell |
| `resultRq3` | `./assets/rq3.png` | line 24, `col-span-2` | full width row |

This table is the working plan. Confirm with the user before proceeding if anything is ambiguous (e.g., import path doesn't match an attached image).

### Step 2 — Get the source images

The user usually provides:
- **Image attached directly to the message** — easiest case, view it directly.
- **Image file in the codebase** — ask the user to attach it, or read from the path if available in `/mnt/user-data/uploads/`.
- **Just file paths** — ask the user to attach the actual image files; you cannot extract data from a path alone.

If the user attached one image but the file references three, ask which chart it corresponds to before guessing.

### Step 3 — Extract data from each image

For each chart image, look at it carefully and extract:

1. **Chart type** — bar, grouped bar, stacked bar, line, pie, scatter, etc.
2. **Categories** (x-axis labels) — exact text
3. **Series** (legend entries) — exact text
4. **Data values** — read every number visible. If labels are on bars, use those. If only y-axis ticks are visible, estimate to nearest tick mark and tell the user "values are approximate, please correct if exact numbers are needed".
5. **Axis titles** — exact text
6. **Color scheme used** — note original colors, but expect the user may want a new palette anyway

**Always print the extracted data table back to the user before generating code**, so they can correct misreads. Example:

> I extracted this from `result-rq1.png`. Please confirm or correct:
>
> | Metric | Static_SFR | Taint_SFR |
> |---|---|---|
> | Mã sạch | 15.9% | 9.4% |
> | Mã độc | 73.4% | 73.7% |

If user is in a hurry and says "just go", proceed but flag any unsure values in code comments: `// TODO: verify, hard to read from image`.

### Step 4 — Pick the right template

Map chart type to a template in `references/templates/`:

| Chart type | Template |
|---|---|
| Grouped bars (categories × series) | `grouped-bar-recharts.tsx` |
| Stacked bars (parts of whole per category) | `stacked-bar-recharts.tsx` |
| Single-series bars | `simple-bar-recharts.tsx` |
| Lines over time/sequence | `line-chart-recharts.tsx` |
| Horizontal bars (long labels, rankings) | `horizontal-bar-recharts.tsx` |
| Pie/donut (proportions, ≤5 segments) | `donut-recharts.tsx` |

If the chart is something else (radar, scatter, heatmap, mixed bar+line), tell the user no template matches and ask if they want a custom build.

### Step 5 — Generate the React component file

For each chart, create one file under `src/components/charts/` (or whatever convention the project uses — check the existing import paths first).

Naming: convert the image variable name to PascalCase + `Chart` suffix.
- `resultRq1` → `ResultRq1Chart.tsx`
- `accuracyComparison` → `AccuracyComparisonChart.tsx`

Each component file should:
1. Import only what's needed from `recharts`
2. Define the data inline as a `const` (not props) — these are static charts replacing static images, so inline data is fine and matches the original "static image" semantics
3. Apply visual rules from `references/visual-rules.md`:
   - Use vetted palette from `references/palettes.md`
   - Wrap in `ResponsiveContainer` with explicit height
   - Always set `domain={[0, yMax]}` with 15% headroom
   - Bold value labels, regular tick labels
   - Dashed horizontal-only gridlines
4. Export as named export: `export function ChartName() { ... }`

### Step 6 — Rewrite the JSX

Replace the original `<img>` tags with the new components. Preserve:
- Container layout classes (`grid`, `col-span-2`, etc.) — these stay
- Border / padding / rounded classes on the wrapper — these stay
- The grid structure overall

Remove:
- The `import xxx from './assets/xxx.png'` lines
- The `<img>` elements themselves
- The `h-[160px]` style — let the chart's `ResponsiveContainer` define height instead

Add:
- New import lines for the chart components
- `<ChartComponent />` in place of each `<img>`

**Increase chart heights** when swapping. Original images at `h-[160px]` were tiny and unreadable; real charts need ~`h-[320px]` minimum to render axes and labels properly. If the layout is `grid-cols-2`, this is fine — they'll be ~320px tall, full width per cell.

### Step 7 — Show the diff and the new files

Present the changes as:

1. **Modified file** — the original React component, with the JSX rewritten. Use a diff view if the user is comfortable with diffs; otherwise show the full new version highlighting what changed.
2. **New chart files** — one per chart, in the chart components folder.
3. **Cleanup note** — list the image files that are now unused and can be deleted from `assets/`. Do NOT delete them automatically; the user might want to keep them as fallback.
4. **Install command** if Recharts isn't already a dependency: `npm install recharts`. Check `package.json` if available before suggesting.

## Common situations

### The original image is unreadable

Numbers blurry, axes cut off, legend cropped. Don't guess — ask the user for the underlying data:

> The chart in `result-rq3.png` is too low-resolution to read the exact values. Could you share the data as a CSV/table, or a higher-res screenshot? Otherwise I'll create the component with placeholder values that you'll need to fill in.

### The image actually contains multiple charts

Sometimes one PNG has 4 subplots side by side. In this case:
- Either split into 4 separate React components and 4 grid cells
- Or build one `MultiChartPanel` component with sub-components

Ask the user which they prefer based on whether they want the subplots to be reusable independently.

### The user says "make them prettier" not just "redraw"

Then this skill applies, AND the user wants visual upgrades on top of conversion. Apply `references/visual-rules.md` aggressively. Don't just port the original look — improve it.

### The chart was generated by a Python script the user has access to

Ask if they want to share the script. Pulling exact data from `plt.bar(x, y)` calls is far more accurate than reading off the rendered image.

## Reference materials

- `references/visual-rules.md` — design rules (palettes, label placement, spacing)
- `references/palettes.md` — color palettes by use case
- `references/templates/` — Recharts template per chart type

## Things this skill explicitly avoids

- **Don't propose 3 alternative designs.** The user is converting existing charts — they want one good replacement, not a design exploration.
- **Don't change the data.** If the image showed `82.66%`, the new chart shows `82.66%`. Even if you suspect a typo. Ask before "fixing" data.
- **Don't add features the original didn't have** (animations, drill-downs, tooltips with extra metadata) unless the user asks. Keep parity, then improve aesthetics.
- **Don't delete the original image files** without explicit confirmation.
