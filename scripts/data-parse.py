import requests
import json
import os
from datetime import datetime
import dotenv
import time

# .env dosyasını yükle
dotenv.load_dotenv()

# --- AYARLAR ---
API_KEY = os.getenv("API_KEY")
PLAYERS_FILE = "scripts/players.json"
BASELINE_FILE = "scripts/baseline.json"
OUTPUT_FILE = "src/data.json"

RESET_SEASON = False

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

MAPS = [
    "de_dust2",
    "mirage",
    "inferno",
    "nuke",
    "vertigo",
    "ancient",
    "anubis",
    "overpass",
]


def get_stat_value(stats_list, stat_name):
    if not stats_list:
        return 0
    return next((item["value"] for item in stats_list if item["name"] == stat_name), 0)


def fetch_user_stats(steam_id):
    """Steam API'den istatistik verisini çeker."""
    timestamp = int(time.time())
    url = f"http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key={API_KEY}&steamid={steam_id}&_={timestamp}"
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if "playerstats" in data and "stats" in data["playerstats"]:
                return data["playerstats"]["stats"]
    except Exception as e:
        print(f"Stats Hatası ({steam_id}): {e}")
    return None


def fetch_player_profiles(steam_ids_list):
    """
    Verilen Steam ID listesi için profil bilgilerini (Avatar ve İsim) çeker.
    """
    if not steam_ids_list:
        return {}

    ids_string = ",".join(steam_ids_list)
    url = f"http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key={API_KEY}&steamids={ids_string}"

    profiles_map = {}
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            data = response.json()
            players = data.get("response", {}).get("players", [])
            for p in players:
                # Hem avatarı hem de Steam ismini (personaname) alıyoruz
                profiles_map[p["steamid"]] = {
                    "avatar": p["avatarfull"],
                    "real_name": p["personaname"],
                }
    except Exception as e:
        print(f"Profil bilgileri çekilirken hata: {e}")

    return profiles_map


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
    Yeni Formül: (Ham Puan / Round Sayısı) * 100
    Bu sayede 'Verimlilik' esas alınır.
    """
    total_rounds = stats.get("rounds", 0)

    # Sıfıra bölünme hatasını önle (Yeni oyuncularda round 0 olabilir)
    if total_rounds < 5:  # En az 5 round oynamış olsun ki istatistik otursun
        return 0.0
    raw_score = (
        (stats["mvps"] * 3.0)
        + (stats["damage"] / 100.0)
        + (stats["headshots"] * 0.2)
        - (stats["deaths"] * 1)
    )
    normalized_score = (raw_score / total_rounds) * 100
    if normalized_score < 0:
        return 0.1
    return round(normalized_score, 1)


def main():
    print("🚀 CS2 İstatistik Takip Sistemi Başlatılıyor...")

    players = load_json(PLAYERS_FILE)
    if not players:
        print("Hata: players.json bulunamadı.")
        return

    # 1. Profil Bilgilerini (FOTO + İSİM) Çek
    print("📸 Profil bilgileri (İsim & Foto) güncelleniyor...")
    all_steam_ids = list(players.values())
    profiles_info = fetch_player_profiles(all_steam_ids)

    # 2. Baseline Yükle
    baseline_data = load_json(BASELINE_FILE)
    if RESET_SEASON:
        print("⚠️ SEZON SIFIRLANIYOR...")
        baseline_data = {}

    current_season_stats = []
    baseline_updated = False

    # 3. Oyuncuları Döngüye Al
    for nickname, steam_id in players.items():
        player_profile = profiles_info.get(steam_id, {})
        display_name = player_profile.get("real_name", nickname)
        avatar_url = player_profile.get("avatar", "")

        print(f"İşleniyor: {display_name} ({nickname})...")

        raw_stats = fetch_user_stats(steam_id)

        if raw_stats:
            # Temel Veriler
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
                # NEW STATS
                "bombs_planted": get_stat_value(raw_stats, "total_planted_bombs"),
                "bombs_defused": get_stat_value(raw_stats, "total_defused_bombs"),
                "knife_kills": get_stat_value(raw_stats, "total_kills_knife"),
                "blind_kills": get_stat_value(raw_stats, "total_kills_enemy_blinded"),
                "money_earned": get_stat_value(raw_stats, "total_money_earned"),
                "broken_windows": get_stat_value(raw_stats, "total_broken_windows"),
            }

            # Map Stats
            for m in MAPS:
                current_vals[f"wins_{m}"] = get_stat_value(
                    raw_stats, f"total_wins_map_{m}"
                )

            # Silah Verileri
            current_weapon_vals = {}
            for w in WEAPONS:
                current_weapon_vals[w] = get_stat_value(raw_stats, f"total_kills_{w}")

            # Baseline Kontrol
            if (
                steam_id not in baseline_data
                or "weapons" not in baseline_data[steam_id]
            ):
                print(f"   -> {nickname} için yeni baseline oluşturuluyor.")
                baseline_data[steam_id] = {
                    "stats": current_vals,
                    "weapons": current_weapon_vals,
                }
                baseline_updated = True

            # AKILLI BASELINE GÜNCELLEME (YENİ EKLENEN SÜTUNLAR İÇİN)
            # Eğer proje güncellendiyse ve yeni veri tipleri geldiyse (örn: shots_fired),
            # eski kullanıcıların baseline'ında bu veriler yoktur.
            # Bunları sıfırdan başlatmak için şu anki değerleri baseline'a ekliyoruz.
            if steam_id in baseline_data and "stats" in baseline_data[steam_id]:
                existing_stats = baseline_data[steam_id]["stats"]
                for key, val in current_vals.items():
                    if key not in existing_stats:
                        print(
                            f"   -> 🛠️ Yeni özellik baseline'a yamalanıyor: {key} ({nickname})"
                        )
                        existing_stats[key] = val
                        baseline_updated = True

            # Delta (Fark) Hesapla
            base_stats = baseline_data[steam_id]["stats"]
            base_weapons = baseline_data[steam_id]["weapons"]

            season_stats = {
                "name": display_name,
                "nickname": nickname,
                "avatar": avatar_url,
                "kills": current_vals["kills"] - base_stats.get("kills", 0),
                "deaths": current_vals["deaths"] - base_stats.get("deaths", 0),
                "wins": current_vals["wins"] - base_stats.get("wins", 0),
                "mvps": current_vals["mvps"] - base_stats.get("mvps", 0),
                "damage": current_vals["damage"] - base_stats.get("damage", 0),
                "headshots": current_vals["headshots"] - base_stats.get("headshots", 0),
                "rounds": current_vals["rounds"] - base_stats.get("rounds", 0),
                "shots_fired": current_vals["shots_fired"]
                - base_stats.get("shots_fired", 0),
                "shots_hit": current_vals["shots_hit"] - base_stats.get("shots_hit", 0),
                "bombs_planted": current_vals["bombs_planted"]
                - base_stats.get("bombs_planted", 0),
                "bombs_defused": current_vals["bombs_defused"]
                - base_stats.get("bombs_defused", 0),
                "knife_kills": current_vals["knife_kills"]
                - base_stats.get("knife_kills", 0),
                "blind_kills": current_vals["blind_kills"]
                - base_stats.get("blind_kills", 0),
                "money_earned": current_vals["money_earned"]
                - base_stats.get("money_earned", 0),
                "broken_windows": current_vals["broken_windows"]
                - base_stats.get("broken_windows", 0),
            }

            # Negatif koruması
            for k, v in season_stats.items():
                if isinstance(v, (int, float)) and v < 0:
                    season_stats[k] = 0

            # Favori Silah
            fav_weapon_name = "N/A"
            max_season_kills = -1
            for w in WEAPONS:
                curr_w = current_weapon_vals.get(w, 0)
                base_w = base_weapons.get(w, 0)
                season_w_kills = curr_w - base_w
                if season_w_kills > max_season_kills:
                    max_season_kills = season_w_kills
                    fav_weapon_name = w.upper()

            if max_season_kills <= 0:
                fav_weapon_name = "-"

            season_stats["fav_weapon"] = fav_weapon_name
            season_stats["fav_weapon_kills"] = max_season_kills

            # Favori Harita (Map)
            fav_map_name = "-"
            max_map_wins = -1
            for m in MAPS:
                curr_map_wins = current_vals.get(f"wins_{m}", 0)
                base_map_wins = base_stats.get(f"wins_{m}", 0)
                season_map_wins = curr_map_wins - base_map_wins
                if season_map_wins > max_map_wins and season_map_wins > 0:
                    max_map_wins = season_map_wins
                    fav_map_name = m.replace(
                        "de_", ""
                    ).capitalize()  # de_dust2 -> Dust2

            season_stats["fav_map"] = fav_map_name

            # Oranlar
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
            print(f"   -> Veri alınamadı ({nickname})!")

    if baseline_updated or RESET_SEASON:
        save_json(BASELINE_FILE, baseline_data)
        print("💾 Baseline güncellendi.")

    current_season_stats.sort(key=lambda x: x["score"], reverse=True)

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
