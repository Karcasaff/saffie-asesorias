import json, os, urllib.request

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
HEADERS = {"User-Agent": UA}

os.makedirs("public/fotos", exist_ok=True)

matched = json.load(open("matched.json", encoding="utf-8"))["properties"]

def download(url, dest):
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=30) as r:
            if r.status == 200:
                data = r.read()
                if len(data) < 1000:
                    return False
                with open(dest, "wb") as f:
                    f.write(data)
                return True
    except Exception as e:
        print("  fallo", url, e)
    return False

count = 0
for e in matched:
    a = e["_match"]
    imgs = []
    for i, u in enumerate(a.get("photos") or []):
        sku = a["sku"]
        dest = f"public/fotos/{sku}-{i+1}.jpg"
        if download(u, dest):
            imgs.append(f"/fotos/{sku}-{i+1}.jpg")
            count += 1
        else:
            print("  no descargada:", u)
    e["images"] = imgs or ["/fotos/placeholder.jpg"]

json.dump({"count": len(matched), "properties": matched}, open("matched_fotos.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print("Propiedades con fotos:", len(matched), "| fotos descargadas:", count)
