import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

function WeaponChart({ weapons }) {
    // 1. Process Data
    const data = useMemo(() => {
        if (!weapons) return [];

        // Convert object to array
        const list = Object.entries(weapons).map(([name, kills]) => ({
            name: name.toUpperCase(),
            value: kills
        }));

        // Sort by kills (desc)
        list.sort((a, b) => b.value - a.value);

        // Take Top 5 + Others
        if (list.length > 6) {
            const top5 = list.slice(0, 5);
            const othersValue = list.slice(5).reduce((acc, curr) => acc + curr.value, 0);
            return [...top5, { name: 'OTHERS', value: othersValue }];
        }
        return list;
    }, [weapons]);

    if (data.length === 0) {
        return (
            <div className="w-full h-40 flex items-center justify-center border border-dashed border-white/10 rounded-xl bg-neutral-900/50">
                <span className="text-xs text-neutral-500 font-mono">NO WEAPON DATA</span>
            </div>
        );
    }

    // 2. Colors (CS2 Colors)
    const COLORS = [
        '#22d3ee', // Cyan
        '#f472b6', // Pink
        '#a3e635', // Lime
        '#facc15', // Yellow
        '#fb923c', // Orange
        '#9ca3af'  // Gray (Others)
    ];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-black/90 border border-white/10 px-3 py-2 rounded-lg shadow-xl text-xs font-bold font-mono">
                    <span style={{ color: payload[0].payload.fill }}>{payload[0].name}:</span>
                    <span className="text-white ml-2">{payload[0].value} Kills</span>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-56 relative flex items-center">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </ResponsiveContainer>

            {/* Legend Overlay on Right side (or center inside if donut?) Let's do simple right side legend */}
            <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col gap-1.5 pointer-events-none">
                {data.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <span className="text-[10px] font-bold text-neutral-400">{entry.name}</span>
                        <span className="text-[10px] font-mono font-bold text-white opacity-60 ml-auto pl-2">{entry.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WeaponChart;
