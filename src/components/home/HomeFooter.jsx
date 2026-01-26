
import { Github, Linkedin, Database, Code, Globe, ShieldCheck, Server, AlertCircle } from 'lucide-react';

function HomeFooter() {
    return (
        <footer className="relative mt-32 w-full overflow-hidden">
            {/* Top Glow Border */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>

            {/* Main Background */}
            <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-xl -z-20"></div>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/5 pb-12 mb-12">

                    {/* Brand Section */}
                    <div className="md:col-span-4 flex flex-col gap-4">
                        <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase flex items-center gap-2">
                            <div className="w-2 h-8 bg-orange-500 rounded-sm skew-x-[-15deg]"></div>
                            CS2 <span className="text-orange-500">Leaderboard</span>
                        </h2>
                        <p className="text-neutral-500 text-sm leading-relaxed max-w-sm">
                            Track your performance, compare stats with friends, and dominate the server.
                            Real-time statistics for the competitive elite.
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                            {/* Status Badge */}
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-xs font-bold text-green-500 uppercase tracking-wider">Systems Online</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links / Server Info */}
                    <div className="md:col-span-4 flex flex-col gap-4">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                            <Server size={16} className="text-orange-500" />
                            Server Specs
                        </h3>
                        <ul className="grid grid-cols-2 gap-3">
                            <li className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-neutral-900/50 p-2 rounded border border-white/5">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                Steam Web API
                            </li>
                            <li className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-neutral-900/50 p-2 rounded border border-white/5">
                                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                                React - Vite - Python
                            </li>
                            <li className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-neutral-900/50 p-2 rounded border border-white/5">
                                <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
                                AntiGravity
                            </li>
                            <li className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-neutral-900/50 p-2 rounded border border-white/5">
                                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                                24/7 Uptime
                            </li>
                        </ul>
                    </div>

                    {/* Developer & Socials */}
                    <div className="md:col-span-4 flex flex-col gap-4 md:items-end">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                            <Code size={16} className="text-blue-500" />
                            Developer
                        </h3>
                        <p className="text-neutral-400 text-sm text-right">
                            Crafted with <span className="text-red-500 animate-pulse">❤</span> by <a href="https://ibrahimsezer.github.io" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-500 transition-colors font-bold underline decoration-orange-500/30 hover:decoration-orange-500">İbrahim Sezer</a>
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                            <SocialButton href="https://www.linkedin.com/in/ibrahim-sezer/" icon={<Linkedin size={18} />} color="hover:border-blue-500 hover:text-blue-500" />
                            <SocialButton href="https://github.com/ibrahimsezer" icon={<Github size={18} />} color="hover:border-white hover:text-white" />
                            <SocialButton href="https://ibrahimsezer.github.io" icon={<Globe size={18} />} color="hover:border-green-500 hover:text-green-500" />
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-neutral-600">
                    <p>© {new Date().getFullYear()} CS2 Leaderboard. All rights reserved.</p>
                </div>
            </div>

            {/* Background Gradients */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-32 bg-orange-500/10 blur-[100px] pointer-events-none"></div>
        </footer>
    );
}

// Helper for Social Links
const SocialButton = ({ href, icon, color }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-10 h-10 flex items-center justify-center rounded-lg bg-neutral-900 border border-white/5 text-neutral-400 transition-all duration-300 ${color}`}
    >
        {icon}
    </a>
);

export default HomeFooter;
