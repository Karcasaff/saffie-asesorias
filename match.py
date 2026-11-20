import re, json, unicodedata, urllib.request

ACC = str.maketrans("áéíóúñÁÉÍÓÚÑ","aeiounAEIOUN")
def norm_txt(s):
    if not s: return ""
    s = unicodedata.normalize("NFKD", str(s)).encode("ascii","ignore").decode("ascii")
    s = s.upper().translate(ACC)
    noise = ["CASA/DPTO","DPTO.","DEPARTAMENTO","APARTAMENTO","APT.","APT","PARCELAS","PARCELA","TERRENOS","TERRENO","PREDIO","SITIOS","SITIO","EDIFICIOS","EDIFICIO","EDIF.","TORRE","TORRES","PASAJES","PASAJE","PJE.","PJE","AVENIDA","AV.","CALLES","CALLE","CLL","BARRIOS","BARRIO","BDA.","VILLAS","VILLA","POBLACION","CONJUNTO","CONJ.","MZA.","MZA","MANZANA","N°","Nº","N°","Nº","DPTO.","DPTO","DEPTO.","DEPTO","CASAS","CASA","LOTES","LOTE","LOCAL","LOCALES","OFICINA","OFICINAS","EDIF","-","/","#","°","º","ª","·",","]
    noise = sorted(set(noise), key=len, reverse=True)
    for n in noise: s = s.replace(n," ")
    s = re.sub(r'\s+',' ',s).strip()
    return s

def first_number(s):
    if not s: return None
    m = re.search(r'N\s*[°º]?\s*(\d[\d\.,]*)', s)
    if m:
        try: return int(m.group(1).replace(".","").replace(",",""))
        except: pass
    m = re.search(r'(\d[\d\.,]*)', s)
    if m:
        try: return int(m.group(1).replace(".","").replace(",",""))
        except: return None
    return None

def street_words(s):
    s = norm_txt(s)
    s = re.sub(r'\d+',' ',s)
    return set(w for w in s.split() if len(w)>=2)

def match_addr(a, b):
    na, nb = norm_txt(a or ""), norm_txt(b or "")
    if not na or not nb: return 0.0
    na_num, nb_num = first_number(na), first_number(nb)
    if na_num is None or nb_num is None or na_num != nb_num: return 0.0
    base = 0.80  # mismo numero de calle: muy probable mismo inmueble
    aw, bw = street_words(na), street_words(nb)
    if aw and bw:
        if aw <= bw or bw <= aw: base = 0.95
        else:
            inter = len(aw & bw); union = len(aw | bw)
            base = 0.80 + (inter / union) * 0.15 if union else 0.80
    return min(base, 0.95)

def title_case(s):
    if not s: return s
    return " ".join(w.capitalize() for w in s.split())

def infer_type(addr, asv_type):
    a = (addr or "").upper(); t = (asv_type or "").upper()
    if t in ("TERRENOS","TERRENO","PARCELAS","PARCELA","PREDIO","SITIOS","SITIO") or any(k in a for k in ["TERRENO","PARCELA","LOTE","PREDIO","SITIO"]): return "terreno"
    if t in ("CASAS","CASA") or any(k in a for k in ["CASA","DPTO"]==False and "DPTO" in a) : pass
    if "DPTO" in a or "DEPTO" in a or "DEPARTAMENTO" in a or t in ("DEPARTAMENTOS","DEPARTAMENTO"): return "departamento"
    if "CASA" in a or t in ("CASAS","CASA"): return "casa"
    if "LOCAL" in a or "OFICINA" in a or t in ("LOCAL","OFICINA","COMERCIAL"): return "comercial"
    return None

def comuna_of(addr):
    # devuelve comuna si aparece en la direccion/title de asvicorp
    comunas = ["QUINTERO","ALGARROBO","VIÑA DEL MAR","LA FLORIDA","SAN FELIPE","ESTACION CENTRAL","LA REINA","PUENTE ALTO","CERRO NAVIA","SAN ESTEBAN","LAMPA","INDEPENDENCIA","PROVIDENCIA","SANTIAGO","VALPARAISO","QUILPUE","CONCON","CURACAVI","PUCHUNCAVI","TEMUCO","QUEPE","PLACILLA","EUGENIO"]
    up = (addr or "").upper()
    for c in comunas:
        if c in up: return c.title()
    return None

# UF del día (mindicador.cl)
def uf_hoy():
    try:
        import urllib.request
        req=urllib.request.Request("https://mindicador.cl/api/uf",headers={"User-Agent":"Mozilla/5.0"})
        with urllib.request.urlopen(req,timeout=15) as r:
            d=json.load(r)
        return float(str(d["serie"][0]["valor"]).replace(",","."))
    except Exception as e:
        print("UF fetch falló:", e); return None

UF_HOY = uf_hoy()
print("UF hoy:", UF_HOY)

asv = json.load(open("asvicorp.json",encoding="utf-8"))["properties"]
xl  = json.load(open("excel.json",encoding="utf-8"))["properties"]

matched=[]; unmatched=[]
used_asv=set()
for e in xl:
    best=None; bestscore=0.0
    for a in asv:
        if a["sku"] in used_asv: continue
        sc = match_addr(e["direccion"], a["address"])
        # bonus comuna
        ec = (e.get("comuna") or "").upper()
        ac = (a["address"] or "").upper() + " " + (a["title"] or "").upper()
        if ec and ec.replace(" ","") in ac.replace(" ",""): sc += 0.25
        if sc>bestscore and sc>=0.55:
            bestscore=sc; best=a
    if best:
        used_asv.add(best["sku"])
        e["_match"] = best; e["_score"] = bestscore
        matched.append(e)
    else:
        unmatched.append(e)

print("MATCHED:", len(matched), "UNMATCHED:", len(unmatched))
for m in matched:
    print(f"  {m['direccion'][:40]} <-> SKU {m['_match']['sku']} ({m['_match']['price_uf']} UF) score={m['_score']:.2f}")
json.dump({"count":len(matched),"properties":matched}, open("matched.json","w",encoding="utf-8"), ensure_ascii=False, indent=2)
json.dump({"count":len(unmatched),"properties":unmatched}, open("unmatched.json","w",encoding="utf-8"), ensure_ascii=False, indent=2)
