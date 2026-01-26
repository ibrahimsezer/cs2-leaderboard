
import { Trophy } from 'lucide-react';

function EquipmentCard({ category, data, color }) {
    if (!data) return null;

    const { player, weapon, kills } = data;

    return (
        <div className="relative group h-full">
            {/* Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 blur-xl transition-all duration-500 rounded-2xl`}></div>

            {/* Card Container */}
            <div className="relative h-full bg-neutral-900/60 border border-white/10 backdrop-blur-sm rounded-2xl p-6 overflow-hidden hover:border-white/20 transition-colors flex flex-col items-center text-center">

                {/* Category Label */}
                <div className="flex items-center gap-2 mb-4">
                    <span className={`inline-block w-2 h-2 rounded-full bg-gradient-to-r ${color}`}></span>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 group-hover:text-white transition-colors">
                        {category}
                    </h3>
                </div>

                {/* Weapon Icon (Animated) */}
                <div className="relative w-32 h-20 mb-6 flex items-center justify-center">
                    <img
                        src={`${import.meta.env.BASE_URL}equipments/${weapon}.svg`}
                        alt={weapon}
                        className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 ease-out"
                    />
                </div>

                {/* Player Info */}
                <div className="mt-auto w-full">
                    {/* Avatar */}
                    <div className="relative mx-auto w-16 h-16 mb-3">
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${color} animate-spin-slow opacity-50`}></div>
                        <img
                            src={player.avatar}
                            alt={player.nickname}
                            className="absolute inset-[2px] w-[calc(100%-4px)] h-[calc(100%-4px)] rounded-full object-cover border-2 border-neutral-900"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-neutral-900 p-1 rounded-full border border-neutral-800">
                            <Trophy size={12} className="text-yellow-500" />
                        </div>
                    </div>

                    <h4 className="text-lg font-black text-white leading-tight mb-0.5">
                        {player.nickname}
                    </h4>

                    <div className="flex items-center justify-center gap-2 text-sm">
                        <span className="text-neutral-500 font-medium capitalize">{weapon} Master</span>
                    </div>

                    {/* Stats Badge */}
                    <div className={`mt-4 px-4 py-2 rounded-lg bg-gradient-to-r ${color} bg-opacity-10 border border-white/10 flex items-center justify-center gap-2`}>
                        <span className="font-mono font-bold text-lg text-white tabular-nums tracking-widest text-shadow-sm">
                            {kills.toLocaleString()}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-white/70 tracking-widest">Kills</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EquipmentCard;
