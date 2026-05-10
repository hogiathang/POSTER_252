import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LabelList,
  ResponsiveContainer,
} from 'recharts';

const COLORS = {
  static_sfr: '#1e3a8a',
  taint_sfr: '#3b82f6',
  ccmd: '#3a4f73',
  static_slicing: '#f0932b',
  taint_slicing: '#e74c3c',
  baseline_model: '#3aa6a0',
  mistral: '#5b7fb8',
  codellama: '#c55a5a',
  deepseek: '#a3c585',
};

const labelStyle = { fontSize: 11, fontWeight: 600, fill: '#1f2937' };

const chart1Data = [
  { label: 'Mã sạch', static_sfr: 15.9, taint_sfr: 9.4 },
  { label: 'Mã độc',  static_sfr: 73.4, taint_sfr: 73.7 },
];

const chart2Data = [
  { metric: 'Accuracy',  ccmd: 66.66, static_slicing: 75.60, taint_slicing: 81.94, baseline_model: 75.45 },
  { metric: 'Precision', ccmd: 26.69, static_slicing: 50.49, taint_slicing: 72.60, baseline_model: 58.52 },
  { metric: 'Recall',    ccmd: 46.50, static_slicing: 95.30, taint_slicing: 96.21, baseline_model: 87.05 },
  { metric: 'F1-Score',  ccmd: 35.10, static_slicing: 64.91, taint_slicing: 83.16, baseline_model: 67.00 },
];

const chart3Data = [
  { metric: 'Accuracy',  mistral: 82.66, codellama: 85.71, deepseek: 83.28 },
  { metric: 'Precision', mistral: 82.36, codellama: 92.26, deepseek: 83.09 },
  { metric: 'Recall',    mistral: 88.67, codellama: 88.88, deepseek: 88.88 },
  { metric: 'F1-Score',  mistral: 85.40, codellama: 90.54, deepseek: 85.89 },
];

function Chart1() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={chart1Data} margin={{ top: 30, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 13, fill: '#374151' }} />
          <YAxis
            domain={[0, 90]}
            ticks={[0, 15, 30, 45, 60, 75, 90]}
            tick={{ fontSize: 11, fill: '#6b7280' }}
            label={{ value: 'Tỷ lệ giữ lại (%)', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#374151' } }}
          />
          <Legend wrapperStyle={{ paddingBottom: 8, fontSize: 12 }} verticalAlign="top" align="left" />
          <Bar dataKey="static_sfr" name="Static_SFR" fill={COLORS.static_sfr} maxBarSize={70}>
            <LabelList dataKey="static_sfr" position="top" formatter={(v) => `${v}%`} style={labelStyle} />
          </Bar>
          <Bar dataKey="taint_sfr" name="Taint_SFR" fill={COLORS.taint_sfr} maxBarSize={70}>
            <LabelList dataKey="taint_sfr" position="top" formatter={(v) => `${v}%`} style={labelStyle} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function Chart2() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={chart2Data} margin={{ top: 30, right: 20, left: 10, bottom: 5 }} barCategoryGap="18%">
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis dataKey="metric" tick={{ fontSize: 12, fill: '#374151' }} />
          <YAxis
            domain={[0, 110]}
            ticks={[0, 20, 40, 60, 80, 100]}
            tick={{ fontSize: 11, fill: '#6b7280' }}
            label={{ value: 'Hiệu năng (%)', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#374151' } }}
          />
          <Legend wrapperStyle={{ paddingBottom: 8, fontSize: 11 }} verticalAlign="top" />
          <Bar dataKey="ccmd" name="CCMD" fill={COLORS.ccmd}>
            <LabelList dataKey="ccmd" position="top" style={{ ...labelStyle, fontSize: 9 }} />
          </Bar>
          <Bar dataKey="static_slicing" name="Static Slicing" fill={COLORS.static_slicing}>
            <LabelList dataKey="static_slicing" position="top" style={{ ...labelStyle, fontSize: 9 }} />
          </Bar>
          <Bar dataKey="taint_slicing" name="Taint Slicing" fill={COLORS.taint_slicing}>
            <LabelList dataKey="taint_slicing" position="top" style={{ ...labelStyle, fontSize: 9 }} />
          </Bar>
          <Bar dataKey="baseline_model" name="Baseline Model" fill={COLORS.baseline_model}>
            <LabelList dataKey="baseline_model" position="top" style={{ ...labelStyle, fontSize: 9 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function Chart3() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <ResponsiveContainer width="100%" height={420}>
        <BarChart data={chart3Data} margin={{ top: 30, right: 30, left: 20, bottom: 10 }} barCategoryGap="22%">
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis dataKey="metric" tick={{ fontSize: 14, fill: '#374151' }} />
          <YAxis
            domain={[0, 110]}
            ticks={[0, 20, 40, 60, 80, 100]}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            label={{ value: 'Hiệu năng (%)', angle: -90, position: 'insideLeft', style: { fontSize: 13, fill: '#374151' } }}
          />
          <Legend wrapperStyle={{ paddingBottom: 12, fontSize: 13 }} verticalAlign="top" />
          <Bar dataKey="mistral" name="Mistral-7B" fill={COLORS.mistral}>
            <LabelList dataKey="mistral" position="top" style={{ ...labelStyle, fontSize: 12 }} />
          </Bar>
          <Bar dataKey="codellama" name="CodeLlama-7B" fill={COLORS.codellama}>
            <LabelList dataKey="codellama" position="top" style={{ ...labelStyle, fontSize: 12 }} />
          </Bar>
          <Bar dataKey="deepseek" name="DeepSeek-Coder-6.7B" fill={COLORS.deepseek}>
            <LabelList dataKey="deepseek" position="top" style={{ ...labelStyle, fontSize: 12 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function ExperimentResults() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-900 text-white font-bold text-2xl w-12 h-12 flex items-center justify-center rounded">
            5
          </div>
          <h1 className="text-2xl font-bold text-blue-900">Kết quả thực nghiệm</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Chart1 />
          <Chart2 />
          <div className="md:col-span-2">
            <Chart3 />
          </div>
        </div>
      </div>
    </div>
  );
}
