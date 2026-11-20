import re, json, unicodedata
ACC=str.maketrans("áéíóúñÁÉÍÓÚÑ","aeiounAEIOUN")
def norm_txt(s):
    if not s: return ""
    s=unicodedata.normalize("NFKD",str(s)).encode("ascii","ignore").decode("ascii").upper().translate(ACC)
    noise=["CASA/DPTO","DPTO.","DEPARTAMENTO","APARTAMENTO","APT.","APT","PARCELAS","PARCELA","TERRENOS","TERRENO","PREDIO","SITIOS","SITIO","EDIFICIOS","EDIFICIO","EDIF.","TORRE","TORRES","PASAJES","PASAJE","PJE.","PJE","AVENIDA","AV.","CALLES","CALLE","CLL","BARRIOS","BARRIO","BDA.","VILLAS","VILLA","POBLACION","CONJUNTO","CONJ.","MZA.","MZA","MANZANA","N°","Nº","DPTO.","DPTO","DEPTO.","DEPTO","CASAS","CASA","LOTES","LOTE","LOCAL","LOCALES","OFICINA","OFICINAS","EDIF","-","/","#","°","º","ª","·",","]
    noise=sorted(set(noise),key=len,reverse=True)
    for n in noise: s=s.replace(n," ")
    return re.sub(r'\s+',' ',s).strip()
def first_number(s):
    if not s: return None
    m=re.search(r'N\s*[°º]?\s*(\d[\d\.,]*)',s)
    if m:
        try: return int(m.group(1).replace(".","").replace(",",""))
        except: pass
    m=re.search(r'(\d[\d\.,]*)',s)
    if m:
        try: return int(m.group(1).replace(".","").replace(",",""))
        except: return None
    return None
def street_words(s):
    s=norm_txt(s); s=re.sub(r'\d+',' ',s); return set(w for w in s.split() if len(w)>=2)
def match_addr(a,b):
    na=norm_txt(a or ""); nb=norm_txt(b or "")
    if not na or not nb: return 0.0
    na_num=first_number(na); nb_num=first_number(nb)
    if na_num is None or nb_num is None or na_num!=nb_num: return 0.0
    aw=bw=None
    aw=street_words(na); bw=street_words(nb)
    if not aw or not bw: return 0.7
    if aw<=bw or bw<=aw: base=0.9
    else:
        inter=len(aw&bw); union=len(aw|bw); base=inter/union if union else 0.0
    return base
excel=json.load(open("excel.json",encoding="utf-8"))["properties"]
asv=json.load(open("asvicorp.json",encoding="utf-8"))["properties"]
p=[e for e in excel if "PARQUE NORTE" in (e["direccion"] or "")]
a=[a for a in asv if a["sku"]==314]
print("EXCEL:", p[0]["direccion"] if p else None)
print("ASV314:", a[0]["address"] if a else None, "| title:", a[0]["title"] if a else None)
if p and a:
    print("SCORE:", match_addr(p[0]["direccion"], a[0]["address"]))
    print("norm excel:", norm_txt(p[0]["direccion"]), "num:", first_number(norm_txt(p[0]["direccion"])))
    print("norm asv :", norm_txt(a[0]["address"]), "num:", first_number(norm_txt(a[0]["address"])))
