import React, { useState } from 'react';
import { Swords } from 'lucide-react';
import VersusModal from './VersusModal';

// --- ICONS (Simple SVGs) ---
const SortIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
    </svg>
);

function Table({ players, onPlayerSelect }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: 'score', direction: 'desc' });

    // Versus Mode State
    const [isVersusMode, setIsVersusMode] = useState(false);
    const [versusSelection, setVersusSelection] = useState([]); // [player1, player2]
    const [showVersusModal, setShowVersusModal] = useState(false);

    // Filter
    const filteredPlayers = players.filter(player =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort
    const sortedPlayers = [...filteredPlayers].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const requestSort = (key) => {
        let direction = 'descending';
        if (sortConfig.key === key && sortConfig.direction === 'descending') {
            direction = 'ascending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <SortIcon className="w-3 h-3 text-neutral-600 inline ml-1 opacity-0 group-hover:opacity-50 transition-opacity" />;
        return (
            <SortIcon className={`w-3 h-3 ml-1 inline transition-transform ${sortConfig.direction === 'ascending' ? 'rotate-180 text-white' : 'text-neutral-400'}`} />
        );
    };

    // --- VERSUS LOGIC ---
    const handleVersusToggle = (player) => {
        if (versusSelection.includes(player)) {
            setVersusSelection(prev => prev.filter(p => p !== player));
        } else {
            if (versusSelection.length < 2) {
                const newSelection = [...versusSelection, player];
                setVersusSelection(newSelection);
                if (newSelection.length === 2) {
                    setTimeout(() => setShowVersusModal(true), 300);
                }
            }
        }
    };

    const closeVersusData = () => {
        setShowVersusModal(false);
        setVersusSelection([]);
        setIsVersusMode(false);
    };

    return (
        <div className="w-full backdrop-blur-md bg-black/60 rounded-xl border border-white/10 shadow-2xl overflow-hidden relative transition-all duration-500">
            {/* Header Actions */}
            <div className="p-4 border-b border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-6 bg-white rounded-full"></span>
                        Player Rankings
                    </h2>

                    {/* Versus Toggle Button */}
                    <button
                        onClick={() => {
                            setIsVersusMode(!isVersusMode);
                            setVersusSelection([]);
                        }}
                        className={`
                            flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all
                            ${isVersusMode
                                ? 'bg-rose-500 text-white animate-heartbeat'
                                : 'bg-neutral-800 text-neutral-400 hover:bg-white/10 hover:text-white animate-heartbeat-gray'}
                        `}
                    >
                        <Swords className="w-4 h-4" />
                        {isVersusMode ? `Select Players (${versusSelection.length}/2)` : 'Versus Mode'}
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Search player..."
                    className="bg-neutral-900/80 border border-neutral-800 text-neutral-200 text-sm rounded-lg focus:ring-white focus:border-white block w-full md:w-64 p-2.5 placeholder-neutral-500 transition-all hover:bg-neutral-800"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto px-2">
                <table className="w-full text-left border-separate border-spacing-y-2">
                    <thead>
                        <tr className="bg-neutral-900/80 text-neutral-500 text-xs uppercase tracking-wider">
                            {isVersusMode && <th className="p-4 w-10">VS</th>}
                            <th className="p-4 text-center w-16 cursor-pointer hover:text-white transition-colors" onClick={() => requestSort('name')}>
                                Rank
                            </th>
                            <th className="p-4 cursor-pointer hover:text-white transition-colors" onClick={() => requestSort('name')}>
                                Player {getSortIcon('name')}
                            </th>
                            <th className="p-4 text-right text-white cursor-pointer hover:text-neutral-300 transition-colors" onClick={() => requestSort('score')}>
                                Score {getSortIcon('score')}
                            </th>
                            <th className="p-4 text-right cursor-pointer hover:text-white transition-colors" onClick={() => requestSort('kills')}>
                                Kills {getSortIcon('kills')}
                            </th>
                            <th className="p-4 text-right cursor-pointer hover:text-white transition-colors" onClick={() => requestSort('damage')}>
                                Dmg {getSortIcon('damage')}
                            </th>
                            <th className="p-4 text-right cursor-pointer hover:text-white transition-colors" onClick={() => requestSort('hs_rate')}>
                                HS% {getSortIcon('hs_rate')}
                            </th>
                            <th className="p-4 text-right text-neutral-400 cursor-pointer hover:text-white transition-colors" onClick={() => requestSort('wins')}>
                                Wins {getSortIcon('wins')}
                            </th>
                            <th className="p-4 text-right text-neutral-400 cursor-pointer hover:text-white transition-colors" onClick={() => requestSort('mvps')}>
                                MVPs {getSortIcon('mvps')}
                            </th>
                            <th className="p-4 text-right text-neutral-400 cursor-pointer hover:text-white transition-colors" onClick={() => requestSort('deaths')}>
                                Deaths {getSortIcon('deaths')}
                            </th>
                            <th className="p-4 text-right cursor-pointer hover:text-white transition-colors" onClick={() => requestSort('rounds')}>
                                Rounds {getSortIcon('rounds')}
                            </th>
                            <th className="p-4 text-center">Weapon</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {sortedPlayers.map((player, index) => {
                            // Rank Styling Logic - Accent Colors
                            let rowStyle = "bg-neutral-900/40 border border-white/5 hover:bg-neutral-800/80";
                            let rankTextStyle = "text-neutral-500 font-mono font-bold";
                            let scoreColor = "text-white";
                            let rankDisplay = index + 1;

                            if (index === 0) { // Rank 1: Cyan
                                rowStyle = "bg-gradient-to-r from-cyan-900/20 to-black/80 border-l-4 border-l-cyan-500 border-y border-r border-white/5 shadow-[0_0_20px_rgba(34,211,238,0.05)] scale-[1.01] z-10 relative";
                                rankTextStyle = "text-cyan-400 font-black text-3xl italic drop-shadow-sm";
                                scoreColor = "text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]";
                            } else if (index === 1) { // Rank 2: Purple
                                rowStyle = "bg-gradient-to-r from-purple-900/20 to-black/50 border-l-4 border-l-purple-500 border-y border-r border-white/5";
                                rankTextStyle = "text-purple-400 font-bold text-2xl italic";
                                scoreColor = "text-purple-400";
                            } else if (index === 2) { // Rank 3: Orange
                                rowStyle = "bg-gradient-to-r from-orange-900/20 to-black/50 border-l-4 border-l-orange-500 border-y border-r border-white/5";
                                rankTextStyle = "text-orange-400 font-bold text-2xl italic";
                                scoreColor = "text-orange-400";
                            }

                            // Versus Selection Style
                            const isSelected = versusSelection.includes(player);
                            if (isSelected) {
                                rowStyle += " ring-2 ring-rose-500 bg-rose-500/10";
                            }
                            const isDimmed = isVersusMode && versusSelection.length === 2 && !isSelected;
                            if (isDimmed) {
                                rowStyle += " opacity-30 grayscale";
                            }

                            // Rating Logic
                            const getRating = (score) => {
                                if (score >= 100) return <span title="Legendary" className="text-red-500 text-sm ml-2 filter drop-shadow hover:scale-125 transition-transform cursor-help">🔥</span>;
                                if (score >= 80) return <span title="Good" className="text-green-500 text-xs ml-2 hover:scale-125 transition-transform cursor-help">🟢</span>;
                                if (score >= 50) return <span title="Average" className="text-yellow-500 text-xs ml-2 hover:scale-125 transition-transform cursor-help">🟡</span>;
                                return <span title="Needs Improvement" className="text-neutral-500 text-xs ml-2 grayscale opacity-50 hover:scale-125 transition-transform cursor-help">⚪</span>;
                            };

                            return (
                                <tr
                                    key={player.name}
                                    className={`transition-all duration-300 group rounded-xl cursor-pointer ${rowStyle}`}
                                    onClick={() => isVersusMode ? handleVersusToggle(player) : onPlayerSelect(player)}
                                >
                                    {isVersusMode && (
                                        <td className="p-4 text-center rounded-l-xl">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-rose-500 bg-rose-500' : 'border-neutral-600 group-hover:border-white'}`}>
                                                {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                            </div>
                                        </td>
                                    )}

                                    <td className={`p-4 text-center ${!isVersusMode && 'rounded-l-xl'}`}>
                                        <span className={rankTextStyle}>#{rankDisplay}</span>
                                    </td>

                                    {/* --- AVATAR & NAME COLUMN --- */}
                                    <td className="p-4 flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden bg-neutral-800 border border-neutral-700 group-hover:border-white/50 transition-colors`}>
                                            {player.avatar ? (
                                                <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-xs font-bold text-neutral-400">
                                                    {player.name.charAt(0).toUpperCase()}
                                                </span>
                                            )}
                                        </div>
                                        <span className={`font-semibold text-neutral-200 group-hover:text-white transition-colors`}>
                                            {player.name}
                                        </span>
                                    </td>

                                    <td className={`p-4 text-right font-black text-lg tabular-nums ${scoreColor}`}>
                                        <div className="flex items-center justify-end">
                                            {player.score}
                                            {getRating(player.score)}
                                        </div>
                                    </td>
                                    <td className="p-4 text-right font-mono text-neutral-400 tabular-nums">{player.kills}</td>
                                    <td className="p-4 text-right font-mono text-neutral-400 tabular-nums">{player.damage.toLocaleString()}</td>
                                    <td className="p-4 text-right font-mono text-neutral-400 tabular-nums">{player.hs_rate}%</td>
                                    <td className="p-4 text-right font-mono text-neutral-400 font-bold tabular-nums">{player.wins}</td>
                                    <td className="p-4 text-right font-mono text-neutral-500 tabular-nums">{player.mvps}</td>
                                    <td className="p-4 text-right font-mono text-neutral-500 tabular-nums">{player.deaths}</td>
                                    <td className="p-4 text-right font-mono text-neutral-600 tabular-nums">{player.rounds}</td>
                                    <td className="p-4 text-center text-xs font-mono text-neutral-500 group-hover:text-white transition-colors rounded-r-xl">
                                        {player.fav_weapon}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* --- VERSUS MODAL --- */}
            {showVersusModal && (
                <VersusModal
                    player1={versusSelection[0]}
                    player2={versusSelection[1]}
                    onClose={closeVersusData}
                />
            )}
        </div>
    );
}

export default Table;