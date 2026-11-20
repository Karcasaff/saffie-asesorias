import re, json, unicodedata

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

UF_HOY = 41371.05  # referencia al build; cliente usa UF del día (mindicador.cl)

def infer_type(direccion, asv_type):
    t = TYPE_MAP.get((asv_type or "").upper())
    if t: return t
    a = (direccion or "").upper()
    if "TERRENO" in a or "PARCELA" in a or "LOTE" in a or "PREDIO" in a: return "terreno"
    if "DPTO" in a or "DEPTO" in a or "DEPARTAMENTO" in a: return "departamento"
    if "CASA" in a: return "casa"
    if "LOCAL" in a or "OFICINA" in a: return "comercial"
    return None

matched = json.load(open("matched_fotos.json", encoding="utf-8"))["properties"]
xl = json.load(open("excel.json", encoding="utf-8"))["properties"]

props_out = []
used_slugs = set()
for e in matched:
    a = e["_match"]
    direccion = e["direccion"] or ""
    comuna = (e.get("comuna") or "").title() or None
    direccion_tc = " ".join(w.capitalize() for w in direccion.split())
    title = f"{direccion_tc}, {comuna}" if comuna else direccion_tc
    slug = slugify(direccion)
    if comuna and comuna.lower().replace(" ","-") not in slug:
        slug = slug + "-" + comuna.lower().replace(" ","-")
    if slug in used_slugs:
        slug = slug + "-" + str(a["sku"])
    used_slugs.add(slug)

    price_uf = a.get("price_uf")
    price_clp = a.get("price_clp")
    if price_clp is None and price_uf is not None:
        price_clp = int(price_uf * UF_HOY)
    elif price_uf is None and price_clp is not None:
        price_uf = round(price_clp / UF_HOY)
    elif price_uf is None:
        price_uf = e.get("tasacion_uf")
        if price_uf is None and price_clp is not None:
            price_uf = round(price_clp / UF_HOY)
    if price_clp is not None and price_uf is not None:
        if abs(price_uf - price_clp/UF_HOY) > (price_clp/UF_HOY)*0.5:
            price_uf = round(price_clp / UF_HOY)
    price_uf = int(price_uf) if price_uf else None
    price_clp = int(price_clp) if price_clp else None

    m2 = a.get("m2")
    estado_limpio = re.sub(r'\s+',' ', (e.get("estado") or "").strip()).rstrip(".")
    notas = (e.get("notas") or "").strip()
    features = []
    if estado_limpio: features.append(estado_limpio)
    if notas: features.append(notas)
    tipo = infer_type(direccion, a.get("type"))

    sup_str = f"Superficie {m2} m²." if m2 else ""
    desc_partes = [f"Bien reposeído bancario ubicado en {direccion_tc}, {comuna}."]
    if estado_limpio: desc_partes.append(estado_limpio + ".")
    if sup_str: desc_partes.append(sup_str)
    if tipo: desc_partes.append(f"Tipo: {tipo}.")
    description = " ".join(desc_partes).replace("  ", " ").strip()

    bank = "Scotiabank" if e.get("lista")=="LISTA 1" else None

    props_out.append({
        "id": f"sa-{a['sku']}",
        "code": f"SF-{a['sku']}",
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
        "bedrooms": a.get("dorm"),
        "bathrooms": a.get("banos"),
        "parking": a.get("parking"),
        "storage": None,
        "area": m2,
        "areaTotal": None,
        "images": e.get("images") or ["/fotos/placeholder.jpg"],
        "description": description,
        "features": features,
        "status": "disponible",
        "featured": True,
        "coords": None,
        "foreclosureStatus": "libre_gravamen",
        "bankOrigin": bank,
        "condition": "usada",
        "auctionDate": None,
        "minimumBid": None,
        "capRate": None,
        "projectedRent": None,
        "investmentStatus": None,
    })

props_out.sort(key=lambda p: p["price"] or 0)

header = "// ============================================================================\n// PROPIEDADES — DATOS REALES (BIENES REPOSEÍDOS, fuente: Excel + asvicorp.cl)\n// Generado automáticamente — no editar a mano.\n// Precio en UF; price_clp es referencia al build. UF del día se actualiza en cliente.\n// ============================================================================\n\nexport const properties = "
footer = "\n\n// Utilidades\n\nexport const getFeatured = () => properties.filter((p) => p.featured)\nexport const getBySlug = (slug) => properties.find((p) => p.slug === slug)\nexport const getSimilar = (property) =>\n  properties.filter((p) => p.id !== property.id && p.operation === property.operation).slice(0, 3)\nexport const getComunas = () => [...new Set(properties.map((p) => p.commune).filter(Boolean))].sort()\nexport const getPropertyTypes = () => [...new Set(properties.map((p) => p.propertyType).filter(Boolean))].sort()\n\nexport const formatInvestmentStatus = (status) => {\n  const labels = {\n    'con-arrendatario': 'Con arrendatario',\n    'en-verde': 'En verde',\n    'en-blanco': 'En blanco',\n  }\n  return labels[status] || status\n}\n\nexport const getInvestmentBadgeClass = (status) => {\n  const classes = {\n    'con-arrendatario': 'invest-badge--con-arrendatario',\n    'en-verde': 'invest-badge--en-verde',\n    'en-blanco': 'invest-badge--en-blanco',\n  }\n  return classes[status] || 'invest-badge--default'\n}\n"

with open("src/data/properties.js","w",encoding="utf-8") as f:
    f.write(header)
    json.dump(props_out, f, ensure_ascii=False, indent=2)
    f.write(footer)

print("Propiedades escritas:", len(props_out))
for p in props_out:
    print(p["slug"], "|", p["propertyType"], "| UF", p["price"], "| CLP", p["price_clp"], "|", p["bedrooms"], p["bathrooms"], p["parking"], "m2", p["area"], "| fotos", len(p["images"]))
