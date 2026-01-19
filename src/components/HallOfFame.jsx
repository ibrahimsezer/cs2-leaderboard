import React from 'react';
import { Trophy, Crown, ArrowLeft, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import hofData from '../hall_of_fame.json';

function HallOfFame() {
    return (
        <div className="min-h-screen bg-black text-white p-8 relative overflow-hidden font-sans">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <img
                    src={`${import.meta.env.BASE_URL}bg-hero.png`}
                    alt="Background"
                    className="w-full h-full object-cover opacity-20 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/90 to-black"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-900/10 via-black/0 to-black pointer-events-none"></div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <header className="flex flex-col md:flex-row items-center justify-between mb-20 gap-6">
                    <Link to="/" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold text-sm">Back to Leaderboard</span>
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 tracking-tighter uppercase flex items-center gap-4 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                        Hall of Fame
                    </h1>
                    <div className="w-[140px] hidden md:block"></div> {/* Spacer for alignment */}
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {hofData.map((season) => (
                        <div key={season.season_id} className="bg-neutral-900/60 backdrop-blur-md border border-yellow-900/30 rounded-3xl p-8 relative overflow-hidden group hover:border-yellow-500/50 transition-all duration-500 flex flex-col items-center text-center hover:transform hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(234,179,8,0.1)]">
                            {/* Glow Effect */}
                            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-20 group-hover:opacity-100 transition-opacity"></div>

                            <div className="mb-10 relative mt-4">
                                <div className="absolute -inset-4 bg-yellow-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-b from-yellow-300 to-yellow-700 relative z-10 shadow-2xl">
                                    <img src={season.winner.avatar} alt={season.winner.name} className="w-full h-full rounded-full object-cover border-4 border-black" />
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                                        <Crown className="w-10 h-10 text-yellow-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" />
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-wider">{season.winner.name}</h2>
                            <p className="text-yellow-500 font-bold text-sm tracking-[0.2em] mb-8 border-b border-yellow-500/20 pb-4 w-full">{season.season_name}</p>

                            <div className="grid grid-cols-3 gap-4 w-full mb-8">
                                <div className="flex flex-col">
                                    <span className="text-2xl font-black text-white">{season.winner.stats.rating}</span>
                                    <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">Rating</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-black text-white">{season.winner.stats.kda}</span>
                                    <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">K/D</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-black text-white">{season.winner.stats.impact}</span>
                                    <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">Impact</span>
                                </div>
                            </div>

                            <div className="w-full bg-black/40 rounded-xl p-5 border border-white/5 group-hover:bg-yellow-900/10 transition-colors">
                                <h3 className="text-xs font-bold text-neutral-500 uppercase mb-4 flex items-center justify-center gap-2">
                                    <Star className="w-3 h-3 text-yellow-600" /> Season Highlights
                                </h3>
                                <div className="space-y-3">
                                    {season.highlights.map((h, idx) => (
                                        <div key={idx} className="flex justify-between items-center text-xs">
                                            <span className="text-neutral-400 font-medium">{h.title}</span>
                                            <span className="font-bold text-white flex gap-1.5 items-center bg-white/5 px-2 py-1 rounded">
                                                <span className="text-yellow-500 truncate max-w-[80px]">{h.player}</span>
                                                <span className="text-neutral-500 text-[10px]">|</span>
                                                <span className="text-white">{h.value}</span>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HallOfFame;
