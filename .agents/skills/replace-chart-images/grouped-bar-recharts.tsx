// Template: Grouped Bar Chart
// Replace `data`, `SERIES`, axis labels, and component name for each use.

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, LabelList, ResponsiveContainer,
} from 'recharts';

const data = [
  { metric: 'Accuracy',  Mistral: 82.66, CodeLlama: 85.71, DeepSeek: 83.28 },
  { metric: 'Precision', Mistral: 82.36, CodeLlama: 92.26, DeepSeek: 83.09 },
  { metric: 'Recall',    Mistral: 88.67, CodeLlama: 88.88, DeepSeek: 88.88 },
  { metric: 'F1-Score',  Mistral: 85.40, CodeLlama: 90.54, DeepSeek: 85.89 },
];

const SERIES = [
  { key: 'Mistral',   label: 'Mistral-7B',           color: '#4A7BB8' },
  { key: 'CodeLlama', label: 'CodeLlama-7B',         color: '#C25767' },
  { key: 'DeepSeek',  label: 'DeepSeek-Coder-6.7B',  color: '#5A9478' },
];

export function ResultRq3Chart() {
  const allValues = data.flatMap(d => SERIES.map(s => d[s.key as keyof typeof d] as number));
  const yMax = Math.ceil(Math.max(...allValues) * 1.15 / 10) * 10;

  return (
    <div style={{ width: '100%', height: 380 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 28, right: 16, bottom: 8, left: 16 }}
          barGap={4}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E5E7EB" />
          <XAxis
            dataKey="metric"
            tick={{ fontSize: 12, fill: '#374151' }}
            axisLine={{ stroke: '#9CA3AF' }}
            tickLine={false}
            interval={0}
          />
          <YAxis
            domain={[0, yMax]}
            tick={{ fontSize: 11, fill: '#6B7280' }}
            axisLine={{ stroke: '#9CA3AF' }}
            tickLine={false}
            label={{
              value: 'Hiệu năng (%)',
              angle: -90,
              position: 'insideLeft',
              style: { fontSize: 12, fill: '#6B7280', textAnchor: 'middle' },
            }}
          />
          <Tooltip
            cursor={{ fill: 'rgba(0,0,0,0.04)' }}
            formatter={(v: number) => `${v.toFixed(2)}%`}
            contentStyle={{
              fontSize: 12,
              borderRadius: 6,
              border: '1px solid #E5E7EB',
            }}
          />
          <Legend
            verticalAlign="top"
            align="center"
            wrapperStyle={{ fontSize: 12, paddingBottom: 12 }}
            iconType="rect"
            iconSize={12}
          />
          {SERIES.map(({ key, label, color }) => (
            <Bar
              key={key}
              dataKey={key}
              name={label}
              fill={color}
              radius={[3, 3, 0, 0]}
            >
              <LabelList
                dataKey={key}
                position="top"
                fontSize={10}
                fontWeight={600}
                fill="#374151"
                formatter={(v: number) => v.toFixed(2)}
              />
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
