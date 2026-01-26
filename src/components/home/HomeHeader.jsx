
import { Link } from 'react-router-dom';
import { Trophy, Clock, Zap } from 'lucide-react';

function HomeHeader({ meta }) {
    return (
        <header className="relative max-w-7xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-end border-b-2 border-orange-500/20 pb-6 bg-gradient-to-b from-transparent to-neutral-900/50 pt-8 px-4 md:px-0">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-50%] left-[-10%] w-[50%] h-[100%] bg-blue-600/5 blur-[120px] rounded-full mix-blend-screen"></div>
                <div className="absolute bottom-[-20%] right-[-5%] w-[40%] h-[80%] bg-orange-600/5 blur-[100px] rounded-full mix-blend-screen"></div>
            </div>

            <div className="flex flex-col gap-4 relative">
                {/* Title Area */}
                <div className="group relative">
                    <h1 className="text-6xl font-black italic tracking-tighter text-white uppercase flex items-center gap-2">
                        <div className="w-2 h-8"></div>
                        CS2 <span className="text-orange-500">Leaderboard</span>
                    </h1>
                    {/* Glitch/shine effect line */}
                    <div className="absolute -bottom-2 left-0 w-24 h-1 bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.8)]"></div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-2">
                    {/* Season Badge */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-600 opacity-80 blur-md rounded group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative px-6 py-2 bg-gradient-to-r from-neutral-900 to-neutral-800 border border-orange-500/30 rounded skew-x-12 flex items-center justify-center overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                            <span className="-skew-x-12 text-orange-50 font-black uppercase tracking-widest text-sm flex items-center gap-2">
                                <Zap size={14} className="text-yellow-400 fill-yellow-400" />
                                Season 1
                            </span>
                        </div>
                    </div>

                    <p className="text-neutral-400 font-medium tracking-wide border-l border-white/10 pl-4 uppercase text-xs md:text-sm">
                        Community Competitive Statistics
                    </p>

                    {/* Hall of Fame Link */}
                    <Link to="/hall-of-fame" className="ml-2 md:ml-4 group relative px-5 py-2 overflow-hidden">
                        <div className="absolute inset-0 bg-yellow-500/10 skew-x-12 border border-yellow-500/30 group-hover:bg-yellow-500/20 transition-colors"></div>
                        <div className="relative flex items-center gap-2 text-yellow-500 text-xs font-bold uppercase tracking-widest">
                            <Trophy className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            Hall of Fame
                        </div>
                    </Link>
                </div>
            </div>

            {/* Stats / Timer */}
            {/* Stats / Timer */}
            <div className="text-right mt-8 md:mt-0 flex flex-col items-end relative mr-4">
                <div className="flex items-center gap-1 mb-2">
                    <div className="w-1 h-1 bg-neutral-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-neutral-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-neutral-400 rounded-full"></div>
                </div>
                <div className="text-[10px] text-neutral-400 uppercase font-black tracking-[0.2em] mb-1">
                    System Sync
                </div>
                <div className="relative group">
                    {/* C4 Timer Style Background - kept subtle glow on hover */}
                    <div className="absolute inset-0 bg-red-900/20 blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div className="flex items-center gap-3 bg-neutral-900 px-5 py-2 rounded border border-neutral-700 group-hover:border-red-500/50 transition-colors">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,1)]"></span>
                        </span>
                        <div className="flex flex-col items-start -space-y-1">
                            <span className="text-[10px] text-neutral-400 uppercase font-bold">Last Update</span>
                            <span className="text-xl font-mono text-white tabular-nums tracking-widest text-shadow-sm font-bold">
                                {meta.last_updated}
                            </span>
                        </div>
                        <Clock className="w-4 h-4 text-neutral-400 ml-2" />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HomeHeader;
