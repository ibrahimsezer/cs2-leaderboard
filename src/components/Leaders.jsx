import React from 'react';

// Rank badges/colors helper
const getRankStyles = (rank) => {
    switch (rank) {
        case 1: return {
            border: 'border-yellow-500',
            text: 'text-yellow-400',
            bg: 'bg-yellow-500/10',
            glow: 'shadow-[0_0_30px_rgba(234,179,8,0.2)]',
            crown: '👑'
        };
        case 2: return {
            border: 'border-slate-300',
            text: 'text-slate-300',
            bg: 'bg-slate-400/10',
            glow: 'shadow-[0_0_20px_rgba(203,213,225,0.1)]',
            crown: '🥈'
        };
        case 3: return {
            border: 'border-orange-700',
            text: 'text-orange-400',
            bg: 'bg-orange-600/10',
            glow: 'shadow-[0_0_20px_rgba(194,65,12,0.1)]',
            crown: '🥉'
        };
        default: return { border: 'border-slate-700', text: 'text-slate-400' };
    }
};

function LeaderCard({ player, rank, isCenter = false }) {
    const styles = getRankStyles(rank);
    const scaleClass = isCenter ? 'scale-105 md:scale-110 z-10' : 'scale-95 md:scale-100 z-0 opacity-90 hover:opacity-100 hover:scale-105';

    // Stats calculations for visual bars (normalized loosely)
    const winRate = ((player.wins / (player.rounds || 1)) * 100).toFixed(1); // Very rough approx if rounds is total rounds played
    // Actually wins is match wins usually? Assuming data consistency.
    // Let's stick to what we have.

    return (
        <div className={`relative transition-all duration-500 ease-out transform ${scaleClass} flex flex-col`}>
            {/* Glow Effect */}
            <div className={`absolute inset-0 rounded-2xl ${styles.glow} opacity-0 hover:opacity-100 transition-opacity duration-500`}></div>

            {/* Card Body */}
            <div className={`relative bg-slate-800/80 backdrop-blur-xl border-2 ${styles.border} rounded-2xl p-6 flex flex-col items-center gap-4 h-full shadow-xl overflow-hidden`}>

                {/* Rank Badge */}
                <div className={`absolute top-0 right-0 p-3 rounded-bl-2xl bg-slate-900/50 border-b border-l ${styles.border} backdrop-blur-sm`}>
                    <span className={`text-2xl font-bold ${styles.text}`}>#{rank}</span>
                </div>

                {/* Avatar / Icon */}
                <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full border-4 ${styles.border} p-1 bg-slate-900 mt-2 relative group`}>
                    <div className={`w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden`}>
                        {/* Placeholder Avatar - Could be replaced with real images if available */}
                        <span className={`text-5xl select-none ${styles.text} font-black group-hover:scale-110 transition-transform`}>
                            {player.name.substring(0, 1).toUpperCase()}
                        </span>
                    </div>
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-4xl animate-bounce drop-shadow-lg">
                        {styles.crown}
                    </div>
                </div>

                {/* Name & Score */}
                <div className="text-center mt-2">
                    <h3 className={`text-2xl font-black tracking-tight text-white uppercase truncate max-w-[200px]`}>
                        {player.name}
                    </h3>
                    <div className={`text-3xl font-mono font-bold ${styles.text} mt-1 drop-shadow-sm`}>
                        {player.score.toLocaleString()}
                    </div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mt-1">Global Score</p>
                </div>

                {/* Detailed Visual Stats */}
                <div className="w-full grid grid-cols-2 gap-2 mt-4">
                    <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50 flex flex-col items-center">
                        <span className="text-slate-400 text-xs font-bold uppercase">Kills</span>
                        <span className="text-slate-200 font-mono font-bold text-lg">{player.kills}</span>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50 flex flex-col items-center">
                        <span className="text-red-400 text-xs font-bold uppercase">HS Rate</span>
                        <span className="text-slate-200 font-mono font-bold text-lg">{player.hs_rate}%</span>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50 flex flex-col items-center">
                        <span className="text-green-400 text-xs font-bold uppercase">Wins</span>
                        <span className="text-slate-200 font-mono font-bold text-lg">{player.wins}</span>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50 flex flex-col items-center">
                        <span className="text-blue-400 text-xs font-bold uppercase">MVPs</span>
                        <span className="text-slate-200 font-mono font-bold text-lg">{player.mvps}</span>
                    </div>
                </div>

                {/* Fav Weapon */}
                <div className="mt-auto pt-4 w-full border-t border-slate-700/50">
                    <div className="flex justify-between items-center text-xs text-slate-400">
                        <span className="uppercase font-semibold">Fav Weapon</span>
                        <span className="text-yellow-500 font-mono">{player.fav_weapon}</span>
                    </div>
                    {/* Decorative Bar */}
                    <div className="w-full h-1 bg-slate-700 rounded-full mt-2 overflow-hidden">
                        <div className={`h-full ${styles.bg.replace('/10', '')} w-[70%]`}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Leaders({ players }) {
    if (!players || players.length < 3) return null;

    // Assume players are sorted by score before passed here, or sort them ourselves
    // To be safe, let's sort
    const sorted = [...players].sort((a, b) => b.score - a.score).slice(0, 3);

    // Arrange visually: 2, 1, 3
    // Index 0 is Rank 1
    // Index 1 is Rank 2
    // Index 2 is Rank 3

    return (
        <div className="w-full max-w-6xl mx-auto py-12 px-4">
            <div className="flex flex-col md:flex-row justify-center items-end gap-6 md:gap-4 relative">
                {/* Rank 2 (Left) */}
                <div className="order-2 md:order-1 w-full md:w-1/3">
                    <LeaderCard player={sorted[1]} rank={2} />
                </div>

                {/* Rank 1 (Center) */}
                <div className="order-1 md:order-2 w-full md:w-1/3 -mt-12 mb-8 md:mb-0">
                    <LeaderCard player={sorted[0]} rank={1} isCenter={true} />
                </div>

                {/* Rank 3 (Right) */}
                <div className="order-3 md:order-3 w-full md:w-1/3">
                    <LeaderCard player={sorted[2]} rank={3} />
                </div>
            </div>
        </div>
    );
}

export default Leaders;
