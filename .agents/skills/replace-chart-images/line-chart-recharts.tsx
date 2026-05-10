// Template: Line Chart (multi-series over time/sequence)

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const data = [
  { epoch: 1, modelA: 65.2, modelB: 60.1, modelC: 62.5 },
  { epoch: 2, modelA: 72.4, modelB: 68.3, modelC: 70.8 },
  { epoch: 3, modelA: 78.1, modelB: 74.5, modelC: 76.2 },
  { epoch: 4, modelA: 82.3, modelB: 79.8, modelC: 80.5 },
  { epoch: 5, modelA: 84.8, modelB: 82.6, modelC: 83.1 },
  { epoch: 6, modelA: 86.2, modelB: 84.1, modelC: 85.0 },
];

const SERIES = [
  { key: 'modelA', label: 'Model A', color: '#4A7BB8' },
  { key: 'modelB', label: 'Model B', color: '#C25767' },
  { key: 'modelC', label: 'Model C', color: '#5A9478' },
];

export function LineTrendChart() {
  return (
    <div style={{ width: '100%', height: 340 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 16, right: 24, bottom: 8, left: 16 }}
        >
          <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" />
          <XAxis
            dataKey="epoch"
            tick={{ fontSize: 11, fill: '#6B7280' }}
            axisLine={{ stroke: '#9CA3AF' }}
            tickLine={false}
            label={{
              value: 'Epoch',
              position: 'insideBottom',
              offset: -4,
              style: { fontSize: 12, fill: '#6B7280' },
            }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#6B7280' }}
            axisLine={{ stroke: '#9CA3AF' }}
            tickLine={false}
            label={{
              value: 'Accuracy (%)',
              angle: -90,
              position: 'insideLeft',
              style: { fontSize: 12, fill: '#6B7280', textAnchor: 'middle' },
            }}
          />
          <Tooltip
            contentStyle={{
              fontSize: 12,
              borderRadius: 6,
              border: '1px solid #E5E7EB',
            }}
            formatter={(v: number) => `${v.toFixed(2)}%`}
          />
          <Legend
            verticalAlign="top"
            align="center"
            wrapperStyle={{ fontSize: 12, paddingBottom: 12 }}
            iconType="line"
          />
          {SERIES.map(({ key, label, color }) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              name={label}
              stroke={color}
              strokeWidth={2.2}
              dot={{ r: 3, strokeWidth: 0, fill: color }}
              activeDot={{ r: 5, strokeWidth: 2, stroke: '#FFFFFF' }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
