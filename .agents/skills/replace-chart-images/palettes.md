# Color Palettes

Pick ONE palette per chart. Don't mix.

## Monochromatic — for ordered series or academic feel

### Blue (recommended default for theses, academic)
```tsx
const COLORS = {
  dark:  '#0C447C',
  mid:   '#378ADD',
  light: '#B5D4F4',
};
```

### Slate (neutral, formal, business)
```tsx
const COLORS = {
  dark:  '#334155',
  mid:   '#64748B',
  light: '#CBD5E1',
};
```

### Emerald (growth, positive metrics)
```tsx
const COLORS = {
  dark:  '#065F46',
  mid:   '#10B981',
  light: '#A7F3D0',
};
```

## Categorical — for unrelated series (3–5 colors)

### Sage Elegant — recommended default for professional categorical
Equal saturation, equal lightness. They sit naturally beside each other.

```tsx
const PALETTE = [
  '#4A7BB8',  // denim blue
  '#C25767',  // dusty rose
  '#5A9478',  // sage green
  '#C9954A',  // warm ochre
  '#7E6BA8',  // muted purple
];
```

### Modern Flat — bright, dashboard-style
```tsx
const PALETTE = [
  '#3B82F6',  // blue-500
  '#EF4444',  // red-500
  '#10B981',  // emerald-500
  '#F59E0B',  // amber-500
  '#8B5CF6',  // violet-500
];
```

Use Modern Flat for dashboards, web apps, vibrant audiences.
Use Sage Elegant for thesis, reports, formal contexts.

### Dusty Pastel — soft, low-energy
```tsx
const PALETTE = [
  '#A5B4FC', '#FCA5A5', '#86EFAC', '#FCD34D', '#C4B5FD',
];
```

For presentations, infographics, audiences that want "friendly".

## Choosing based on the original chart

Look at the source image. If it used:

| Original look | Match with |
|---|---|
| Single dominant color (one hue) | Monochromatic ramp of that hue |
| Multiple unrelated colors | Categorical Sage Elegant |
| Dashboard / SaaS aesthetic | Modern Flat |
| Black and white / patterns | Monochromatic Slate |
| Pastel / friendly | Dusty Pastel |
| Saturated rainbow | Replace with Sage Elegant — rainbow is rarely a good choice |

If unsure, ask the user once with 2–3 concrete options.

## Things to never use

- Default Recharts colors (`#8884d8`, `#82ca9d`, `#ffc658`)
- Pure rainbow at full saturation
- Mixed saturation (one vivid + one washed-out in same chart)
- More than 5 distinct hues in one chart
