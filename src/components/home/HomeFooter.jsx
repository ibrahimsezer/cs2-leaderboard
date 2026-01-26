
import { Github, Linkedin, Database, Code } from 'lucide-react';

function HomeFooter() {
    return (
        <footer className="relative max-w-7xl mx-auto mt-20 border-t-2 border-orange-500/20 bg-gradient-to-t from-neutral-900/80 to-transparent">
            {/* Background Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute bottom-[-50%] left-[-10%] w-[50%] h-[100%] bg-blue-600/5 blur-[120px] rounded-full mix-blend-screen"></div>
                <div className="absolute top-[-20%] right-[-5%] w-[40%] h-[80%] bg-orange-600/5 blur-[100px] rounded-full mix-blend-screen"></div>
            </div>

            <div className="px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">

                {/* Left: Copyright & Name */}
                <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
                    <p className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-200 to-neutral-600 italic tracking-tighter">
                        CS2 LEADERBOARD
                    </p>
                    <p className="text-neutral-500 font-medium text-sm">
                        © {new Date().getFullYear()} developed by <a href="https://ibrahimsezer.github.io" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400 transition-colors font-bold tracking-wide">İbrahim Sezer</a>
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-[10px] text-neutral-400 font-mono">v1.0.0</span>
                        <span className="px-2 py-0.5 rounded bg-blue-900/20 border border-blue-500/20 text-[10px] text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1">
                            <Database size={10} />
                            Live Data
                        </span>
                    </div>
                </div>

                {/* Right: Social & Badges */}
                <div className="flex flex-col items-center md:items-end gap-4">
                    <div className="flex items-center gap-3">
                        <a href="https://www.linkedin.com/in/ibrahim-sezer/" target="_blank" rel="noopener noreferrer" className="group relative p-3 bg-black/40 border border-white/10 rounded-lg overflow-hidden hover:border-blue-500/50 transition-colors">
                            <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <Linkedin className="w-5 h-5 text-neutral-400 group-hover:text-blue-400 transition-colors relative z-10" />
                        </a>
                        <a href="https://github.com/ibrahimsezer" target="_blank" rel="noopener noreferrer" className="group relative p-3 bg-black/40 border border-white/10 rounded-lg overflow-hidden hover:border-orange-500/50 transition-colors">
                            <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <Github className="w-5 h-5 text-neutral-400 group-hover:text-orange-400 transition-colors relative z-10" />
                        </a>
                        <a href="https://ibrahimsezer.github.io" target="_blank" rel="noopener noreferrer" className="group relative p-3 bg-black/40 border border-white/10 rounded-lg overflow-hidden hover:border-green-500/50 transition-colors">
                            <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <Code className="w-5 h-5 text-neutral-400 group-hover:text-green-400 transition-colors relative z-10" />
                        </a>
                    </div>

                    <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                        <div className="h-[1px] w-12 bg-neutral-700"></div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-600 font-bold">Secure Connection</span>
                    </div>
                </div>
            </div>

            {/* Bottom Bar decoration */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>
        </footer>
    );
}

export default HomeFooter;
