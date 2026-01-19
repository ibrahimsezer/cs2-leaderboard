import React from 'react';

// --- SVG ICONS ---
const TrophyIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.825 2H5.175A2.181 2.181 0 0 0 3 4.175V5a6.012 6.012 0 0 0 4.14 5.7c.304 3.018 2.378 5.496 5.172 6.136L9.894 19H7.5a.5.5 0 0 0-.5.5V21a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-1.5a.5.5 0 0 0-.5-.5h-2.394l-2.418-2.164C15.447 16.196 17.522 13.718 17.826 10.7 20.25 9.948 21 7.152 21 5v-.825A2.181 2.181 0 0 0 18.825 2zM5.25 5h-1a.5.5 0 0 1-.5-.5v-.325A.681.681 0 0 1 4.425 3.5h.825c.138 0 .25.112.25.25V5zm4.836 9.873A4.502 4.502 0 0 1 6.75 10.5v-7h10.5v7a4.502 4.502 0 0 1-3.336 4.373A1.503 1.503 0 0 0 12.002 16h-.004a1.503 1.503 0 0 0-1.912-1.127zM18.75 5v-1.25c0-.138.112-.25.25-.25h.825a.681.681 0 0 1 .675.675v.325a.5.5 0 0 1-.5.5h-1z" />
    </svg>
);

const DiamondIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12.015 1.5L2.835 8.16l4.605 14.34h9.12l4.605-14.34L12.015 1.5zm0 2.879l5.068 3.701H6.962l5.053-3.701zm-5.918 4.701h11.836l-3.328 10.38H9.42L6.097 9.08z" />
    </svg>
);

const CrownIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19C5 18.4477 5.44772 18 6 18H18C18.5523 18 19 18.4477 19 19Z" />
    </svg>
);




