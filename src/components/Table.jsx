import React, { useState } from 'react';

function Table({ players }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'score', direction: 'desc' });

    // 1. Search Filter
    const filteredPlayers = players.filter((player) =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 2. Sorting
    const sortedPlayers = [...filteredPlayers].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const requestSort = (key) => {
        let direction = 'desc';
        if (sortConfig.key === key && sortConfig.direction === 'desc') {
            direction = 'asc';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <span className="text-slate-600 ml-1">↕</span>;
        return sortConfig.direction === 'asc' ? <span className="text-yellow-500 ml-1">↑</span> : <span className="text-yellow-500 ml-1">↓</span>;
    };

    return (
        <div className="w-full backdrop-blur-md bg-slate-900/60 rounded-xl border border-slate-700/50 shadow-2xl overflow-hidden">
            {/* Header Actions */}
            <div className="p-4 border-b border-slate-700/50 flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <span className="w-2 h-6 bg-yellow-500 rounded-full"></span>
                    Player Rankings
                </h2>
                <input
                    type="text"
                    placeholder="Search player..."
                    className="bg-slate-800/80 border border-slate-600 text-slate-200 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full md:w-64 p-2.5 placeholder-slate-500 transition-all hover:bg-slate-800"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-800/80 text-slate-400 text-xs uppercase tracking-wider">
                            <th className="p-4 text-center w-16 cursor-pointer hover:text-slate-200 transition-colors" onClick={() => requestSort('name')}>
                                Rank
                            </th>
                            <th className="p-4 cursor-pointer hover:text-slate-200 transition-colors" onClick={() => requestSort('name')}>
                                Player {getSortIcon('name')}
                            </th>
                            <th className="p-4 text-right text-yellow-500 cursor-pointer hover:text-yellow-300 transition-colors" onClick={() => requestSort('score')}>
                                Score {getSortIcon('score')}
                            </th>
                            <th className="p-4 text-right cursor-pointer hover:text-slate-200 transition-colors" onClick={() => requestSort('kills')}>
                                Kills {getSortIcon('kills')}
                            </th>
                            <th className="p-4 text-right cursor-pointer hover:text-slate-200 transition-colors" onClick={() => requestSort('damage')}>
                                Dmg {getSortIcon('damage')}
                            </th>
                            <th className="p-4 text-right cursor-pointer hover:text-slate-200 transition-colors" onClick={() => requestSort('hs_rate')}>
                                HS% {getSortIcon('hs_rate')}
                            </th>
                            <th className="p-4 text-right text-green-400 cursor-pointer hover:text-green-300 transition-colors" onClick={() => requestSort('wins')}>
                                Wins {getSortIcon('wins')}
                            </th>
                            <th className="p-4 text-right text-blue-400 cursor-pointer hover:text-blue-300 transition-colors" onClick={() => requestSort('mvps')}>
                                MVPs {getSortIcon('mvps')}
                            </th>
                            <th className="p-4 text-right text-red-400 cursor-pointer hover:text-red-300 transition-colors" onClick={() => requestSort('deaths')}>
                                Deaths {getSortIcon('deaths')}
                            </th>
                            <th className="p-4 text-right cursor-pointer hover:text-slate-200 transition-colors" onClick={() => requestSort('rounds')}>
                                Rounds {getSortIcon('rounds')}
                            </th>
                            <th className="p-4 text-center">Weapon</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                        {sortedPlayers.map((player, index) => {
                            const isTop3 = index < 3 && sortConfig.key === 'score' && sortConfig.direction === 'desc';

                            return (
                                <tr
                                    key={player.name}
                                    className={`group hover:bg-slate-700/30 transition-all duration-200 ${isTop3 ? 'bg-gradient-to-r from-slate-800/40 to-slate-800/10' : ''}`}
                                >
                                    <td className="p-4 text-center font-mono font-bold text-slate-500 group-hover:text-slate-300">
                                        {index + 1}
                                    </td>

                                    {/* --- AVATAR & NAME SÜTUNU (GÜNCELLENDİ) --- */}
                                    <td className="p-4 flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden bg-slate-700 border border-slate-600 group-hover:border-yellow-500/50 transition-colors`}>
                                            {player.avatar ? (
                                                <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-xs font-bold text-slate-300">
                                                    {player.name.charAt(0).toUpperCase()}
                                                </span>
                                            )}
                                        </div>
                                        <span className={`font-semibold text-slate-200 group-hover:text-white transition-colors`}>
                                            {player.name}
                                        </span>
                                    </td>

                                    <td className="p-4 text-right font-black text-lg text-yellow-500 tabular-nums shadow-yellow-500/10 drop-shadow-sm">
                                        {player.score}
                                    </td>
                                    <td className="p-4 text-right font-mono text-slate-300 tabular-nums">{player.kills}</td>
                                    <td className="p-4 text-right font-mono text-slate-300 tabular-nums">{player.damage.toLocaleString()}</td>
                                    <td className="p-4 text-right font-mono text-slate-300 tabular-nums">{player.hs_rate}%</td>
                                    <td className="p-4 text-right font-mono text-green-400 font-bold tabular-nums">{player.wins}</td>
                                    <td className="p-4 text-right font-mono text-blue-400 tabular-nums">{player.mvps}</td>
                                    <td className="p-4 text-right font-mono text-red-400 tabular-nums">{player.deaths}</td>
                                    <td className="p-4 text-right font-mono text-slate-500 tabular-nums">{player.rounds}</td>
                                    <td className="p-4 text-center text-xs font-mono text-slate-400 group-hover:text-yellow-400 transition-colors">
                                        {player.fav_weapon}
                                    </td>
                                </tr>
                            );
                        })}

                        {sortedPlayers.length === 0 && (
                            <tr>
                                <td colSpan="11" className="p-8 text-center text-slate-500">
                                    No players found matching "{searchTerm}"
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;