import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { X, Swords, Trophy, Skull, Crosshair, Target, Zap } from 'lucide-react';

function VersusModal({ player1, player2, onClose }) {
    if (!player1 || !player2) return null;

    // --- HELPER: Calculate Stats ---
    const getStats = (p) => {
        const rounds = p.rounds || 1;
        return {
            kpr: (p.kills / rounds).toFixed(2),
            dpr: (p.deaths / rounds).toFixed(2),
            adr: (p.damage / rounds).toFixed(1),
            hs_rate: p.hs_rate,
            win_rate: p.rounds > 0 ? ((p.wins / p.rounds) * 100).toFixed(1) : 0,
            accuracy: p.shots_fired > 0 ? ((p.shots_hit / p.shots_fired) * 100).toFixed(1) : 0,
            utility_score: ((p.money_earned || 0) / rounds / 50).toFixed(1) // Normalized utility/eco score
        };
    };

    const stats1 = getStats(player1);
    const stats2 = getStats(player2);

    // --- DATA PREP: Radar Chart ---
    // Normalizing values roughly to 0-100 scale for visual comparison
    const radarData = [
        { subject: 'KPR', A: Math.min(100, stats1.kpr * 50), B: Math.min(100, stats2.kpr * 50), fullMark: 100 },
        { subject: 'Survival', A: Math.min(100, (1 - stats1.dpr) * 100), B: Math.min(100, (1 - stats2.dpr) * 100), fullMark: 100 },
        { subject: 'Aim (HS%)', A: stats1.hs_rate, B: stats2.hs_rate, fullMark: 100 },
        { subject: 'Impact (ADR)', A: Math.min(100, stats1.adr / 1.5), B: Math.min(100, stats2.adr / 1.5), fullMark: 100 },
        { subject: 'Win Rate', A: stats1.win_rate, B: stats2.win_rate, fullMark: 100 },
    ];

    // --- HELPER: Render Comparison Bar ---
    const ComparisonRow = ({ label, val1, val2, unit = '', format = (v) => v, reverse = false }) => {
        const v1 = parseFloat(val1);
        const v2 = parseFloat(val2);

        // Determine winner
        let p1Wins = v1 > v2;
        if (reverse) p1Wins = v1 < v2;
        const isDraw = v1 === v2;

        return (
            <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 rounded transition-colors">
                <div className={`text-right w-24 font-mono font-bold text-lg ${p1Wins && !isDraw ? 'text-cyan-400' : 'text-neutral-500'}`}>
                    {format(val1)}{unit}
                </div>

                <div className="flex-1 text-center text-xs font-bold text-neutral-400 uppercase tracking-widest px-4">
                    {label}
                </div>

                <div className={`text-left w-24 font-mono font-bold text-lg ${!p1Wins && !isDraw ? 'text-rose-500' : 'text-neutral-500'}`}>
                    {format(val2)}{unit}
                </div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div
                className="absolute inset-0 bg-black/95 transition-opacity"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-5xl bg-neutral-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">

                {/* Header: VS Mode */}
                <div className="bg-gradient-to-r from-cyan-900/20 via-black to-rose-900/20 p-6 flex justify-between items-center border-b border-white/10 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 rounded-full bg-black/50 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors z-20"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-6 w-full justify-center">
                        {/* Player 1 Header */}
                        <div className="flex flex-col items-center gap-2 w-1/3">
                            <div className="w-16 h-16 rounded-full border-2 border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.3)] overflow-hidden">
                                {player1.avatar ? (
                                    <img src={player1.avatar} alt={player1.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-neutral-800 flex items-center justify-center font-bold text-neutral-400">{player1.name[0]}</div>
                                )}
                            </div>
                            <h2 className="text-2xl font-black text-white">{player1.name}</h2>
                            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Player 1</span>
                        </div>

                        {/* VS Icon */}
                        <div className="relative flex items-center justify-center">
                            <Swords className="w-12 h-12 text-white animate-pulse" />
                            <div className="absolute -inset-4 bg-white/5 blur-xl rounded-full"></div>
                        </div>

                        {/* Player 2 Header */}
                        <div className="flex flex-col items-center gap-2 w-1/3">
                            <div className="w-16 h-16 rounded-full border-2 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)] overflow-hidden">
                                {player2.avatar ? (
                                    <img src={player2.avatar} alt={player2.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-neutral-800 flex items-center justify-center font-bold text-neutral-400">{player2.name[0]}</div>
                                )}
                            </div>
                            <h2 className="text-2xl font-black text-white">{player2.name}</h2>
                            <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">Player 2</span>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="flex flex-col lg:flex-row flex-1 overflow-y-auto">

                    {/* Left: Radar Chart */}
                    <div className="w-full lg:w-1/2 p-8 border-r border-white/5 flex flex-col items-center justify-center bg-black/20">
                        <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-6">Playstyle Comparison</h3>
                        <div className="w-full h-80 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                    <PolarGrid stroke="#333" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 'bold' }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar
                                        name={player1.name}
                                        dataKey="A"
                                        stroke="#22d3ee"
                                        strokeWidth={3}
                                        fill="#22d3ee"
                                        fillOpacity={0.2}
                                    />
                                    <Radar
                                        name={player2.name}
                                        dataKey="B"
                                        stroke="#f43f5e"
                                        strokeWidth={3}
                                        fill="#f43f5e"
                                        fillOpacity={0.2}
                                    />
                                    <Legend />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Right: Stat Breakdown */}
                    <div className="w-full lg:w-1/2 p-8 bg-neutral-900">
                        <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-6 text-center">Direct Matchup</h3>

                        <div className="flex flex-col gap-2">
                            <ComparisonRow label="Score" val1={player1.score} val2={player2.score} />
                            <ComparisonRow label="K/D Ratio" val1={player1.kda} val2={player2.kda} />
                            <ComparisonRow label="Damage/Round" val1={stats1.adr} val2={stats2.adr} />
                            <ComparisonRow label="Headshot %" val1={stats1.hs_rate} val2={stats2.hs_rate} unit="%" />
                            <ComparisonRow label="Win Rate" val1={stats1.win_rate} val2={stats2.win_rate} unit="%" />
                            <ComparisonRow label="Accuracy" val1={stats1.accuracy} val2={stats2.accuracy} unit="%" />
                            <ComparisonRow label="Deaths / Round" val1={stats1.dpr} val2={stats2.dpr} reverse={true} />
                            <ComparisonRow label="Total MVPs" val1={player1.mvps} val2={player2.mvps} />
                        </div>

                        {/* Footer Info */}
                        <div className="mt-8 p-4 bg-neutral-800/30 rounded-xl border border-white/5 flex justify-center gap-8 text-xs text-neutral-500 font-mono">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                                <span>{player1.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
                                <span>{player2.name}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default VersusModal;
