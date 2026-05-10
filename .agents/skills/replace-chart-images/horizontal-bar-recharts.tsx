// Template: Horizontal Bar Chart
// Use for: long category names, rankings/leaderboards

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, LabelList, ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'CodeLlama-7B-Instruct', score: 90.54 },
  { name: 'DeepSeek-Coder-6.7B',   score: 85.89 },
  { name: 'Mistral-7B-v0.3',       score: 85.40 },
  { name: 'Llama-2-7B-Chat',       score: 78.21 },
  { name: 'Phi-2',                 score: 72.05 },
].sort((a, b) => b.score - a.score);

const COLOR = '#4A7BB8';

export function HorizontalRankChart() {
  const max = Math.max(...data.map(d => d.score));
  const xMax = Math.ceil(max * 1.15 / 10) * 10;

  return (
    <div style={{ width: '100%', height: Math.max(240, data.length * 48) }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 8, right: 56, bottom: 8, left: 8 }}
        >
          <CartesianGrid strokeDasharray="4 4" horizontal={false} stroke="#E5E7EB" />
          <XAxis
            type="number"
            domain={[0, xMax]}
            tick={{ fontSize: 11, fill: '#6B7280' }}
            axisLine={{ stroke: '#9CA3AF' }}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 12, fill: '#374151' }}
            axisLine={{ stroke: '#9CA3AF' }}
            tickLine={false}
            width={180}
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
          <Bar
            dataKey="score"
            fill={COLOR}
            radius={[0, 4, 4, 0]}
            barSize={22}
          >
            <LabelList
              dataKey="score"
              position="right"
              fontSize={11}
              fontWeight={600}
              fill="#374151"
              formatter={(v: number) => `${v.toFixed(2)}%`}
              offset={6}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
