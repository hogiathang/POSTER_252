import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const COLORS = {
    mistral: '#8B5CF6',
    codellama: '#0B2B61',
    deepseek: '#06B6D4',
};

const data = [
    { name: 'Accuracy', 'Mistral-7B': 82.66, 'CodeLlama-7B': 85.71, 'DeepSeek-Coder-6.7B': 83.28 },
    { name: 'Precision', 'Mistral-7B': 82.36, 'CodeLlama-7B': 92.26, 'DeepSeek-Coder-6.7B': 83.09 },
    { name: 'Recall', 'Mistral-7B': 88.67, 'CodeLlama-7B': 88.88, 'DeepSeek-Coder-6.7B': 88.88 },
    { name: 'F1-Score', 'Mistral-7B': 85.4, 'CodeLlama-7B': 90.54, 'DeepSeek-Coder-6.7B': 85.89 },
];

export function ResultRq3Chart() {
    return (
        <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 24, right: 24, left: 0, bottom: 8 }}
                    barCategoryGap="10%"
                    barGap={3}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 11 }} />
                    <YAxis
                        tick={{ fill: '#6B7280', fontSize: 11 }}
                        domain={[0, 100]}
                        label={{ value: 'Score (%)', angle: -90, position: 'insideLeft', style: { fill: '#6B7280', fontSize: 11 } }}
                    />
                    <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                    <Legend wrapperStyle={{ paddingTop: 4 }} />
                    <Bar dataKey="Mistral-7B" name="Mistral-7B" fill={COLORS.mistral} radius={[4, 4, 0, 0]}>
                        <LabelList
                            dataKey="Mistral-7B"
                            position="top"
                            offset={8}
                            formatter={(value: number) => `${value.toFixed(2)}`}
                            style={{ fill: '#111827', fontSize: 10, fontWeight: 600 }}
                        />
                    </Bar>
                    <Bar dataKey="CodeLlama-7B" name="CodeLlama-7B" fill={COLORS.codellama} radius={[4, 4, 0, 0]}>
                        <LabelList
                            dataKey="CodeLlama-7B"
                            position="top"
                            offset={8}
                            formatter={(value: number) => `${value.toFixed(2)}`}
                            style={{ fill: '#111827', fontSize: 10, fontWeight: 600 }}
                        />
                    </Bar>
                    <Bar dataKey="DeepSeek-Coder-6.7B" name="DeepSeek-Coder-6.7B" fill={COLORS.deepseek} radius={[4, 4, 0, 0]}>
                        <LabelList
                            dataKey="DeepSeek-Coder-6.7B"
                            position="top"
                            offset={8}
                            formatter={(value: number) => `${value.toFixed(2)}`}
                            style={{ fill: '#111827', fontSize: 10, fontWeight: 600 }}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}