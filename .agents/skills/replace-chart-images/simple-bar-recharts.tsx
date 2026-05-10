// Template: Simple Bar Chart (single series, multiple categories)

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, LabelList, ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Phương án A', value: 78.4 },
  { name: 'Phương án B', value: 85.2 },
  { name: 'Phương án C', value: 91.6 },
  { name: 'Phương án D', value: 88.3 },
];

const COLOR = '#4A7BB8';

export function SimpleBarChart() {
  const yMax = Math.ceil(Math.max(...data.map(d => d.value)) * 1.15 / 10) * 10;

  return (
    <div style={{ width: '100%', height: 320 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 28, right: 16, bottom: 8, left: 16 }}
          barCategoryGap="30%"
        >
          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E5E7EB" />
          <XAxis
            dataKey="name"
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
          <Bar dataKey="value" fill={COLOR} radius={[3, 3, 0, 0]}>
            <LabelList
              dataKey="value"
              position="top"
              fontSize={11}
              fontWeight={600}
              fill="#374151"
              formatter={(v: number) => v.toFixed(2)}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
