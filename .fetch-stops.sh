#!/usr/bin/env bash
# Fetch freely-licensed photos from Wikimedia Commons for the About timeline.
# Downloads 480px thumbs; saves a credits file alongside (CC licenses need it).
set -u
cd "$(dirname "$0")"
mkdir -p public/img/stops .tmpapi
PROXY="http://127.0.0.1:7890"

while IFS='|' read -r name term; do
  [ -z "$name" ] && continue
  curl -s --max-time 30 -x "$PROXY" -G "https://commons.wikimedia.org/w/api.php" \
    --data-urlencode "action=query" --data-urlencode "generator=search" \
    --data-urlencode "gsrsearch=$term filetype:bitmap" --data-urlencode "gsrnamespace=6" \
    --data-urlencode "gsrlimit=4" --data-urlencode "prop=imageinfo" \
    --data-urlencode "iiprop=url|size|extmetadata" --data-urlencode "iiurlwidth=480" \
    --data-urlencode "format=json" -o ".tmpapi/$name.json"
  python - "$name" <<'EOF'
import json, re, sys
name = sys.argv[1]
try:
    d = json.load(open(f".tmpapi/{name}.json", encoding="utf-8"))
except Exception as e:
    print(f"{name}: parse fail {e}"); open(f".tmpapi/url_{name}.txt", "w").write(""); raise SystemExit
best = None
for p in sorted(d.get("query", {}).get("pages", {}).values(), key=lambda x: x.get("index", 99)):
    ii = (p.get("imageinfo") or [{}])[0]
    tu = ii.get("thumburl") or ""
    if not tu or ii.get("width", 0) < 500: continue
    if not tu.split("?")[0].lower().endswith((".jpg", ".jpeg", ".png")): continue
    em = ii.get("extmetadata", {})
    artist = re.sub(r"<[^>]+>", "", em.get("Artist", {}).get("value", "") or "unknown").strip()[:80]
    lic = em.get("LicenseShortName", {}).get("value", "") or "see Commons"
    best = {"url": tu, "title": p.get("title", ""), "artist": artist, "license": lic}
    break
open(f".tmpapi/url_{name}.txt", "w").write(best["url"] if best else "")
open(f".tmpapi/credit_{name}.json", "w").write(json.dumps(best or {}, ensure_ascii=False))
print(f"{name}: {'OK ' + best['title'][:60] if best else 'NONE'}")
EOF
  URL=$(cat ".tmpapi/url_$name.txt")
  if [ -n "$URL" ]; then
    curl -sL --max-time 60 -x "$PROXY" -o "public/img/stops/$name.jpg" "$URL"
    SZ=$(stat -c%s "public/img/stops/$name.jpg" 2>/dev/null || echo 0)
    echo "   saved ${SZ} bytes"
    [ "$SZ" -lt 5000 ] && { echo "   too small, dropped"; rm -f "public/img/stops/$name.jpg"; }
  fi
done <<'LIST'
laos-alms|Tak Bat Luang Prabang alms giving
patuxay|Patuxay Vientiane monument
alps|Matterhorn Alps snow
seaplane|Maldives seaplane
petronas|Petronas Towers night
palace|Grand Palace Bangkok
pearl|Oriental Pearl Tower night
victoria|Victoria Harbour night skyline
LIST
python - <<'EOF'
import json, glob, os
credits = {}
for f in glob.glob(".tmpapi/credit_*.json"):
    name = os.path.basename(f)[7:-5]
    d = json.load(open(f, encoding="utf-8"))
    if d: credits[name] = d
json.dump(credits, open("public/img/stops/CREDITS.json", "w"), ensure_ascii=False, indent=1)
print("credits:", ", ".join(sorted(credits)))
EOF
rm -rf .tmpapi
ls -la public/img/stops/
