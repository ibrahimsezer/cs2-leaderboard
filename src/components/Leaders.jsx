import React from 'react';

// SVG Icons
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

function PodiumStep({ player, rank }) {
    // Styles based on rank
    const isFirst = rank === 1;
    const isSecond = rank === 2;
    const isThird = rank === 3;

    // Podium Height & Color config
    // 1st place taller + brighter gradient
    // 2nd and 3rd shorter + darker gradient
    let containerClasses = "";
    let podiumHeight = "";
    let iconColor = "";
    let glowColor = "";
    let rankIcon = null;

    if (isFirst) {
        containerClasses = "order-2 md:-mt-12 z-10 w-full md:w-1/3";
        podiumHeight = "h-80 md:h-96"; // Taller box
        iconColor = "text-yellow-400";
        glowColor = "shadow-[0_0_50px_rgba(234,179,8,0.3)]";
        rankIcon = <CrownIcon className="w-8 h-8 text-yellow-500 absolute -top-10 left-1/2 -translate-x-1/2 animate-bounce" />;
    } else if (isSecond) {
        containerClasses = "order-1 w-full md:w-1/3 mt-4 md:mt-0";
        podiumHeight = "h-64 md:h-72";
        iconColor = "text-slate-300";
        glowColor = "shadow-[0_0_30px_rgba(148,163,184,0.1)]";
    } else if (isThird) {
        containerClasses = "order-3 w-full md:w-1/3 mt-4 md:mt-0";
        podiumHeight = "h-64 md:h-72"; // Same as 2nd basically, maybe slightly different look if desired
        iconColor = "text-orange-400";
        glowColor = "shadow-[0_0_30px_rgba(251,146,60,0.1)]";
    }

    return (
        <div className={`flex flex-col items-center ${containerClasses} transition-all duration-300 hover:scale-[1.02]`}>

            {/* Avatar Section (Floating above the podium) */}
            <div className="relative mb-4 group cursor-pointer">
                {/* Crown for #1 */}
                {isFirst && rankIcon}

                {/* Avatar Container */}
                <div className={`w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-slate-800 border-4 border-slate-700/50 shadow-2xl flex items-center justify-center overflow-hidden relative z-10 ${glowColor}`}>
                    {/* Placeholder Image Logic - User will replace this or image src */}
                    <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center text-slate-500">
                        <span className="text-4xl font-bold">{player.name.charAt(0).toUpperCase()}</span>
                        <span className="text-[10px] mt-1 uppercase">Avatar</span>
                    </div>
                    {/* Real Image Tag Example (Uncomment when ready)
                 <img src={player.avatarUrl} alt={player.name} className="w-full h-full object-cover" />
                 */}
                </div>

                {/* Rank Badge visible on avatar corner? Or just implied by position */}
                <div className={`absolute -bottom-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-slate-900 border-2 border-slate-600 z-20 ${iconColor}`}>
                    #{rank}
                </div>
            </div>

            {/* Player Name */}
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 text-center tracking-tight">
                {player.name}
            </h3>

            {/* The "Box" / Podium Base */}
            <div className={`
            relative w-full rounded-t-3xl border-t border-x border-white/10 
            bg-gradient-to-b from-slate-800/80 via-slate-900/90 to-slate-950/90 
            backdrop-blur-md flex flex-col items-center justify-start pt-8 pb-4
            ${podiumHeight}
            ${isFirst ? 'from-indigo-900/40 via-slate-900/90' : ''}
            shadow-2xl overflow-hidden
        `}>
                {/* Top Gloss/Light effect */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                {/* Trophy Icon Container */}
                <div className={`mb-4 p-3 rounded-2xl bg-slate-950/50 border border-white/5 shadow-inner`}>
                    <TrophyIcon className={`w-8 h-8 ${iconColor}`} />
                </div>

                {/* Smaller secondary stat (e.g. Wins or Title) */}
                <div className="text-slate-400 text-sm font-medium mb-6 uppercase tracking-wider flex flex-col items-center">
                    <span className="text-xs opacity-60">Status</span>
                    <span className={iconColor === 'text-yellow-400' ? 'text-yellow-200' : 'text-slate-300'}>
                        {isFirst ? 'Champion' : isSecond ? 'Challenger' : 'Contender'}
                    </span>
                </div>

                {/* Main Score / "Prize" look */}
                <div className="flex flex-col items-center gap-1 mt-auto mb-12">
                    <div className="flex items-center gap-2">
                        <DiamondIcon className={`w-6 h-6 ${isFirst ? 'text-blue-400' : 'text-blue-500/70'}`} />
                        <span className={`text-3xl md:text-4xl font-black tracking-tighter ${isFirst ? 'text-white' : 'text-slate-200'}`}>
                            {player.score.toLocaleString()}
                        </span>
                    </div>
                    <span className="text-blue-400/60 text-xs font-bold uppercase tracking-[0.2em]">Score</span>
                </div>

                {/* Bottom fading detail or styling */}
                {isFirst && (
                    <div className="absolute bottom-6 flex flex-col items-center animate-pulse">
                        <span className="text-[10px] text-slate-500 uppercase">Season 1</span>
                    </div>
                )}
            </div>
        </div>
    );
}

function Leaders({ players }) {
    if (!players || players.length < 3) return null;

    // Sorting Top 3
    const sorted = [...players].sort((a, b) => b.score - a.score).slice(0, 3);

    // Podium Order in Array: [Rank 2, Rank 1, Rank 3] visual order handled by Flex Order classes or manual placement
    // Actually in the Component Logic above:
    // Rank 1 has `order-2` (Center)
    // Rank 2 has `order-1` (Left)
    // Rank 3 has `order-3` (Right)
    // We can just map through them and let the component handle the positioning based on rank.

    return (
        <div className="w-full max-w-5xl mx-auto pt-10 pb-0 px-4">
            <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-6">
                {/* Pass Rank explicitly because loop index might not match visual rank if we map straight */}
                {/* We want to render them so flex handles order. Let's just render the sorted array and pass (index + 1) as rank */}

                {sorted.map((player, index) => (
                    <PodiumStep key={player.name} player={player} rank={index + 1} />
                ))}
            </div>
        </div>
    );
}

export default Leaders;
