// Template: Stacked Bar Chart
// Use for: parts of a whole across categories
// (e.g. valid / empty / error files per dataset type)

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, LabelList, ResponsiveContainer,
} from 'recharts';

const data = [
  { category: 'Mẫu sạch',   valid: 1084, empty: 2158, error: 809 },
  { category: 'Mẫu mã độc', valid: 1453, empty: 1278, error: 527 },
];

// Bottom-to-top: dark to light. Most important segment at bottom.
const SERIES = [
  { key: 'valid', label: 'Dữ liệu hợp lệ', fill: '#0C447C', textColor: '#FFFFFF' },
  { key: 'empty', label: 'Tệp rỗng',       fill: '#378ADD', textColor: '#FFFFFF' },
  { key: 'error', label: 'Lỗi cấu trúc',   fill: '#B5D4F4', textColor: '#0C447C' },
];

export function ResultRq1Chart() {
  return (
    <div style={{ width: '100%', height: 380 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 16, right: 16, bottom: 8, left: 16 }}
          barCategoryGap="40%"
        >
          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E5E7EB" />
          <XAxis
            dataKey="category"
            tick={{ fontSize: 12, fontWeight: 600, fill: '#374151' }}
            axisLine={{ stroke: '#9CA3AF' }}
            tickLine={false}
            interval={0}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#6B7280' }}
            axisLine={{ stroke: '#9CA3AF' }}
            tickLine={false}
            label={{
              value: 'Số lượng mẫu',
              angle: -90,
              position: 'insideLeft',
              style: { fontSize: 12, fill: '#6B7280', textAnchor: 'middle' },
            }}
          />
          <Tooltip
            cursor={{ fill: 'rgba(0,0,0,0.04)' }}
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
          {SERIES.map(({ key, label, fill, textColor }) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="a"
              fill={fill}
              name={label}
            >
              <LabelList
                dataKey={key}
                position="center"
                fontSize={11}
                fontWeight={700}
                fill={textColor}
              />
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
