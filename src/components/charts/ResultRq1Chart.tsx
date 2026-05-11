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
    staticSfr: '#0B2B61',
    taintSfr: '#4F8EF7',
};

const data = [
    { name: 'Mã sạch', Static_SFR: 15.9, Taint_SFR: 9.4 },
    { name: 'Mã độc', Static_SFR: 73.4, Taint_SFR: 73.7 },
];

export function ResultRq1Chart() {
    return (
        <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 24, right: 24, left: 0, bottom: 8 }} barCategoryGap="25%">
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 11 }} />
                    <YAxis
                        tick={{ fill: '#6B7280', fontSize: 11 }}
                        domain={[0, 80]}
                        label={{ value: 'False Positive Rate (%)', angle: -90, position: 'insideLeft', style: { fill: '#6B7280', fontSize: 11 } }}
                    />
                    <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                    <Legend wrapperStyle={{ paddingTop: 4 }} />
                    <Bar dataKey="Static_SFR" name="Static_SFR" fill={COLORS.staticSfr} radius={[4, 4, 0, 0]}>
                        <LabelList
                            dataKey="Static_SFR"
                            position="top"
                            offset={8}
                            formatter={(value: number) => `${value.toFixed(1)}`}
                            style={{ fill: '#111827', fontSize: 11, fontWeight: 600 }}
                        />
                    </Bar>
                    <Bar dataKey="Taint_SFR" name="Taint_SFR" fill={COLORS.taintSfr} radius={[4, 4, 0, 0]}>
                        <LabelList
                            dataKey="Taint_SFR"
                            position="top"
                            offset={8}
                            formatter={(value: number) => `${value.toFixed(1)}`}
                            style={{ fill: '#111827', fontSize: 11, fontWeight: 600 }}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}