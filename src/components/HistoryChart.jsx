import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function HistoryChart({ history }) {
    const [metric, setMetric] = useState('score');

    // Mock data if history is empty (for visualization during dev)
    const data = (history && history.length > 1) ? history : [
        { date: '2024-01-01', score: 100, kda: 1.2, kills: 10 },
        { date: '2024-01-05', score: 120, kda: 1.3, kills: 25 },
        { date: '2024-01-10', score: 115, kda: 1.25, kills: 40 },
        { date: '2024-01-15', score: 140, kda: 1.5, kills: 60 },
        { date: 'Today', score: 155, kda: 1.6, kills: 80 },
    ];

    // Config for metrics
    const metrics_config = {
        score: { label: 'Rating', color: '#22d3ee' }, // Cyan
        kda: { label: 'K/D Ratio', color: '#f472b6' }, // Pink
        kills: { label: 'Total Kills', color: '#a3e635' } // Lime
    };

    const currentConfig = metrics_config[metric];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-neutral-900 border border-white/10 p-3 rounded-lg shadow-xl">
                    <p className="text-neutral-400 text-xs mb-1">{label}</p>
                    <p className="text-white font-bold text-sm" style={{ color: currentConfig.color }}>
                        {currentConfig.label}: {payload[0].value}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full bg-neutral-800/20 rounded-xl border border-white/5 p-4 mt-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest">
                    Performance Trend
                </h3>

                {/* Metric Toggles */}
                <div className="flex bg-black/40 rounded-lg p-1 gap-1">
                    {Object.keys(metrics_config).map((key) => (
                        <button
                            key={key}
                            onClick={() => setMetric(key)}
                            className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-all ${metric === key
                                    ? 'bg-neutral-700 text-white shadow-sm'
                                    : 'text-neutral-500 hover:text-neutral-300'
                                }`}
                        >
                            {metrics_config[key].label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id={`gradient-${metric}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={currentConfig.color} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={currentConfig.color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis
                            dataKey="date"
                            stroke="#525252"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(val) => val.split('-').slice(1).join('/')} // Show MM/DD
                        />
                        <YAxis
                            stroke="#525252"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            domain={['auto', 'auto']}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'white', strokeWidth: 1, strokeDasharray: '4 4' }} />
                        <Area
                            type="monotone"
                            dataKey={metric}
                            stroke={currentConfig.color}
                            strokeWidth={3}
                            fill={`url(#gradient-${metric})`}
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default HistoryChart;
