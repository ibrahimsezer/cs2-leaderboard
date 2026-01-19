import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

function WeaponChart({ weapons }) {
    // 1. Process Data
    const processedData = useMemo(() => {
        if (!weapons) return { data: [], topWeapon: null };

        // Convert object to array
        const list = Object.entries(weapons).map(([name, kills]) => ({
            name: name.toUpperCase(),
            value: kills,
            iconName: name // Store original key for file lookup
        }));

        // Sort by kills (desc)
        list.sort((a, b) => b.value - a.value);

        const topWeapon = list.length > 0 ? list[0] : null;

        // Take Top 5 + Others
        let chartData = list;
        if (list.length > 5) {
            const top5 = list.slice(0, 5);
            const othersValue = list.slice(5).reduce((acc, curr) => acc + curr.value, 0);
            chartData = [...top5, { name: 'OTHERS', value: othersValue }];
        }
        return { data: chartData, topWeapon };
    }, [weapons]);

    const { data, topWeapon } = processedData;

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
                <div className="bg-black/90 border border-white/10 px-3 py-2 rounded-lg shadow-xl text-xs font-bold font-mono z-50">
                    <span style={{ color: payload[0].payload.fill }}>{payload[0].name}:</span>
                    <span className="text-white ml-2">{payload[0].value} Kills</span>
                </div>
            );
        }
        return null;
    };

    // Helper for Icon
    const getWeaponIcon = (name) => {
        if (!name || name === 'OTHERS') return null;
        return `${import.meta.env.BASE_URL}equipments/${name.toLowerCase()}.svg`;
    };

    return (
        <div className="w-full h-64 flex items-center p-4 gap-4">
            {/* Chart Section */}
            <div className="relative w-1/2 h-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={65}
                            paddingAngle={4} // Adjusted padding
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

                {/* Center Icon (Top Weapon) */}
                {topWeapon && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 opacity-90 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all">
                            <img
                                src={getWeaponIcon(topWeapon.iconName)}
                                alt={topWeapon.name}
                                className="w-full h-full object-contain"
                                onError={(e) => { e.target.style.display = 'none'; }} // Hide image if loading fails
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Legend Section - Right Side List */}
            <div className="flex flex-col gap-1 w-1/2 overflow-y-auto max-h-full pr-1">
                {data.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-2 text-[10px] w-full py-0.5 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors rounded px-1">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <span className="font-bold text-neutral-400 truncate flex-1 tracking-tight">{entry.name}</span>
                        <span className="font-mono font-bold text-white opacity-90">{entry.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WeaponChart;
