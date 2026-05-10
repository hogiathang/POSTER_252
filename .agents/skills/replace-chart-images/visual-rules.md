# Visual Rules for Chart Components

Rules to apply when generating any Recharts component in this skill. These exist to make the output look polished, not "default Recharts".

## Container

Always wrap the chart in:

```tsx
<div style={{ width: '100%', height: 360 }}>
  <ResponsiveContainer>
    {/* chart here */}
  </ResponsiveContainer>
</div>
```

Default height by chart type:
- Grouped/stacked bar: 360–400px
- Single-series bar: 320px
- Line chart: 320–360px
- Horizontal bar: `Math.max(240, data.length * 48)`
- Donut: 320px

Width: always `100%`. Let the parent grid/flex container determine actual width.

## Margins

Default margins for vertical charts:

```tsx
margin={{ top: 24, right: 16, bottom: 8, left: 16 }}
```

Bump `top` to 32 if value labels sit above bars (need clearance).
Bump `left` to 24 if y-axis label is rotated and long.

## Y-axis

Always compute headroom for top labels:

```tsx
const max = Math.max(...allValues);
const yMax = Math.ceil(max * 1.15 / 10) * 10;  // round to nearest 10
<YAxis domain={[0, yMax]} />
```

Tick formatting:

```tsx
<YAxis
  domain={[0, yMax]}
  tick={{ fontSize: 11, fill: '#6B7280' }}
  axisLine={{ stroke: '#9CA3AF' }}
  tickLine={false}
/>
```

Always include 0 unless the user asks for a zoomed view.

## X-axis

```tsx
<XAxis
  dataKey="category"
  tick={{ fontSize: 12, fill: '#374151' }}
  axisLine={{ stroke: '#9CA3AF' }}
  tickLine={false}
  interval={0}  // show every category label
/>
```

Only rotate labels (`angle={-30}`) when they genuinely overflow horizontally. Test with the longest label first.

## Gridlines

Horizontal only, dashed, very subtle:

```tsx
<CartesianGrid
  strokeDasharray="4 4"
  vertical={false}
  stroke="#E5E7EB"
/>
```

Never draw vertical gridlines on the category axis for bar charts.

## Tooltip

```tsx
<Tooltip
  cursor={{ fill: 'rgba(0,0,0,0.04)' }}
  contentStyle={{
    fontSize: 12,
    borderRadius: 6,
    border: '1px solid #E5E7EB',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  }}
  formatter={(v) => `${v.toFixed(2)}%`}  // adjust by domain
/>
```

## Legend

Top-aligned, rectangle icons (matches the bars), small font:

```tsx
<Legend
  verticalAlign="top"
  align="center"
  wrapperStyle={{ fontSize: 12, paddingBottom: 12 }}
  iconType="rect"
  iconSize={12}
/>
```

For 1-series charts, omit the legend entirely.

## Bar styling

```tsx
<Bar
  dataKey="value"
  fill={COLORS.primary}
  radius={[3, 3, 0, 0]}  // light rounding only on top
>
  <LabelList
    dataKey="value"
    position="top"
    fontSize={11}
    fontWeight={600}
    fill="#374151"
    formatter={(v) => v.toFixed(2)}
  />
</Bar>
```

For grouped bars (multiple series side by side):

```tsx
<BarChart barGap={4} barCategoryGap="20%">
```

If labels overlap (similar values), increase `barGap` to 8 or use `position="insideTop"` with white text.

## Stacked bar label colors

When putting labels inside stacked segments, the text color depends on the segment's fill brightness:

```tsx
const SERIES = [
  { key: 'valid', label: 'Valid', fill: '#0C447C', textColor: '#FFFFFF' },  // dark fill, white text
  { key: 'empty', label: 'Empty', fill: '#378ADD', textColor: '#FFFFFF' },  // mid fill, white text
  { key: 'error', label: 'Error', fill: '#B5D4F4', textColor: '#0C447C' },  // light fill, dark text
];
```

This is critical — white text on a light blue segment is invisible.

## Line chart styling

```tsx
<Line
  type="monotone"
  dataKey="value"
  stroke={COLORS.primary}
  strokeWidth={2.2}
  dot={{ r: 3, strokeWidth: 0, fill: COLORS.primary }}
  activeDot={{ r: 5, strokeWidth: 2, stroke: '#FFFFFF' }}
/>
```

Don't use `type="linear"` unless data is genuinely discrete steps. `monotone` looks smoother.

## Typography hierarchy

In one chart, only ONE thing should be bold: the value labels on the bars (or the focal data point).

| Element | Weight | Size |
|---|---|---|
| Value labels on bars | 600 (semibold) | 11 |
| Category axis labels | 500 (medium) | 12 |
| Y-axis tick labels | 400 (regular) | 11 |
| Axis titles | 400 (regular) | 12 |
| Legend | 400 (regular) | 12 |
| Tooltip text | 400 (regular) | 12 |

Never make everything bold. Visual hierarchy gets destroyed.

## Animation

```tsx
<Bar isAnimationActive={true} animationDuration={500} />
```

500–700ms is enough. Anything longer feels sluggish on re-render.

## What never to do

- Default Recharts colors (`#8884d8`, `#82ca9d`) — instant tell of unstyled chart
- Drop shadows on bars
- 3D effects
- Gradient fills on bars (only OK for area charts where gradient communicates magnitude)
- Rounded corners > radius 4 on bars
- Pie chart with > 5 segments — use horizontal bar instead
- Bar chart taller than wide
