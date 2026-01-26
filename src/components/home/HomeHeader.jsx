import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';

function HomeHeader({ meta }) {
    return (
        <header className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-200 to-neutral-600 tracking-tighter drop-shadow-sm">
                    CS2 LEADERBOARD
                </h1>
                <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-white/10 text-white text-xs font-bold rounded uppercase tracking-wider border border-white/10">
                        Season 1
                    </span>
                    <p className="text-neutral-400 font-medium">
                        Community Competitive Statistics
                    </p>

                    {/* Hall of Fame Link */}
                    <Link to="/hall-of-fame" className="ml-4 flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors text-xs font-bold uppercase tracking-widest px-3 py-1 bg-yellow-900/10 border border-yellow-500/20 rounded-full hover:bg-yellow-900/20 group">
                        <Trophy className="w-3 h-3 group-hover:scale-110 transition-transform" />
                        Hall of Fame
                    </Link>
                </div>
            </div>
            <div className="text-right mt-6 md:mt-0 flex flex-col items-end">
                <div className="text-xs text-neutral-500 uppercase font-bold tracking-widest mb-1">Last Data Sync</div>
                <div className="flex items-center gap-2 bg-neutral-900/80 px-4 py-2 rounded-lg border border-white/10">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    <span className="text-sm font-mono text-neutral-300">{meta.last_updated}</span>
                </div>
            </div>
        </header>
    );
}

export default HomeHeader;