function PodiumStep({ player, rank, onClick }) {
    const isFirst = rank === 1;
    const isSecond = rank === 2;
    const isThird = rank === 3;

    let containerClass = "";
    let boxClass = "";
    let titleClass = "";
    let scoreClass = "";
    let avatarBorder = "";
    let rankBadgeClass = "";
    let statusText = "";
    let trophyColor = "";
    let rankIcon = null;

    if (isFirst) {
        // Champion - Center, Taller - CYAN Theme
        containerClass = "order-2 -mt-12 z-20";
        boxClass = "h-[420px] w-[340px] bg-gradient-to-b from-neutral-800 to-black shadow-[0_0_60px_-15px_rgba(34,211,238,0.2)] border-t border-cyan-500/30";
        titleClass = "text-white text-3xl font-bold mt-4 mb-4";
        scoreClass = "text-white text-5xl";
        avatarBorder = "border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.3)]";
        rankBadgeClass = "bg-cyan-400 text-black font-bold";
        statusText = "CHAMPION";
        trophyColor = "text-cyan-400";
        rankIcon = <CrownIcon className="w-8 h-8 text-cyan-400 absolute -top-10 left-1/2 -translate-x-1/2 animate-bounce" />;
    } else if (isSecond) {
        // Challenger - Left - PURPLE Theme
        containerClass = "order-1 mt-8 z-10";
        boxClass = "h-[360px] w-[300px] bg-neutral-900 shadow-[0_0_40px_-10px_rgba(168,85,247,0.15)] border-t border-purple-500/30 opacity-90";
        titleClass = "text-neutral-200 text-2xl font-bold mt-4 mb-4";
        scoreClass = "text-neutral-200 text-4xl";
        avatarBorder = "border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]";
        rankBadgeClass = "bg-purple-400 text-black font-bold";
        statusText = "CHALLENGER";
        trophyColor = "text-purple-400";
    } else if (isThird) {
        // Contender - Right - ORANGE Theme
        containerClass = "order-3 mt-8 z-10";
        boxClass = "h-[360px] w-[300px] bg-neutral-900 shadow-[0_0_40px_-10px_rgba(251,146,60,0.15)] border-t border-orange-500/30 opacity-80";
        titleClass = "text-neutral-200 text-2xl font-bold mt-4 mb-4";
        scoreClass = "text-neutral-200 text-4xl";
        avatarBorder = "border-orange-400 shadow-[0_0_20px_rgba(251,146,60,0.2)]";
        rankBadgeClass = "bg-orange-400 text-black font-bold";
        statusText = "CONTENDER";
        trophyColor = "text-orange-400";
    }

    return (
        <div
            onClick={onClick}
            className={`flex flex-col items-center w-full md:w-1/3 transition-all duration-300 hover:scale-[1.02] cursor-pointer rounded-3xl ${containerClass}`}
        >

            {/* Avatar Section */}
            <div className="relative mb-2 group">
                {isFirst && rankIcon}
                <div className={`w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-neutral-800 border-4 border-neutral-800 shadow-2xl flex items-center justify-center overflow-hidden relative z-10 ${avatarBorder}`}>
                    {player.avatar ? (
                        <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-3xl font-bold text-neutral-600">{player.name.charAt(0).toUpperCase()}</span>
                    )}
                </div>
                <div className={`absolute -bottom-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg z-20 ${rankBadgeClass}`}>
                    #{rank}
                </div>
            </div>

            <h3 className={titleClass}>{player.name}</h3>

            <div className={`relative rounded-3xl backdrop-blur-md flex flex-col items-center justify-start pt-6 pb-2 ${boxClass} overflow-hidden`}>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                <div className={`mb-2 p-2 rounded-2xl bg-black/50 border border-white/5 shadow-inner`}>
                    <TrophyIcon className={`w-6 h-6 ${trophyColor}`} />
                </div>

                <div className="text-neutral-500 text-sm font-medium mb-1 uppercase tracking-wider flex flex-col items-center">
                    <span className="text-[10px] opacity-60">Status</span>
                    <span className={isFirst ? 'text-cyan-400' : isSecond ? 'text-purple-400' : 'text-orange-400'}>
                        {statusText}
                    </span>
                </div>

                {/* Score Section */}
                <div className="flex flex-col items-center gap-1 mt-4 mb-4">
                    <div className="flex items-center gap-2">
                        <DiamondIcon className={`w-5 h-5 ${isFirst ? 'text-cyan-400' : isSecond ? 'text-purple-400' : 'text-orange-400'}`} />
                        <span className={`${scoreClass} font-black tracking-tighter`}>
                            {player.score.toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* Detailed Stats Grid - Footer */}
                <div className="grid grid-cols-3 gap-2 w-full px-4 border-t border-white/5 pt-8 mt-auto mb-8">
                    <div className="flex flex-col items-center group/stat">
                        <span className={`text-base font-bold text-neutral-400 transition-colors duration-300 group-hover:text-${isFirst ? 'cyan-400' : isSecond ? 'purple-400' : 'orange-400'}`}>
                            {player.kills}
                        </span>
                        <span className="text-[9px] text-neutral-600 uppercase font-bold tracking-wider">Kills</span>
                    </div>
                    <div className="flex flex-col items-center group/stat">
                        <span className={`text-base font-bold text-neutral-400 transition-colors duration-300 group-hover:text-${isFirst ? 'cyan-400' : isSecond ? 'purple-400' : 'orange-400'}`}>
                            {(player.damage / 1000).toFixed(1)}k
                        </span>
                        <span className="text-[9px] text-neutral-600 uppercase font-bold tracking-wider">Dmg</span>
                    </div>
                    <div className="flex flex-col items-center group/stat">
                        <span className={`text-base font-bold text-neutral-400 transition-colors duration-300 group-hover:text-${isFirst ? 'cyan-400' : isSecond ? 'purple-400' : 'orange-400'}`}>
                            %{player.hs_rate}
                        </span>
                        <span className="text-[9px] text-neutral-600 uppercase font-bold tracking-wider">HS%</span>
                    </div>
                </div>

                {isFirst && (
                    <div className="absolute bottom-1 flex flex-col items-center animate-pulse">
                        <span className="text-[9px] text-cyan-400/50 uppercase tracking-widest font-bold">Season 1</span>
                    </div>
                )}
            </div>
        </div>
    );
}

import CategoryLeaders from './CategoryLeaders';

function Leaders({ players, onPlayerSelect }) {
    if (!players || players.length < 3) return null;

    const sorted = [...players].sort((a, b) => b.score - a.score).slice(0, 3);

    return (
        <div className="w-full max-w-6xl mx-auto pt-10 pb-4 px-4">

            {/* Main Podium */}
            <div className="flex flex-col md:flex-row items-end justify-center gap-6 mb-16">
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