import React from 'react';

// --- SVG ICONS ---
const FireIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
    </svg>
);

const CrosshairIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-2.48-.35-4.44-2.22-4.93-4.64l1.88-1.88-1.41-1.41-1.88 1.88c.35-2.49 2.22-4.45 4.64-4.93v-1.69h1.69v1.65c2.49.35 4.45 2.22 4.93 4.64l-1.88 1.88 1.41 1.41 1.88-1.88c-.35 2.48-2.22 4.44-4.64 4.93v1.69h-1.69v-1.65zm-.25-5.18l-1.41 1.41 1.41 1.41 1.41-1.41-1.41-1.41z" />
    </svg>
);

const SwordIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3 3l18 18M21 3L3 21" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
);

// --- MINI LEADERBOARD CARD ---
function MiniLeaderboardCard({ title, icon, players, statKey, formatValue, onPlayerSelect }) {
    const topThree = [...players].sort((a, b) => b[statKey] - a[statKey]).slice(0, 3);

    return (
        <div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-5 hover:bg-neutral-900/80 transition-colors group">
            <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg bg-neutral-800 text-white group-hover:bg-white group-hover:text-black transition-colors`}>
                    {icon}
                </div>
                <h4 className="text-sm font-bold text-neutral-200 uppercase tracking-widest">{title}</h4>
            </div>

            <div className="flex flex-col gap-3">
                {topThree.map((player, idx) => {
                    const rankColor = idx === 0 ? 'text-cyan-400' : idx === 1 ? 'text-purple-400' : 'text-orange-400';
                    const borderColor = idx === 0 ? 'border-cyan-400' : idx === 1 ? 'border-purple-400' : 'border-orange-400';

                    return (
                        <div
                            key={player.name}
                            onClick={() => onPlayerSelect(player)}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer active:scale-95 duration-150"
                        >
                            <div className="flex items-center gap-3">
                                <span className={`text-xs font-black w-4 ${rankColor}`}>
                                    #{idx + 1}
                                </span>

                                {/* Avatar Mini */}
                                <div className={`w-8 h-8 rounded-full bg-neutral-800 overflow-hidden border ${borderColor}`}>
                                    {player.avatar ? (
                                        <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xs font-bold text-neutral-500">
                                            {player.name.charAt(0)}
                                        </div>
                                    )}
                                </div>

                                <span className={`text-sm font-bold truncate w-24 ${idx === 0 ? 'text-white' : 'text-neutral-400'}`}>
                                    {player.name}
                                </span>
                            </div>

                            <span className={`font-mono font-bold text-sm ${rankColor}`}>
                                {formatValue ? formatValue(player[statKey]) : player[statKey]}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// --- MAIN COMPONENT ---
function CategoryLeaders({ players, onPlayerSelect }) {
    if (!players) return null;

    return (
        <div className="w-full">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-white rounded-full"></span>
                Category Leaders
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MiniLeaderboardCard
                    title="Damage Dealers"
                    icon={<FireIcon className="w-5 h-5" />}
                    players={players}
                    statKey="damage"
                    formatValue={(v) => v.toLocaleString()}
                    onPlayerSelect={onPlayerSelect}
                />
                <MiniLeaderboardCard
                    title="Sharpshooters"
                    icon={<CrosshairIcon className="w-5 h-5" />}
                    players={players}
                    statKey="hs_rate"
                    formatValue={(v) => `%${v}`}
                    onPlayerSelect={onPlayerSelect}
                />
                <MiniLeaderboardCard
                    title="Top Fraggers"
                    icon={<SwordIcon className="w-5 h-5" />}
                    players={players}
                    statKey="kills"
                    formatValue={(v) => v}
                    onPlayerSelect={onPlayerSelect}
                />
            </div>
        </div>
    );
}

export default CategoryLeaders;
