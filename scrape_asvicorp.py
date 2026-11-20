import re, json, urllib.request

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
HEADERS = {"User-Agent": UA}

def fetch(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=40) as r:
        return r.read().decode("utf-8", errors="ignore")

html = fetch("https://www.asvicorp.cl/bienes-reposeidos/")
print("HTML bytes:", len(html))

# Split por tarjetas
cards = re.split(r'item col-lg-3 col-md-6 col-xs-12 landscapes', html)[1:]
print("Tarjetas encontradas:", len(cards))

props = []
for c in cards:
    m = re.search(r'propiedades/(\d+)/([\w-]+)/', c)
    if not m:
        continue
    sku, slug = m.group(1), m.group(2)

    t = re.search(r'<span class="category">([^<]+)</span>', c)
    ptype = t.group(1).strip() if t else None

    title = None
    mt = re.search(r'<h3>([^<]+)</h3>', c)
    if mt: title = mt.group(1).strip()
    else:
        ma = re.search(r'img[^>]*alt="([^"]+)"', c)
        if ma: title = ma.group(1).strip()

    mp = re.search(r'(fotos_chicas/\d+-\d+\.\w+)', c)
    photo = ("https://www.asvicorp.cl/autoadministracion/bodegatec/catalogo/" + mp.group(1)) if mp else None

    addr = None
    ma = re.search(r'homes-address.*?<span>(.*?)</span>', c, re.S)
    if ma:
        addr = re.sub(r'<[^>]+>', '', ma.group(1)).strip()

    stats = {}
    for icon, val in re.findall(r'<i class="fa fa-(\w+)"[^>]*></i>\s*<span>([^<]+)</span>', c):
        stats[icon] = val.strip()
    dorm = stats.get("bed"); banos = stats.get("bath")
    mts_raw = stats.get("object-group","")
    mts = None
    mm = re.search(r'([\d\.,]+)\s*mts', mts_raw, re.I)
    if mm: mts = float(mm.group(1).replace(".","").replace(",","."))
    park = stats.get("warehouse")

    clp = None
    mc = re.search(r'<\$[\s\xa0]*([\d\.]+)', c)  # $ CLP en precio-properties h3 a
    if not mc:
        mc = re.search(r'\$[\s\xa0]*([\d\.]+)', c)
    if mc: clp = int(mc.group(1).replace(".",""))

    uf = None
    mu = re.search(r'([\d\.]+)\s*UF', c)
    if mu: uf = int(mu.group(1).replace(".",""))

    date = None
    md = re.search(r'(\d{1,2}\s+[A-Za-z]+\s*,?\s*\d{4})', c)
    if md: date = md.group(1)

    props.append({
        "sku": int(sku), "slug": slug, "url": f"propiedades/{sku}/{slug}/",
        "type": ptype, "title": title, "address": addr,
        "photo": photo, "photo_full": photo,
        "dorm": int(dorm) if dorm and dorm.isdigit() else None,
        "banos": int(banos) if banos and banos.isdigit() else None,
        "m2": mts, "parking": int(park) if park and park.isdigit() else None,
        "price_clp": clp, "price_uf": uf, "date": date,
    })

# fotos extra -2/-3
BASE = "https://www.asvicorp.cl/autoadministracion/bodegatec/catalogo/fotos_chicas/"
for p in props:
    extra = []
    for n in (2, 3, 4):
        u = BASE + f"{p['sku']}-{n}.jpeg"
        try:
            req = urllib.request.Request(u, headers={**HEADERS, "Range":"bytes=0-0"})
            with urllib.request.urlopen(req, timeout=10) as r:
                if r.status in (200, 206): extra.append(u)
        except Exception:
            pass
    p["photos"] = [p["photo"]] + extra

out = {"count": len(props), "properties": props}
json.dump(out, open("asvicorp.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print("Propiedades guardadas:", len(props))
for p in props[:3]:
    print(p["sku"], p["type"], p["title"], "|", p["price_clp"], p["price_uf"], "|", p["dorm"], p["banos"], p["m2"], p["parking"], "|", p["address"], "|", len(p["photos"]), "fotos")
