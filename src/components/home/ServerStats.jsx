import { useState, useEffect } from 'react';
import { Skull, Crosshair, Trophy, Star } from 'lucide-react';

const Typewriter = ({ text, delay = 50, startDelay = 0 }) => {
    const [displayText, setDisplayText] = useState('');
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            setStarted(true);
        }, startDelay);
        return () => clearTimeout(startTimeout);
    }, [startDelay]);

    useEffect(() => {
        if (!started) return;

        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= text.length) {
                setDisplayText(text.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, delay);

        return () => clearInterval(interval);
    }, [text, delay, started]);

    return <span>{displayText}</span>;
}

function ServerStats({ serverStats }) {
    return (
        <section className="max-w-6xl mx-auto mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-neutral-900/40 border border-white/5 p-6 rounded-xl flex flex-col items-center justify-center hover:bg-neutral-900/80 transition-colors cursor-default group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Skull size={48} />
                    </div>
                    <span className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-2 group-hover:text-white transition-colors flex items-center gap-2">
                        <Skull size={14} className="text-red-500" />
                        Total Kills
                    </span>
                    <span className="text-3xl font-black text-white font-mono">
                        <Typewriter text={serverStats.totalKills.toLocaleString()} delay={50} />
                    </span>
                </div>

                <div className="bg-neutral-900/40 border border-white/5 p-6 rounded-xl flex flex-col items-center justify-center hover:bg-neutral-900/80 transition-colors cursor-default group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Crosshair size={48} />
                    </div>
                    <span className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-2 group-hover:text-white transition-colors flex items-center gap-2">
                        <Crosshair size={14} className="text-orange-500" />
                        Total Damage
                    </span>
                    <span className="text-3xl font-black text-white font-mono">
                        <Typewriter text={`${(serverStats.totalDamage / 1000).toFixed(1)}k`} delay={50} startDelay={200} />
                    </span>
                </div>

                <div className="bg-neutral-900/40 border border-white/5 p-6 rounded-xl flex flex-col items-center justify-center hover:bg-neutral-900/80 transition-colors cursor-default group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Trophy size={48} />
                    </div>
                    <span className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-2 group-hover:text-white transition-colors flex items-center gap-2">
                        <Trophy size={14} className="text-yellow-500" />
                        Total Wins
                    </span>
                    <span className="text-3xl font-black text-white font-mono">
                        <Typewriter text={serverStats.totalWins.toString()} delay={50} startDelay={400} />
                    </span>
                </div>

                <div className="bg-neutral-900/40 border border-white/5 p-6 rounded-xl flex flex-col items-center justify-center hover:bg-neutral-900/80 transition-colors cursor-default group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Star size={48} />
                    </div>
                    <span className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-2 group-hover:text-white transition-colors flex items-center gap-2">
                        <Star size={14} className="text-blue-500" />
                        Total MVPs
                    </span>
                    <span className="text-3xl font-black text-white font-mono">
                        <Typewriter text={serverStats.totalMvps.toString()} delay={50} startDelay={600} />
                    </span>
                </div>
            </div>
        </section>
    );
}

export default ServerStats;
