
import { Crown, Trophy, Medal, Skull, Target, Zap, Crosshair } from 'lucide-react';
import CategoryLeaders from './CategoryLeaders';

function PodiumStep({ player, rank, onClick }) {
    const isFirst = rank === 1;
    const isSecond = rank === 2;
    const isThird = rank === 3;

    let containerClass = "";
    let boxClass = "";
    let titleClass = "";
    let scoreClass = "";
    let ringGradient = "";
    let textGradient = "";
    let glowColor = "";
    let rankIcon = null;
    let badge = null;

    if (isFirst) {
        // Gold / Champion
        containerClass = "order-2 -mt-12 z-20 scale-110 md:scale-100";
        boxClass = "bg-gradient-to-b from-yellow-900/40 to-neutral-900/90 border-t border-yellow-500/50 shadow-[0_0_50px_-10px_rgba(234,179,8,0.2)]";
        ringGradient = "from-yellow-400 via-orange-300 to-yellow-600";
        textGradient = "from-yellow-100 to-yellow-500";
        glowColor = "group-hover:shadow-[0_0_30px_rgba(250,204,21,0.4)]";
        scoreClass = "text-yellow-400 drop-shadow-sm";
        rankIcon = <Crown className="w-8 h-8 text-yellow-400 fill-yellow-400 absolute -top-10 left-1/2 -translate-x-1/2 animate-bounce-slow" />;
        badge = <span className="absolute top-4 right-4 bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-widest shadow-[0_0_10px_rgba(250,204,21,0.2)]">Global Elite</span>;
    } else if (isSecond) {
        // Silver / Challenger
        containerClass = "order-1 mt-8 z-10";
        boxClass = "bg-gradient-to-b from-slate-800/40 to-neutral-900/90 border-t border-slate-400/30 shadow-[0_0_40px_-10px_rgba(148,163,184,0.1)]";
        ringGradient = "from-slate-300 via-slate-100 to-slate-400";
        textGradient = "from-slate-100 to-slate-400";
        glowColor = "group-hover:shadow-[0_0_30px_rgba(148,163,184,0.3)]";
        scoreClass = "text-slate-300";
        rankIcon = <Medal className="w-6 h-6 text-slate-300 absolute -top-8 left-1/2 -translate-x-1/2" />;
        badge = <span className="absolute top-4 right-4 bg-slate-500/20 border border-slate-500/40 text-slate-300 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-widest">Master</span>;
    } else if (isThird) {
        // Bronze / Contender
        containerClass = "order-3 mt-8 z-10";
        boxClass = "bg-gradient-to-b from-orange-900/30 to-neutral-900/90 border-t border-orange-600/30 shadow-[0_0_40px_-10px_rgba(234,88,12,0.1)]";
        ringGradient = "from-orange-400 via-amber-700 to-orange-800";
        textGradient = "from-orange-200 to-orange-600";
        glowColor = "group-hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]";
        scoreClass = "text-orange-400";
        rankIcon = <Trophy className="w-6 h-6 text-orange-500 absolute -top-8 left-1/2 -translate-x-1/2" />;
        badge = <span className="absolute top-4 right-4 bg-orange-500/20 border border-orange-500/40 text-orange-500 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-widest">Elite</span>;
    }

    return (
        <div
            onClick={onClick}
            className={`flex flex-col items-center w-full md:w-[320px] transition-all duration-500 hover:-translate-y-2 cursor-pointer group ${containerClass}`}
        >
            {/* Avatar Section */}
            <div className="relative mb-6">
                {rankIcon}
                <div className={`relative w-28 h-28 md:w-32 md:h-32 p-[4px] rounded-full bg-gradient-to-br ${ringGradient} ${glowColor} transition-shadow duration-500`}>
                    <div className="w-full h-full rounded-full border-[3px] border-neutral-900 overflow-hidden relative">
                        {player.avatar ? (
                            <img src={player.avatar} alt={player.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        ) : (
                            <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-3xl font-bold text-neutral-600">{player.name.charAt(0)}</div>
                        )}
                        {/* Shimmer effect on avatar */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    </div>
                </div>

                {/* Rank Number Badge */}
                <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center font-black text-sm text-neutral-900 bg-gradient-to-br ${ringGradient} rounded shadow-lg border border-white/20 z-10 rotate-45`}>
                    <span className="-rotate-45">#{rank}</span>
                </div>
            </div>

            {/* Info Box */}
            <div className={`relative w-full rounded-2xl backdrop-blur-md overflow-hidden flex flex-col items-center ${boxClass}`}>
                {badge}

                <div className="pt-10 pb-6 px-6 w-full text-center">
                    <h3 className={`text-2xl font-black uppercase tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r ${textGradient}`}>
                        {player.nickname}
                    </h3>

                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Zap size={14} className={isFirst ? "text-yellow-400" : isSecond ? "text-slate-300" : "text-orange-400"} />
                        <span className={`text-4xl font-mono font-black tracking-tighter ${scoreClass}`}>
                            {player.score.toLocaleString()}
                        </span>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4">
                        <div className="flex flex-col items-center gap-1 group/stat">
                            <div className="p-1.5 rounded bg-neutral-800/50 text-neutral-400 group-hover/stat:text-red-400 group-hover/stat:bg-red-900/20 transition-colors">
                                <Skull size={14} />
                            </div>
                            <span className="text-lg font-bold text-neutral-200">{player.kills}</span>
                            <span className="text-[10px] uppercase text-neutral-500 font-bold tracking-wider">Kills</span>
                        </div>

                        <div className="flex flex-col items-center gap-1 group/stat">
                            <div className="p-1.5 rounded bg-neutral-800/50 text-neutral-400 group-hover/stat:text-blue-400 group-hover/stat:bg-blue-900/20 transition-colors">
                                <Crosshair size={14} />
                            </div>
                            <span className="text-lg font-bold text-neutral-200">{player.hs_rate}%</span>
                            <span className="text-[10px] uppercase text-neutral-500 font-bold tracking-wider">HS Rate</span>
                        </div>

                        <div className="flex flex-col items-center gap-1 group/stat">
                            <div className="p-1.5 rounded bg-neutral-800/50 text-neutral-400 group-hover/stat:text-green-400 group-hover/stat:bg-green-900/20 transition-colors">
                                <Target size={14} />
                            </div>
                            <span className="text-lg font-bold text-neutral-200">{player.kda}</span>
                            <span className="text-[10px] uppercase text-neutral-500 font-bold tracking-wider">K/D</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Leaders({ players, onPlayerSelect }) {
    if (!players || players.length < 3) return null;

    const sorted = [...players].sort((a, b) => b.score - a.score).slice(0, 3);

    return (
        <div className="w-full max-w-6xl mx-auto pt-10 pb-4 px-4">
            {/* Header for Leaders Section - Optional, but adds context */}
            <div className="text-center mb-16 relative">
                <h2 className="text-4xl md:text-5xl font-black text-white/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full tracking-[0.2em] pointer-events-none uppercase">
                    Top Fraggers
                </h2>
                <h2 className="relative text-2xl md:text-3xl font-bold text-white uppercase tracking-widest inline-block px-8 py-2 border-b-2 border-orange-500/50">
                    Leaderboard Top 3
                </h2>
            </div>


            {/* Main Podium */}
            <div className="flex flex-col md:flex-row items-end justify-center gap-6 lg:gap-12 mb-20 px-4">
                <PodiumStep key={sorted[1].name} player={sorted[1]} rank={2} onClick={() => onPlayerSelect(sorted[1])} />
                <PodiumStep key={sorted[0].name} player={sorted[0]} rank={1} onClick={() => onPlayerSelect(sorted[0])} />
                <PodiumStep key={sorted[2].name} player={sorted[2]} rank={3} onClick={() => onPlayerSelect(sorted[2])} />
            </div>

            {/* Mini Leaderboards Grid (Modularized) */}
            <CategoryLeaders players={players} onPlayerSelect={onPlayerSelect} />
        </div>
    );
}

export default Leaders;
