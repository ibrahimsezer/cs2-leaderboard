import React from 'react';

function ServerStats({ serverStats }) {
    return (
        <section className="max-w-6xl mx-auto mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-neutral-900/40 border border-white/5 p-6 rounded-xl flex flex-col items-center justify-center hover:bg-neutral-900/80 transition-colors cursor-default group">
                    <span className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-2 group-hover:text-white transition-colors">Total Kills</span>
                    <span className="text-3xl font-black text-white font-mono">{serverStats.totalKills.toLocaleString()}</span>
                </div>
                <div className="bg-neutral-900/40 border border-white/5 p-6 rounded-xl flex flex-col items-center justify-center hover:bg-neutral-900/80 transition-colors cursor-default group">
                    <span className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-2 group-hover:text-white transition-colors">Total Damage</span>
                    <span className="text-3xl font-black text-white font-mono">{(serverStats.totalDamage / 1000).toFixed(1)}k</span>
                </div>
                <div className="bg-neutral-900/40 border border-white/5 p-6 rounded-xl flex flex-col items-center justify-center hover:bg-neutral-900/80 transition-colors cursor-default group">
                    <span className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-2 group-hover:text-white transition-colors">Total Wins</span>
                    <span className="text-3xl font-black text-white font-mono">{serverStats.totalWins}</span>
                </div>
                <div className="bg-neutral-900/40 border border-white/5 p-6 rounded-xl flex flex-col items-center justify-center hover:bg-neutral-900/80 transition-colors cursor-default group">
                    <span className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-2 group-hover:text-white transition-colors">Total MVPs</span>
                    <span className="text-3xl font-black text-white font-mono">{serverStats.totalMvps}</span>
                </div>
            </div>
        </section>
    );
}

export default ServerStats;
