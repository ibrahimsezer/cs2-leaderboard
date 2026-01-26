
import { Crosshair, Skull, Flame, Trophy, Target } from 'lucide-react';

// --- MINI LEADERBOARD CARD ---
function MiniLeaderboardCard({ title, icon, players, statKey, formatValue, onPlayerSelect, colorParams }) {
    const topThree = [...players].sort((a, b) => b[statKey] - a[statKey]).slice(0, 3);
    const { bg, border, iconColor, textGradient, hoverBorder } = colorParams;

    return (
        <div className={`relative overflow-hidden bg-neutral-900/40 backdrop-blur-md border ${border} rounded-2xl p-6 transition-all duration-300 hover:bg-neutral-900/60 ${hoverBorder} group`}>
            {/* Background Glow */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 ${bg} blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity`}></div>

            <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className={`p-2.5 rounded-xl bg-neutral-800/80 border border-white/5 shadow-inner ${iconColor}`}>
                    {icon}
                </div>
                <h4 className={`text-sm font-black uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r ${textGradient}`}>
                    {title}
                </h4>
            </div>

            <div className="flex flex-col gap-2 relative z-10">
                {topThree.map((player, idx) => {
                    const isTop = idx === 0;

                    return (
                        <div
                            key={player.name}
                            onClick={() => onPlayerSelect(player)}
                            className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 cursor-pointer border border-transparent 
                                ${isTop ? 'bg-white/5 border-white/10 shadow-lg' : 'hover:bg-white/5 hover:border-white/5'}
                                active:scale-[0.98] group/item
                            `}
                        >
                            <div className="flex items-center gap-3">
                                {/* Rank */}
                                <div className={`w-6 h-6 flex items-center justify-center rounded font-black text-xs 
                                    ${isTop ? 'bg-white/10 text-white' : 'text-neutral-500 bg-neutral-800/50'}
                                `}>
                                    #{idx + 1}
                                </div>

                                {/* Avatar Mini */}
                                <div className={`relative w-8 h-8 rounded-full bg-neutral-800 overflow-hidden border ${isTop ? 'border-white/30' : 'border-white/10'}`}>
                                    {player.avatar ? (
                                        <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xs font-bold text-neutral-500">
                                            {player.name.charAt(0)}
                                        </div>
                                    )}
                                </div>

                                <span className={`text-sm font-bold truncate w-24 md:w-32 group-hover/item:text-white transition-colors ${isTop ? 'text-white' : 'text-neutral-400'}`}>
                                    {player.nickname || player.name}
                                </span>
                            </div>

                            <span className={`font-mono font-black text-sm tracking-wider ${isTop ? 'text-white' : 'text-neutral-400'}`}>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Damage Leaders - Red/Orange */}
                <MiniLeaderboardCard
                    title="Damage Dealers"
                    icon={<Flame size={20} />}
                    players={players}
                    statKey="damage"
                    formatValue={(v) => `${(v / 1000).toFixed(1)}k`}
                    onPlayerSelect={onPlayerSelect}
                    colorParams={{
                        bg: "bg-red-500",
                        border: "border-red-500/20",
                        hoverBorder: "hover:border-red-500/40",
                        iconColor: "text-red-500",
                        textGradient: "from-red-200 to-red-500"
                    }}
                />

                {/* Headshot Leaders - Cyan/Blue */}
                <MiniLeaderboardCard
                    title="Headshooters"
                    icon={<Crosshair size={20} />}
                    players={players}
                    statKey="hs_rate"
                    formatValue={(v) => `%${v}`}
                    onPlayerSelect={onPlayerSelect}
                    colorParams={{
                        bg: "bg-cyan-500",
                        border: "border-cyan-500/20",
                        hoverBorder: "hover:border-cyan-500/40",
                        iconColor: "text-cyan-500",
                        textGradient: "from-cyan-200 to-cyan-500"
                    }}
                />

                {/* Kill Leaders - Yellow/Gold */}
                <MiniLeaderboardCard
                    title="Top Fraggers"
                    icon={<Skull size={20} />}
                    players={players}
                    statKey="kills"
                    formatValue={(v) => v.toLocaleString()}
                    onPlayerSelect={onPlayerSelect}
                    colorParams={{
                        bg: "bg-yellow-500",
                        border: "border-yellow-500/20",
                        hoverBorder: "hover:border-yellow-500/40",
                        iconColor: "text-yellow-500",
                        textGradient: "from-yellow-200 to-yellow-500"
                    }}
                />
            </div>
        </div>
    );
}

export default CategoryLeaders;
