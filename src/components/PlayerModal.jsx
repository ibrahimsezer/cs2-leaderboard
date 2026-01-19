import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { X, Target, MapPin, Zap, Shield, Trophy, Activity, Ghost, UserX, LayoutGrid, Download, Loader } from 'lucide-react';

function PlayerModal({ player, onClose }) {
    const modalRef = useRef(null);
    const [isSharing, setIsSharing] = useState(false);

    if (!player) return null;

    const handleShare = async () => {
        if (!modalRef.current) return;
        setIsSharing(true);
        try {
            const canvas = await html2canvas(modalRef.current, {
                backgroundColor: '#171717',
                scale: 2,
                logging: false,
                useCORS: true
            });
            const image = canvas.toDataURL("image/png");
            const link = document.createElement('a');
            link.href = image;
            link.download = `CS2_Leaderboard_${player.name}_Card.png`;
            link.click();
        } catch (err) {
            console.error("Failed to generate share card", err);
        }
        setIsSharing(false);
    };

    // --- STAT CALCULATIONS ---
    const kpr = player.rounds > 0 ? (player.kills / player.rounds) : 0;
    const dpr = player.rounds > 0 ? (player.deaths / player.rounds) : 0;
    const survivalRate = player.rounds > 0 ? Math.max(0, 100 - (dpr * 100)) : 0;
    const accuracy = player.shots_fired > 0 ? ((player.shots_hit / player.shots_fired) * 100).toFixed(1) : 0;
    const impact = Math.min(100, (kpr * 50) + (player.mvps * 2)); // Dynamic impact score

    // Radar Data
    const radarData = [
        { subject: 'Aim', A: Math.min(100, player.hs_rate), fullMark: 100 },
        { subject: 'Aggression', A: Math.min(100, kpr * 100), fullMark: 100 }, // 1.0 KPR -> 100
        { subject: 'Survival', A: survivalRate, fullMark: 100 },
        { subject: 'Teamplay', A: Math.min(100, (player.mvps + (player.bombs_defused || 0) + (player.bombs_planted || 0)) * 5), fullMark: 100 },
        { subject: 'Utility', A: Math.min(100, ((player.money_earned || 0) / (player.rounds || 1)) / 100), fullMark: 100 }, // Approx $10k per round avg? No, $2k-5k. So /100 -> 20-50.
    ];

    // Badges
    const badges = [];
    if ((player.knife_kills || 0) > 0) badges.push({ icon: '🥷', label: 'Ninja', desc: 'Knife Kill Master' });
    if ((player.blind_kills || 0) > 5) badges.push({ icon: '🕶️', label: 'Flash King', desc: 'Blinded Enemies Eliminated' });
    if ((player.broken_windows || 0) > 0) badges.push({ icon: '🪟', label: 'Vandal', desc: 'Property Damage Expert' });
    if (player.score >= 200) badges.push({ icon: '🔥', label: 'MVP', desc: 'High Score Legend' });
    if (player.hs_rate > 60) badges.push({ icon: '🎯', label: 'Deadeye', desc: 'Headshot Master' });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop - Optimized: Removed blur for performance */}
            <div
                className="absolute inset-0 bg-black/90 transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div ref={modalRef} className="relative w-full max-w-4xl bg-neutral-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up flex flex-col md:flex-row max-h-[90vh] md:max-h-auto overflow-y-auto md:overflow-hidden">

                {/* Actions: Share & Close */}
                <div
                    className="absolute top-4 right-4 flex gap-3 z-50"
                    data-html2canvas-ignore="true"
                >
                    <button
                        onClick={handleShare}
                        disabled={isSharing}
                        className="p-2 rounded-full bg-black/50 hover:bg-cyan-500/20 text-neutral-400 hover:text-cyan-400 transition-colors disabled:opacity-50"
                        title="Download Player Card"
                    >
                        {isSharing ? <Loader className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                    </button>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-black/50 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Left Column: Player Profile & Key Stats */}
                <div className="w-full md:w-1/3 bg-black/40 p-8 flex flex-col items-center border-r border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none"></div>

                    {/* Avatar */}
                    <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl mb-6 relative z-10">
                        {player.avatar ? (
                            <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-4xl">{player.name.charAt(0)}</div>
                        )}
                    </div>

                    <h2 className="text-3xl font-black text-white mb-1 text-center relative z-10">{player.name}</h2>
                    <p className="text-neutral-500 font-mono text-sm mb-8 relative z-10">{player.steamId || 'Steam Profile'}</p>

                    <div className="w-full space-y-4 relative z-10">
                        {/* Accuracy Bar */}
                        <div>
                            <div className="flex justify-between text-xs font-bold text-neutral-400 mb-1">
                                <span>ACCURACY</span>
                                <span>{accuracy}%</span>
                            </div>
                            <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                                    style={{ width: `${Math.min(100, accuracy)}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-[10px] text-neutral-600 mt-1">
                                <span>{player.shots_hit || 0} Hits</span>
                                <span>{player.shots_fired || 0} Shots</span>
                            </div>
                        </div>

                        {/* Economy */}
                        <div className="bg-neutral-800/50 p-4 rounded-xl border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-neutral-500 uppercase font-bold">Total Earned</p>
                                    <p className="text-lg font-mono font-bold text-green-400">${(player.money_earned || 0).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Favorite Map */}
                        <div className="bg-neutral-800/50 p-4 rounded-xl border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-neutral-500 uppercase font-bold">Favorite Map</p>
                                    <p className="text-lg font-bold text-white">{player.fav_map || 'Unknown'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Radar & Fun Stats */}
                <div className="w-full md:w-2/3 p-8 bg-neutral-900">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-cyan-400" />
                        Performance Analysis
                    </h3>

                    <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-8">
                        {/* Radar Chart */}
                        <div className="w-full md:w-1/2 h-64 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                    <PolarGrid stroke="#333" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 'bold' }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar
                                        name={player.name}
                                        dataKey="A"
                                        stroke="#22d3ee"
                                        strokeWidth={2}
                                        fill="#22d3ee"
                                        fillOpacity={0.3}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Additional KPI Grid */}
                        <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
                            <div className="bg-neutral-800/30 p-3 rounded-xl border border-white/5 text-center">
                                <p className="text-2xl font-black text-white">{player.kda}</p>
                                <p className="text-[10px] text-neutral-500 uppercase font-bold">K/D Ratio</p>
                            </div>
                            <div className="bg-neutral-800/30 p-3 rounded-xl border border-white/5 text-center">
                                <p className="text-2xl font-black text-white">{player.score}</p>
                                <p className="text-[10px] text-neutral-500 uppercase font-bold">Rating</p>
                            </div>
                            <div className="bg-neutral-800/30 p-3 rounded-xl border border-white/5 text-center">
                                <p className="text-2xl font-black text-white">{(player.damage / 1000).toFixed(1)}k</p>
                                <p className="text-[10px] text-neutral-500 uppercase font-bold">Total Dmg</p>
                            </div>
                            <div className="bg-neutral-800/30 p-3 rounded-xl border border-white/5 text-center">
                                <p className="text-2xl font-black text-white">{player.rounds}</p>
                                <p className="text-[10px] text-neutral-500 uppercase font-bold">Rounds</p>
                            </div>
                        </div>
                    </div>

                    {/* Badges Section */}
                    {badges.length > 0 && (
                        <div>
                            <h3 className="text-sm font-bold text-neutral-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                                <Trophy className="w-4 h-4" />
                                Badges & Achievements
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {badges.map((badge, idx) => (
                                    <div key={idx} className="group relative bg-neutral-800/50 hover:bg-neutral-800 border border-white/5 rounded-xl px-4 py-3 flex items-center gap-3 transition-colors cursor-help">
                                        <span className="text-2xl">{badge.icon}</span>
                                        <div>
                                            <p className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">{badge.label}</p>
                                            <p className="text-[10px] text-neutral-500">Hover for info</p>
                                        </div>
                                        {/* Tooltip */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 z-50">
                                            {badge.desc}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Funny/Extra Stats Line */}
                    <div className="mt-8 pt-4 border-t border-white/5 flex justify-between text-[10px] text-neutral-600 font-mono">
                        <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Defused: {player.bombs_defused || 0}</span>
                        <span className="flex items-center gap-1"><Ghost className="w-3 h-3" /> Blind Kills: {player.blind_kills || 0}</span>
                        <span className="flex items-center gap-1"><LayoutGrid className="w-3 h-3" /> Windows: {player.broken_windows || 0}</span>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default PlayerModal;
