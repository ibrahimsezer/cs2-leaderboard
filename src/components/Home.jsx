import { useState, useMemo } from 'react';
import leaderboardData from '../data.json';
import Table from './Table';
import Leaders from './Leaders';
import PlayerModal from './PlayerModal';
import HomeHeader from './home/HomeHeader';
import ServerStats from './home/ServerStats';
import EquipmentMasters from './home/EquipmentMasters';
import HomeFooter from './home/HomeFooter';

function Home() {
    const { meta, players } = leaderboardData;
    const [selectedPlayer, setSelectedPlayer] = useState(null);

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
        <div className="min-h-screen bg-black text-white font-sans relative overflow-x-hidden selection:bg-white/20">

            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={`${import.meta.env.BASE_URL}bg-hero.png`}
                    alt="Background"
                    className="w-full h-full object-cover opacity-40 mask-image-gradient"
                    style={{ maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/80 to-black"></div>
            </div>

            <div className="relative z-10 px-4 py-8 md:p-10">

                {/* --- HEADER --- */}
                <HomeHeader meta={meta} />

                {/* --- LEADERS COMPONENT (Top 3) --- */}
                <section className="mb-16 animate-fade-in-up">
                    <Leaders players={players} onPlayerSelect={setSelectedPlayer} />
                </section>

                {/* --- SERVER STATS BANNER --- */}
                <ServerStats serverStats={serverStats} />

                {/* --- EQUIPMENT OF MASTERS (New Section) --- */}
                <EquipmentMasters players={players} />

                {/* --- TABLE COMPONENT --- */}
                <main className="max-w-6xl mx-auto mb-20 animate-fade-in-up delay-200">
                    <Table players={players} onPlayerSelect={setSelectedPlayer} />
                </main>

                <HomeFooter />

                {/* --- GLOBAL PLAYER MODAL --- */}
                <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
            </div>
        </div>
    );
}

export default Home;
