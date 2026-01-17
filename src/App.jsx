import React, { useMemo } from 'react';
import leaderboardData from './data.json';
import Table from './components/Table';
import Leaders from './components/Leaders';

function App() {
  const { meta, players } = leaderboardData;

  // Calculate Aggregated Stats for a "Server Stats" banner
  const serverStats = useMemo(() => {
    return players.reduce((acc, curr) => ({
      totalKills: acc.totalKills + curr.kills,
      totalDeaths: acc.totalDeaths + curr.deaths,
      totalWins: acc.totalWins + curr.wins,
      totalMvps: acc.totalMvps + curr.mvps,
      totalDamage: acc.totalDamage + curr.damage
    }), { totalKills: 0, totalDeaths: 0, totalWins: 0, totalMvps: 0, totalDamage: 0 });
  }, [players]);

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 font-sans relative overflow-x-hidden selection:bg-yellow-500/30">

      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="./public/bg-hero.png"
          alt="Background"
          className="w-full h-[600px] object-cover opacity-20 mask-image-gradient"
          style={{ maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/80 to-slate-900"></div>
      </div>

      <div className="relative z-10 px-4 py-8 md:p-10">

        {/* --- HEADER --- */}
        <header className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-end border-b border-slate-700/50 pb-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-orange-600 tracking-tighter drop-shadow-sm">
              CS2 LEADERBOARD
            </h1>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 text-xs font-bold rounded uppercase tracking-wider border border-yellow-500/20">
                Season 1
              </span>
              <p className="text-slate-400 font-medium">
                Community Competitive Statistics
              </p>
            </div>
          </div>
          <div className="text-right mt-6 md:mt-0 flex flex-col items-end">
            <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Last Data Sync</div>
            <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-lg border border-slate-700">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-mono text-slate-200">{meta.last_updated}</span>
            </div>
          </div>
        </header>

        {/* --- LEADERS COMPONENT (Top 3) --- */}
        <section className="mb-16 animate-fade-in-up">
          <Leaders players={players} />
        </section>

        {/* --- SERVER STATS BANNER (New Feature) --- */}
        <section className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-xl flex flex-col items-center justify-center hover:bg-slate-800/60 transition-colors cursor-default group">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2 group-hover:text-yellow-500 transition-colors">Total Kills</span>
              <span className="text-3xl font-black text-white font-mono">{serverStats.totalKills.toLocaleString()}</span>
            </div>
            <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-xl flex flex-col items-center justify-center hover:bg-slate-800/60 transition-colors cursor-default group">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2 group-hover:text-red-500 transition-colors">Total Damage</span>
              <span className="text-3xl font-black text-white font-mono">{(serverStats.totalDamage / 1000).toFixed(1)}k</span>
            </div>
            <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-xl flex flex-col items-center justify-center hover:bg-slate-800/60 transition-colors cursor-default group">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2 group-hover:text-green-500 transition-colors">Total Wins</span>
              <span className="text-3xl font-black text-white font-mono">{serverStats.totalWins}</span>
            </div>
            <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-xl flex flex-col items-center justify-center hover:bg-slate-800/60 transition-colors cursor-default group">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2 group-hover:text-blue-500 transition-colors">Total MVPs</span>
              <span className="text-3xl font-black text-white font-mono">{serverStats.totalMvps}</span>
            </div>
          </div>
        </section>

        {/* --- TABLE COMPONENT --- */}
        <main className="max-w-6xl mx-auto mb-20 animate-fade-in-up delay-200">
          <Table players={players} />
        </main>

        <footer className="max-w-6xl mx-auto text-center text-slate-600 text-sm border-t border-slate-800 pt-8 pb-8">
          <p className="flex items-center justify-center gap-2">
            <span>Powered by</span>
            <span className="font-bold text-slate-500">Antigravity AI</span>
            <span>&bull;</span>
            <span>CS2 Community Leaderboard</span>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;