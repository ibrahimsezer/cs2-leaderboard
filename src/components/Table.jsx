
import React, { useState, useMemo } from 'react';
import {
    Swords,
    Trophy,
    Skull,
    Crosshair,
    Zap,
    Shield,
    Activity,
    Target,
    Search,
    Filter,
    ChevronDown,
    Ghost
} from 'lucide-react';
import VersusModal from './VersusModal';

// --- ICONS (Simple SVGs) ---
const SortIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
    </svg>
);

function Table({ players, onPlayerSelect }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [weaponFilter, setWeaponFilter] = useState("All");
    const [sortConfig, setSortConfig] = useState({ key: 'score', direction: 'desc' });

    // Versus Mode State
    const [isVersusMode, setIsVersusMode] = useState(false);
    const [versusSelection, setVersusSelection] = useState([]); // [player1, player2]
    const [showVersusModal, setShowVersusModal] = useState(false);

    // Extract Unique Weapons for Filter
    const uniqueWeapons = useMemo(() => {
        const weapons = players.map(p => p.fav_weapon).filter(Boolean);
        return ["All", ...new Set(weapons)];
    }, [players]);

    // Filter
    const filteredPlayers = useMemo(() => {
        return players.filter(player => {
            const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesWeapon = weaponFilter === "All" || player.fav_weapon === weaponFilter;
            return matchesSearch && matchesWeapon;
        });
    }, [players, searchTerm, weaponFilter]);

    // Sort
    const sortedPlayers = useMemo(() => {
        return [...filteredPlayers].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }, [filteredPlayers, sortConfig]);

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

    // --- COLUMN CONFIG ---
    const columns = [
        { key: 'name', label: 'Player', icon: null, align: 'left', color: 'text-white' },
        { key: 'score', label: 'Score', icon: <Activity size={14} className="text-blue-400" />, align: 'right', color: 'text-blue-400' },
        { key: 'kills', label: 'Kills', icon: <Skull size={14} className="text-red-400" />, align: 'right', color: 'text-red-400' },
        { key: 'damage', label: 'Dmg', icon: <Zap size={14} className="text-yellow-400" />, align: 'right', color: 'text-yellow-400' },
        { key: 'hs_rate', label: 'HS%', icon: <Crosshair size={14} className="text-cyan-400" />, align: 'right', color: 'text-cyan-400' },
        { key: 'wins', label: 'Wins', icon: <Trophy size={14} className="text-green-400" />, align: 'right', color: 'text-green-400' },
        { key: 'mvps', label: 'MVPs', icon: <Target size={14} className="text-purple-400" />, align: 'right', color: 'text-purple-400' },
        { key: 'deaths', label: 'Deaths', icon: <Ghost size={14} className="text-neutral-500" />, align: 'right', color: 'text-neutral-500' },
        { key: 'rounds', label: 'Rounds', icon: <Shield size={14} className="text-orange-400" />, align: 'right', color: 'text-orange-400' },
    ];

    return (
        <div className="w-full backdrop-blur-md bg-black/60 rounded-xl border border-white/10 shadow-2xl overflow-hidden relative transition-all duration-500">
            {/* Header Actions */}
            <div className="p-4 md:p-6 border-b border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></span>
                        Player Rankings
                    </h2>

                    {/* Versus Toggle Button (Mobile Optimized) */}
                    <button
                        onClick={() => {
                            setIsVersusMode(!isVersusMode);
                            setVersusSelection([]);
                        }}
                        className={`
                            flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all
                            ${isVersusMode
                                ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                                : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white'}
                        `}
                    >
                        <Swords className="w-3.5 h-3.5" />
                        {isVersusMode ? `Select (${versusSelection.length}/2)` : 'Versus'}
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                    {/* Weapon Filter */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Filter size={14} className="text-neutral-500 group-hover:text-neutral-300 transition-colors" />
                        </div>
                        <select
                            value={weaponFilter}
                            onChange={(e) => setWeaponFilter(e.target.value)}
                            className="bg-neutral-900/80 border border-neutral-800 text-neutral-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-9 pr-8 py-2.5 appearance-none cursor-pointer hover:bg-neutral-800 transition-colors"
                        >
                            {uniqueWeapons.map(w => <option key={w} value={w}>{w === 'All' ? 'All Weapons' : w}</option>)}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <ChevronDown size={14} className="text-neutral-500" />
                        </div>
                    </div>

                    {/* Search Input */}
                    <div className="relative group w-full md:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={14} className="text-neutral-500 group-hover:text-neutral-300 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search player..."
                            className="bg-neutral-900/80 border border-neutral-800 text-neutral-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-9 p-2.5 placeholder-neutral-600 transition-all hover:bg-neutral-800"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto px-2 pb-2">
                <table className="w-full text-left border-separate border-spacing-y-1">
                    <thead>
                        <tr className="text-neutral-500 text-[10px] md:text-xs uppercase tracking-wider font-bold">
                            {isVersusMode && <th className="p-3 w-10 text-center">VS</th>}
                            <th className="p-3 text-center w-14 cursor-pointer hover:text-white transition-colors" onClick={() => requestSort('name')}>
                                Rank
                            </th>

                            {columns.map(col => (
                                <th
                                    key={col.key}
                                    className={`p-3 cursor-pointer hover:text-white transition-colors group ${col.align === 'right' ? 'text-right' : 'text-left'}`}
                                    onClick={() => requestSort(col.key)}
                                >
                                    <div className={`flex items-center gap-1.5 ${col.align === 'right' ? 'justify-end' : 'justify-start'}`}>
                                        {col.icon}
                                        {col.label}
                                        {getSortIcon(col.key)}
                                    </div>
                                </th>
                            ))}
                            <th className="p-3 text-center">Weapon</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {sortedPlayers.map((player, index) => {
                            // Rank Styling Logic - Accent Colors
                            let rowStyle = "bg-neutral-900/40 hover:bg-neutral-800/80 border border-transparent";
                            let rankTextStyle = "text-neutral-500 font-mono font-bold";
                            let scoreColor = "text-white";
                            let rankDisplay = index + 1;

                            if (index === 0) { // Rank 1
                                rowStyle = "bg-gradient-to-r from-yellow-900/20 to-black/80 border-l-2 border-l-yellow-500 hover:to-neutral-900";
                                rankTextStyle = "text-yellow-400 font-black text-xl italic";
                                scoreColor = "text-yellow-400";
                            } else if (index === 1) { // Rank 2
                                rowStyle = "bg-gradient-to-r from-slate-800/20 to-black/80 border-l-2 border-l-slate-400 hover:to-neutral-900";
                                rankTextStyle = "text-slate-300 font-bold text-lg italic";
                                scoreColor = "text-slate-200";
                            } else if (index === 2) { // Rank 3
                                rowStyle = "bg-gradient-to-r from-orange-900/20 to-black/80 border-l-2 border-l-orange-500 hover:to-neutral-900";
                                rankTextStyle = "text-orange-400 font-bold text-lg italic";
                                scoreColor = "text-orange-300";
                            }

                            // Versus Selection Style
                            const isSelected = versusSelection.includes(player);
                            if (isSelected) {
                                rowStyle = "ring-1 ring-rose-500 bg-rose-500/10 border-rose-500/30";
                            }
                            const isDimmed = isVersusMode && versusSelection.length === 2 && !isSelected;
                            if (isDimmed) {
                                rowStyle += " opacity-20 grayscale pointer-events-none";
                            }

                            return (
                                <tr
                                    key={player.name}
                                    className={`transition-all duration-200 cursor-pointer rounded-lg group ${rowStyle}`}
                                    onClick={() => isVersusMode ? handleVersusToggle(player) : onPlayerSelect(player)}
                                >
                                    {isVersusMode && (
                                        <td className="p-3 text-center rounded-l-lg">
                                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-rose-500 bg-rose-500' : 'border-neutral-600 group-hover:border-white'}`}>
                                                {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                                            </div>
                                        </td>
                                    )}

                                    <td className={`p-3 text-center ${!isVersusMode && 'rounded-l-lg'}`}>
                                        <span className={rankTextStyle}>#{rankDisplay}</span>
                                    </td>

                                    {/* Name */}
                                    <td className="p-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden bg-neutral-800 border border-neutral-700 group-hover:border-white/30 transition-colors`}>
                                                {player.avatar ? (
                                                    <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-xs font-bold text-neutral-400">
                                                        {player.name.charAt(0).toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                            <span className={`font-semibold text-sm text-neutral-200 group-hover:text-white transition-colors`}>
                                                {player.name}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Score */}
                                    <td className={`p-3 text-right font-black text-base tabular-nums ${scoreColor}`}>
                                        {player.score}
                                    </td>

                                    {/* Other Stats */}
                                    {columns.slice(2).map(col => (
                                        <td key={col.key} className={`p-3 text-right font-mono text-sm tabular-nums text-neutral-400 group-hover:text-neutral-200 ${col.key === 'kills' ? 'font-bold' : ''}`}>
                                            {col.key === 'damage' ? player[col.key].toLocaleString() : player[col.key]}
                                            {col.key === 'hs_rate' && '%'}
                                        </td>
                                    ))}

                                    <td className="p-3 text-center text-xs font-mono text-neutral-500 group-hover:text-white transition-colors rounded-r-lg uppercase">
                                        <span className="px-2 py-1 rounded bg-white/5 border border-white/5">
                                            {player.fav_weapon}
                                        </span>
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
