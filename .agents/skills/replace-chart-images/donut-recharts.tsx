// Template: Donut Chart with center label
// Use for: proportions of a whole, ≤5 segments

import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
} from 'recharts';

const data = [
  { name: 'Dữ liệu hợp lệ', value: 2537 },
  { name: 'Tệp rỗng',       value: 3436 },
  { name: 'Lỗi cấu trúc',   value: 1336 },
];

const COLORS = ['#0C447C', '#378ADD', '#B5D4F4'];

export function DatasetDonutChart() {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div style={{ width: '100%', height: 360, position: 'relative' }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="55%"
            outerRadius="80%"
            dataKey="value"
            stroke="#FFFFFF"
            strokeWidth={2}
            startAngle={90}
            endAngle={450}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              fontSize: 12,
              borderRadius: 6,
              border: '1px solid #E5E7EB',
            }}
            formatter={(v: number) =>
              `${v.toLocaleString()} (${((v / total) * 100).toFixed(1)}%)`
            }
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Center label */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 600, color: '#111827' }}>
          {total.toLocaleString()}
        </div>
        <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
          tổng số mẫu
        </div>
      </div>

      {/* Custom legend below */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 16,
          marginTop: 12,
        }}
      >
        {data.map((d, i) => (
          <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 2,
                background: COLORS[i],
              }}
            />
            <span style={{ color: '#374151' }}>{d.name}</span>
            <span style={{ color: '#6B7280' }}>
              ({((d.value / total) * 100).toFixed(1)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
