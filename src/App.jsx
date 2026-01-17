import React from 'react';
import leaderboardData from './data.json'; // Python scriptinin çıktısı

function App() {
  const { meta, players } = leaderboardData;

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 p-4 md:p-10 font-sans">

      {/* --- BAŞLIK ALANI --- */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-end border-b border-slate-700 pb-4">
        <div>
          <h1 className="text-4xl font-bold text-yellow-500 tracking-tighter">
            CS2 LEADERBOARD
          </h1>
          <p className="text-slate-400 mt-1">
            Arkadaş Grubu Sezonluk İstatistikleri
          </p>
        </div>
        <div className="text-right mt-4 md:mt-0">
          <div className="text-xs text-slate-500 uppercase font-semibold">Son Güncelleme</div>
          <div className="text-sm font-mono text-yellow-400">{meta.last_updated}</div>
        </div>
      </div>

      {/* --- TABLO ALANI --- */}
      <div className="max-w-6xl mx-auto overflow-x-auto shadow-2xl rounded-lg border border-slate-800 bg-slate-800/50">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-700">
              <th className="p-4 text-center w-12">#</th>
              <th className="p-4 w-16">Oyuncu</th> {/* Foto ve İsim */}
              <th className="p-4 text-right text-yellow-500">Score</th>
              <th className="p-4 text-right">Kills</th>
              <th className="p-4 text-right">Damage</th>
              <th className="p-4 text-right">HS %</th>
              <th className="p-4 text-right text-green-400">Wins</th>
              <th className="p-4 text-right text-blue-400">MVPs</th>
              <th className="p-4 text-right text-red-400">Deaths</th>
              <th className="p-4 text-right text-slate-500">Rounds</th>
              <th className="p-4 text-center">Fav Weapon</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {players.map((player, index) => (
              <tr
                key={player.name}
                className={`hover:bg-slate-700/30 transition-colors ${index < 3 ? 'bg-slate-800/30' : ''}`}
              >
                {/* 1. Sıralama (Rank) */}
                <td className="p-4 text-center font-mono font-bold text-slate-500">
                  {index + 1}
                </td>

                {/* 2. Profil Fotosu ve İsim */}
                <td className="p-4 flex items-center gap-3">
                  {/* Placeholder Avatar */}
                  <div className={`w-10 h-10 rounded bg-slate-700 flex items-center justify-center text-lg border-2 ${index === 0 ? 'border-yellow-500' : 'border-transparent'}`}>
                    -
                  </div>
                  <span className={`font-bold ${index === 0 ? 'text-yellow-400' : 'text-white'}`}>
                    {player.name}
                  </span>
                </td>

                {/* 3. SCORE (Vurgulu) */}
                <td className="p-4 text-right font-black text-xl text-yellow-500">
                  {player.score}
                </td>

                {/* 4. Kills */}
                <td className="p-4 text-right font-mono text-slate-300">
                  {player.kills}
                </td>

                {/* 5. Damage */}
                <td className="p-4 text-right font-mono text-slate-300">
                  {player.damage.toLocaleString()}
                </td>

                {/* 6. Headshots (Yüzdeye çevrildi veya direkt sayı) */}
                <td className="p-4 text-right font-mono text-slate-300">
                  %{player.hs_rate}
                </td>

                {/* 7. Wins */}
                <td className="p-4 text-right font-mono text-green-400 font-bold">
                  {player.wins}
                </td>

                {/* 8. MVPs */}
                <td className="p-4 text-right font-mono text-blue-400">
                  {player.mvps}
                </td>

                {/* 9. Deaths */}
                <td className="p-4 text-right font-mono text-red-400">
                  {player.deaths}
                </td>

                {/* 10. Rounds */}
                <td className="p-4 text-right font-mono text-slate-500">
                  {player.rounds}
                </td>

                {/* 11. Fav Weapon */}
                <td className="p-4 text-center text-xs font-mono text-slate-400">
                  {player.fav_weapon}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="max-w-6xl mx-auto mt-12 text-center text-slate-600 text-sm">
        <p>CS2 Community Leaderboard Project</p>
      </footer>
    </div>
  );
}

export default App;