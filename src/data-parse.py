import requests
import json
import os
from datetime import datetime
import dotenv

# .env dosyasını yükle
dotenv.load_dotenv()

# --- AYARLAR ---
API_KEY = os.getenv("API_KEY")
PLAYERS_FILE = "src/players.json"
BASELINE_FILE = "src/baseline.json"
OUTPUT_FILE = "src/data.json"

# Sezonu sıfırlamak için True yapıp bir kez çalıştırın, sonra False yapın.
RESET_SEASON = False

# Debug dosyasından çıkarılan TÜM silahlar
WEAPONS = [
    "knife",
    "hegrenade",
    "glock",
    "deagle",
    "elite",
    "fiveseven",
    "xm1014",
    "mac10",
    "ump45",
    "p90",
    "awp",
    "ak47",
    "aug",
    "famas",
    "g3sg1",
    "m249",
    "hkp2000",
    "p250",
    "sg556",
    "scar20",
    "ssg08",
    "mp7",
    "mp9",
    "nova",
    "negev",
    "sawedoff",
    "bizon",
    "tec9",
    "mag7",
    "m4a1",
    "galilar",
    "molotov",
    "taser",
]


def get_stat_value(stats_list, stat_name):
    """Stat listesinden değer çeker, yoksa 0 döner."""
    if not stats_list:
        return 0
    return next((item["value"] for item in stats_list if item["name"] == stat_name), 0)


def fetch_user_stats(steam_id):
    """Steam API'den ham veriyi çeker."""
    url = f"http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key={API_KEY}&steamid={steam_id}"
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if "playerstats" in data and "stats" in data["playerstats"]:
                return data["playerstats"]["stats"]
    except Exception as e:
        print(f"Hata ({steam_id}): {e}")
    return None


def load_json(filepath):
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_json(filepath, data):
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)


def calculate_score(stats):
    """
    Formül: Puan = (Kill * 1) + (MVP * 3) + (Win * 5) + (Hasar/100) - (Death * 0.5) + (HS * 0.2)
    """
    score = (
        (stats["kills"] * 1.0)
        + (stats["mvps"] * 3.0)
        + (stats["wins"] * 5.0)
        + (stats["damage"] / 100.0)
        + (stats["headshots"] * 0.2)
        - (stats["deaths"] * 0.5)
    )
    return round(score, 1)


def main():
    print("🚀 CS2 İstatistik Takip Sistemi Başlatılıyor...")

    players = load_json(PLAYERS_FILE)
    if not players:
        print("Hata: players.json bulunamadı.")
        return

    baseline_data = load_json(BASELINE_FILE)

    if RESET_SEASON:
        print("⚠️ SEZON SIFIRLANIYOR...")
        baseline_data = {}

    current_season_stats = []
    baseline_updated = False

    for name, steam_id in players.items():
        print(f"İşleniyor: {name}...")
        raw_stats = fetch_user_stats(steam_id)

        if raw_stats:
            # 1. Temel Verileri Parse Et
            current_vals = {
                "kills": get_stat_value(raw_stats, "total_kills"),
                "deaths": get_stat_value(raw_stats, "total_deaths"),
                "wins": get_stat_value(raw_stats, "total_matches_won"),
                "mvps": get_stat_value(raw_stats, "total_mvps"),
                "damage": get_stat_value(raw_stats, "total_damage_done"),
                "headshots": get_stat_value(raw_stats, "total_kills_headshot"),
                "shots_fired": get_stat_value(raw_stats, "total_shots_fired"),
                "shots_hit": get_stat_value(raw_stats, "total_shots_hit"),
                "rounds": get_stat_value(raw_stats, "total_rounds_played"),
            }

            # 2. Silah Verilerini Parse Et (Baseline için gerekli)
            current_weapon_vals = {}
            for w in WEAPONS:
                current_weapon_vals[w] = get_stat_value(raw_stats, f"total_kills_{w}")

            # 3. Baseline Kontrolü
            # Eğer oyuncu yoksa veya baseline yapısı eskiyse (silah verisi yoksa) güncelle
            if (
                steam_id not in baseline_data
                or "weapons" not in baseline_data[steam_id]
            ):
                print(f"   -> {name} için yeni baseline oluşturuluyor.")
                baseline_data[steam_id] = {
                    "stats": current_vals,
                    "weapons": current_weapon_vals,
                }
                baseline_updated = True

            # 4. Sezonluk Farkı Hesapla (Delta)
            base_stats = baseline_data[steam_id]["stats"]
            base_weapons = baseline_data[steam_id]["weapons"]

            season_stats = {
                "name": name,
                "kills": current_vals["kills"] - base_stats.get("kills", 0),
                "deaths": current_vals["deaths"] - base_stats.get("deaths", 0),
                "wins": current_vals["wins"] - base_stats.get("wins", 0),
                "mvps": current_vals["mvps"] - base_stats.get("mvps", 0),
                "damage": current_vals["damage"] - base_stats.get("damage", 0),
                "headshots": current_vals["headshots"] - base_stats.get("headshots", 0),
                "rounds": current_vals["rounds"] - base_stats.get("rounds", 0),
            }

            # Negatif değer koruması
            for k, v in season_stats.items():
                if isinstance(v, (int, float)) and v < 0:
                    season_stats[k] = 0

            # 5. Sezonluk Favori Silahı Bul
            # (Bu sezon en çok kill alınan silah)
            fav_weapon_name = "N/A"
            max_season_kills = -1

            for w in WEAPONS:
                curr_w = current_weapon_vals.get(w, 0)
                base_w = base_weapons.get(w, 0)

                # Sadece bu sezon alınan kill sayısı
                season_w_kills = curr_w - base_w

                if season_w_kills > max_season_kills:
                    max_season_kills = season_w_kills
                    fav_weapon_name = w.upper()

            # Eğer hiç kill alınmadıysa veya data yoksa
            if max_season_kills <= 0:
                fav_weapon_name = "-"

            season_stats["fav_weapon"] = fav_weapon_name
            season_stats["fav_weapon_kills"] = (
                max_season_kills  # İstersen frontend'de kullanabilirsin
            )

            # 6. Oranlar ve Skor
            season_stats["kda"] = (
                round(season_stats["kills"] / season_stats["deaths"], 2)
                if season_stats["deaths"] > 0
                else season_stats["kills"]
            )
            season_stats["hs_rate"] = (
                round((season_stats["headshots"] / season_stats["kills"]) * 100, 1)
                if season_stats["kills"] > 0
                else 0
            )
            season_stats["score"] = calculate_score(season_stats)

            current_season_stats.append(season_stats)
        else:
            print(f"   -> Veri alınamadı!")

    if baseline_updated or RESET_SEASON:
        save_json(BASELINE_FILE, baseline_data)
        print("💾 Baseline güncellendi.")

    # Puan sıralaması
    current_season_stats.sort(key=lambda x: x["score"], reverse=True)

    # Metadata ile kaydet
    final_output = {
        "meta": {
            "last_updated": datetime.now().strftime("%d.%m.%Y %H:%M"),
            "season_active": not RESET_SEASON,
        },
        "players": current_season_stats,
    }

    save_json(OUTPUT_FILE, final_output)
    print(f"\n✅ İŞLEM TAMAMLANDI! ({final_output['meta']['last_updated']})")


if __name__ == "__main__":
    main()
