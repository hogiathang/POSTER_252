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
    genie: '#0B2B61',
    staticSlicing: '#F97316',
    taintSlicing: '#10B981',
    baselineModel: '#60A5FA',
};

const data = [
    { name: 'Accuracy', GENIE: 48.68, 'Static Slicing': 75.65, 'Taint Slicing': 87.04, 'Baseline Model': 75.41 },
    { name: 'Precision', GENIE: 28.64, 'Static Slicing': 60.49, 'Taint Slicing': 72.9, 'Baseline Model': 55.52 },
    { name: 'Recall', GENIE: 46.07, 'Static Slicing': 95.98, 'Taint Slicing': 96.23, 'Baseline Model': 87.05 },
    { name: 'F1-Score', GENIE: 35.32, 'Static Slicing': 74.21, 'Taint Slicing': 83.32, 'Baseline Model': 67.8 },
];

export function ResultRq2Chart() {
    return (
        <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 24, right: 28, left: 0, bottom: 8 }}
                    barCategoryGap="6%"
                    barGap={2}
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
                    <Bar dataKey="GENIE" name="GENIE" fill={COLORS.genie} radius={[4, 4, 0, 0]}>
                        <LabelList
                            dataKey="GENIE"
                            position="top"
                            offset={8}
                            formatter={(value: number) => `${value.toFixed(2)}`}
                            style={{ fill: '#111827', fontSize: 10, fontWeight: 600 }}
                        />
                    </Bar>
                    <Bar dataKey="Static Slicing" name="Static Slicing" fill={COLORS.staticSlicing} radius={[4, 4, 0, 0]}>
                        <LabelList
                            dataKey="Static Slicing"
                            position="top"
                            offset={8}
                            formatter={(value: number) => `${value.toFixed(2)}`}
                            style={{ fill: '#111827', fontSize: 10, fontWeight: 600 }}
                        />
                    </Bar>
                    <Bar dataKey="Taint Slicing" name="Taint Slicing" fill={COLORS.taintSlicing} radius={[4, 4, 0, 0]}>
                        <LabelList
                            dataKey="Taint Slicing"
                            position="top"
                            offset={8}
                            formatter={(value: number) => `${value.toFixed(2)}`}
                            style={{ fill: '#111827', fontSize: 10, fontWeight: 600 }}
                        />
                    </Bar>
                    <Bar dataKey="Baseline Model" name="Baseline Model" fill={COLORS.baselineModel} radius={[4, 4, 0, 0]}>
                        <LabelList
                            dataKey="Baseline Model"
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