import json, unicodedata, re

ACC = str.maketrans("áéíóúñÁÉÍÓÚÑ","aeiounAEIOUN")
def norm_txt(s):
    if not s: return ""
    s = unicodedata.normalize("NFKD", str(s)).encode("ascii","ignore").decode("ascii").upper().translate(ACC)
    noise = ["CASA/DPTO","DPTO.","DEPARTAMENTO","APARTAMENTO","APT.","APT","PARCELAS","PARCELA","TERRENOS","TERRENO","PREDIO","SITIOS","SITIO","EDIFICIOS","EDIFICIO","EDIF.","TORRE","TORRES","PASAJES","PASAJE","PJE.","PJE","AVENIDA","AV.","CALLES","CALLE","CLL","BARRIOS","BARRIO","BDA.","VILLAS","VILLA","POBLACION","CONJUNTO","CONJ.","MZA.","MZA","MANZANA","N°","Nº","DPTO.","DPTO","DEPTO.","DEPTO","CASAS","CASA","LOTES","LOTE","LOCAL","LOCALES","OFICINA","OFICINAS","EDIF","-","/","#","°","º","ª","·",","]
    noise = sorted(set(noise), key=len, reverse=True)
    for n in noise: s = s.replace(n," ")
    return re.sub(r'\s+',' ',s).strip()

def slugify(s):
    s = unicodedata.normalize("NFKD", str(s or "")).encode("ascii","ignore").decode("ascii").lower()
    s = re.sub(r'[^a-z0-9]+','-',s)
    return re.sub(r'-+','-',s).strip('-')

TYPE_MAP = {"CASAS":"casa","CASA":"casa","DEPARTAMENTOS":"departamento","DEPARTAMENTO":"departamento",
            "TERRENOS":"terreno","TERRENO":"terreno","PARCELAS":"terreno","PARCELA":"terreno",
            "LOCAL":"comercial","OFICINA":"comercial"}
UF_HOY = 41371.05

def infer_type(direccion, asv_type=None):
    a = (direccion or "").upper()
    if "TERRENO" in a or "PARCELA" in a or "LOTE" in a or "PREDIO" in a: return "terreno"
    if "DPTO" in a or "DEPTO" in a or "DEPARTAMENTO" in a: return "departamento"
    if "CASA" in a: return "casa"
    if "LOCAL" in a or "OFICINA" in a: return "comercial"
    return None

xl = json.load(open("excel.json", encoding="utf-8"))["properties"]
unmatched = json.load(open("unmatched.json", encoding="utf-8"))["properties"]

out = []
used_slugs = set()
for i, e in enumerate(unmatched):
    direccion = e["direccion"] or ""
    comuna = (e.get("comuna") or "").title() or None
    direccion_tc = " ".join(w.capitalize() for w in direccion.split())
    title = f"{direccion_tc}, {comuna}" if comuna else direccion_tc
    slug = slugify(direccion)
    if comuna and comuna.lower().replace(" ","-") not in slug:
        slug = slug + "-" + comuna.lower().replace(" ","-")
    if slug in used_slugs:
        slug = slug + "-" + str(i)
    used_slugs.add(slug)

    tipo = infer_type(direccion, None)
    price_uf = e.get("tasacion_uf")
    price_clp = e.get("precio_clp")
    if price_clp is None and price_uf is not None:
        price_clp = int(price_uf * UF_HOY)
    elif price_uf is None and price_clp is not None:
        price_uf = round(price_clp / UF_HOY)
    price_uf = int(price_uf) if price_uf else None
    price_clp = int(price_clp) if price_clp else None

    m2 = e.get("superficie_m2")
    estado_limpio = re.sub(r'\s+',' ', (e.get("estado") or "").strip()).rstrip(".")
    notas = (e.get("notas") or "").strip()
    features = []
    if estado_limpio: features.append(estado_limpio)
    if notas: features.append(notas)
    if tipo: features.append(tipo.upper())

    sup_str = f"Superficie {m2} m²." if m2 else ""
    desc_partes = [f"Bien reposeído bancario ubicado en {direccion_tc}, {comuna}."]
    if estado_limpio: desc_partes.append(estado_limpio + ".")
    if sup_str: desc_partes.append(sup_str)
    if tipo: desc_partes.append(f"Tipo: {tipo}.")
    description = " ".join(desc_partes).replace("  ", " ").strip()

    code = f"SF-L-{i+1:03d}"
    out.append({
        "id": f"sl-{i+1}",
        "code": code,
        "slug": slug,
        "title": title,
        "operation": "venta",
        "propertyType": tipo,
        "price": price_uf,
        "price_clp": price_clp,
        "expenses": None,
        "commune": comuna,
        "neighborhood": direccion_tc,
        "city": comuna,
        "bedrooms": None,
        "bathrooms": None,
        "parking": None,
        "storage": None,
        "area": m2,
        "areaTotal": None,
        "images": [],
        "description": description,
        "features": features,
        "status": "disponible",
        "featured": False,
        "coords": None,
        "foreclosureStatus": "libre_gravamen",
        "bankOrigin": "Scotiabank" if e.get("lista")=="LISTA 1" else None,
        "condition": "usada",
        "auctionDate": None,
        "minimumBid": None,
        "capRate": None,
        "projectedRent": None,
        "investmentStatus": None,
    })

out.sort(key=lambda p: (p["commune"] or "", p["title"]))
header = "// ============================================================================\n// PROPIEDADES SIN FOTO — LISTADO PARA INVERSIONISTAS\n// Generado automáticamente.\n// ============================================================================\n\nexport const properties = "
footer = "\n\nexport const getBySlug = (slug) => properties.find((p) => p.slug === slug)\n"

with open("src/data/listado.js","w",encoding="utf-8") as f:
    f.write(header)
    json.dump(out, f, ensure_ascii=False, indent=2)
    f.write(footer)

print("Propiedades sin foto:", len(out))
for p in out[:5]:
    print(p["slug"], "|", p["propertyType"], "| UF", p["price"], "| CLP", p["price_clp"], "|", p["commune"])
