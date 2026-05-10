# Recharts Patterns thường dùng

## Pattern 1 — Grouped Bar Chart với data labels

Dùng cho chart so sánh nhiều series trên cùng category (ví dụ: Accuracy/Precision/Recall/F1 cho 3 model).

```jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LabelList, ResponsiveContainer } from 'recharts';

const data = [
  { metric: 'Accuracy',  modelA: 82.66, modelB: 85.71, modelC: 83.28 },
  { metric: 'Precision', modelA: 82.36, modelB: 92.26, modelC: 83.09 },
  // ...
];

<ResponsiveContainer width="100%" height={400}>
  <BarChart data={data} margin={{ top: 30, right: 20, left: 10, bottom: 5 }}>
    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
    <XAxis dataKey="metric" tick={{ fontSize: 13, fill: '#374151' }} />
    <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#6b7280' }}
           label={{ value: 'Hiệu năng (%)', angle: -90, position: 'insideLeft', style: { fontSize: 13 } }} />
    <Legend wrapperStyle={{ paddingBottom: 10 }} />
    <Bar dataKey="modelA" name="Model A" fill="#5b7fb8">
      <LabelList dataKey="modelA" position="top" style={{ fontSize: 11, fontWeight: 600, fill: '#1f2937' }} />
    </Bar>
    <Bar dataKey="modelB" name="Model B" fill="#c55a5a">
      <LabelList dataKey="modelB" position="top" style={{ fontSize: 11, fontWeight: 600, fill: '#1f2937' }} />
    </Bar>
    {/* ... */}
  </BarChart>
</ResponsiveContainer>
```

Lưu ý:
- `margin.top: 30` để label "X.XX" không bị cắt phía trên.
- `vertical={false}` cho grid đỡ rối.
- KHÔNG include `<Tooltip />` nếu user yêu cầu non-interactive.

## Pattern 2 — Bar đơn giản 2 series, 2 category

Loại chart so sánh "Mã sạch / Mã độc" với 2 phương pháp Static_SFR / Taint_SFR.

```jsx
const data = [
  { label: 'Mã sạch', static_sfr: 15.9, taint_sfr: 9.4 },
  { label: 'Mã độc',  static_sfr: 73.4, taint_sfr: 73.7 },
];

// Bar component giống pattern 1, chỉ khác:
// - 2 Bar series
// - YAxis domain [0, 90] hoặc tự động
// - LabelList formatter={(v) => `${v}%`}
```

## Pattern 3 — Nhãn % với formatter

```jsx
<LabelList dataKey="value" position="top"
  formatter={(v) => `${v.toFixed(1)}%`}
  style={{ fontSize: 11, fontWeight: 600 }} />
```

## Pattern 4 — Card wrapper

Mỗi chart bọc trong:
```jsx
<div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
  <ResponsiveContainer ...>
    {/* chart */}
  </ResponsiveContainer>
</div>
```

## Pattern 5 — Layout 2-trên / 1-dưới

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="bg-white rounded-lg border p-4"> {/* chart 1 */} </div>
  <div className="bg-white rounded-lg border p-4"> {/* chart 2 */} </div>
  <div className="md:col-span-2 bg-white rounded-lg border p-4"> {/* chart 3 fullwidth */} </div>
</div>
```

## Bug thường gặp

1. **Label bị cắt** → tăng `margin.top` lên 30–40, hoặc tăng `YAxis domain` max thêm 10–15%.
2. **Bar quá hẹp** → giảm số series hoặc set `barCategoryGap="20%"`.
3. **Legend chèn vào chart** → set `<Legend wrapperStyle={{ paddingBottom: 10 }} verticalAlign="top" />`.
4. **Số decimal lệch** → dùng `formatter={(v) => Number(v).toFixed(2)}` để đồng nhất.