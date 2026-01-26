
import { useMemo } from 'react';
import EquipmentCard from './EquipmentCard';

const CATEGORIES = [
    {
        id: 'rifle',
        label: 'Assault', // "Tüfek"
        weapons: ['ak47', 'm4a1', 'galilar', 'famas', 'aug', 'sg556'],
        color: 'from-orange-600 to-red-600'
    },
    {
        id: 'sniper',
        label: 'Sniper', // "Nişancı Tüfeği"
        weapons: ['awp', 'ssg08', 'scar20', 'g3sg1'],
        color: 'from-emerald-500 to-teal-600'
    },
    {
        id: 'smg',
        label: 'SMG', // "Mini Tüfekler"
        weapons: ['mp9', 'mac10', 'mp7', 'p90', 'bizon', 'ump45'],
        color: 'from-purple-500 to-indigo-600'
    },
    {
        id: 'pistol',
        label: 'Pistol', // "Tabancalar" (Changed id to pistol from sidearm for clarity)
        weapons: ['glock', 'hkp2000', 'deagle', 'p250', 'elite', 'fiveseven', 'tec9'],
        color: 'from-yellow-500 to-amber-600'
    }
];

function EquipmentMasters({ players }) {

    const masters = useMemo(() => {
        const results = {};

        CATEGORIES.forEach(cat => {
            let bestKillCount = -1;
            let bestPlayer = null;
            let bestWeapon = null;

            // Strategy: For this category, find the (Player, Weapon) tuple with the absolute highest kills.
            // Iterate over all players
            players.forEach(player => {
                if (!player.weapons) return;

                // Iterate over all weapons defined in this category
                cat.weapons.forEach(wep => {
                    const kills = player.weapons[wep] || 0;
                    if (kills > bestKillCount) {
                        bestKillCount = kills;
                        bestPlayer = player;
                        bestWeapon = wep;
                    }
                });
            });

            if (bestPlayer) {
                results[cat.id] = {
                    player: bestPlayer,
                    weapon: bestWeapon,
                    kills: bestKillCount
                };
            }
        });

        return results;
    }, [players]);

    return (
        <section className="max-w-6xl mx-auto mb-20 animate-fade-in-up delay-100">
            <div className="flex flex-col items-center mb-10 text-center">
                <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 tracking-tighter italic transform -skew-x-6 drop-shadow-xl">
                    EQUIPMENT OF MASTERS
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-0">
                {CATEGORIES.map(cat => (
                    <EquipmentCard
                        key={cat.id}
                        category={cat.label}
                        data={masters[cat.id]}
                        color={cat.color}
                    />
                ))}
            </div>
        </section>
    );
}

export default EquipmentMasters;
