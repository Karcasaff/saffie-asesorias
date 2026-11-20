import re, json, openpyxl

F = "BIENES REPOSEIDOS - AL 13-11-2026.xlsx"
wb = openpyxl.load_workbook(F, data_only=True)

MOJI = {
    "N\u00c0": "N\u00ba", "N�": "N\u00ba", "N\u00c3": "\u00d1",
    "S\u00c0p.\u00c0til": "S\u00fap. \u00datil", "S\u00c3p.\u00c3til": "S\u00fap. \u00datil",
    "VI\u00c0": "VI\u00d1A", "VI\u00c3": "VI\u00d1A",
    "\u00c3U\u00c0OA": "\u00d1U\u00d1OA", "\u00c0U\u00c0OA": "\u00d1U\u00d1OA",
    "RE\u00c0CA": "RE\u00d1ACA", "RE\u00c3CA": "RE\u00d1ACA",
    "PARCELACI\u00c0N": "PARCELACI\u00d3N", "PARCELACI\u00c3N": "PARCELACI\u00d3N",
    "HECT\u00c0REAS": "HECT\u00c1REAS", "HECT\u00c3REAS": "HECT\u00c1REAS",
    "BA\u00c0OS": "BA\u00d1OS", "BA\u00c3OS": "BA\u00d1OS",
    "DIRECCI\u00c0N": "DIRECCI\u00d3N", "DIRECCI\u00c3N": "DIRECCI\u00d3N",
    "S\u00c0LIDA": "S\u00d3LIDA", "S\u00c3LIDA": "S\u00d3LIDA",
    "UBICACI\u00c0N": "UBICACI\u00d3N", "UBICACI\u00c3N": "UBICACI\u00d3N",
    "COUSI\u00c0O": "COUSI\u00d1O", "COUSI\u00c3O": "COUSI\u00d1O",
    "CARRERA": "CARRERA", "QUEBRADA": "QUEBRADA",
}
def clean(s):
    if not isinstance(s, str): return s
    for k,v in MOJI.items(): s = s.replace(k,v)
    # quitar caracteres de control raros
    s = s.replace("\u00c0","\u00e0").replace("\u00c3","\u00f1")
    return s.strip()

def parse_uf(s):
    if s is None: return None
    s = str(s)
    m = re.search(r'([\d\.\,\s]+)', s.replace("UF","").replace(".","").replace(",","."))
    if not m: return None
    try: return float(m.group(1))
    except: return None

def parse_clp(s):
    if s is None: return None
    s = str(s).replace("$","").replace(".","").replace(",",".")
    m = re.search(r'([\d\.\,]+)', s)
    if not m: return None
    try:
        v = float(m.group(1).replace(",",""))
        return v
    except: return None

def num(s):
    if s is None: return None
    try:
        v=float(s)
        return int(v) if v==int(v) else v
    except: return None

rows=[]
for name in ["LISTA 1","LISTA 2","LISTA 3","LISTA 4"]:
    ws = wb[name]
    for r in ws.iter_rows(values_only=True):
        vals=[v for v in r if v is not None and str(v).strip()!=""]
        if not vals: continue
        # LISTA 1: fila de datos tiene número en col0
        if name=="LISTA 1":
            if not (isinstance(r[0],(int,float)) and str(r[0]).replace(".","").isdigit()): continue
            rows.append(dict(
                lista="LISTA 1",
                numero=r[0], direccion=clean(r[1]) if len(r)>1 else None,
                comuna=clean(r[4]) if len(r)>4 else None,
                region=r[5] if len(r)>5 else None,
                rol=r[6] if len(r)>6 else None,
                situacion=clean(r[7]) if len(r)>7 else None,
                tasacion_uf=parse_uf(r[8]) if len(r)>8 else None,
                estado=clean(r[9]) if len(r)>9 else None,
                fotos_drive=r[10] if len(r)>10 else None,
            ))
        elif name=="LISTA 2":
            if len(r)<5: continue
            # fila de datos: col1 direccion, col2 comuna, col3 region, col4 superficie, col5 precio, col6 nota
            direccion=clean(r[1]) if len(r)>1 else None
            if not direccion or str(direccion).isdigit(): continue
            sup=None
            if len(r)>4 and r[4]:
                mm=re.search(r'([\d\.\,\s]+)',str(r[4])); 
                if mm:
                    try: sup=float(mm.group(1).replace(".","").replace(",","."))
                    except: pass
            comuna=clean(r[2]) if len(r)>2 else None
            rows.append(dict(
                lista="LISTA 2", direccion=direccion, comuna=comuna,
                region=r[3] if len(r)>3 else None,
                superficie_m2=sup,
                precio_clp=parse_clp(r[5]) if len(r)>5 else None,
                notas=clean(r[6]) if len(r)>6 else None,
            ))
        elif name=="LISTA 3":
            if len(r)<7: continue
            direccion=clean(r[2]) if len(r)>2 else None
            if not direccion or str(direccion).isdigit(): continue
            rows.append(dict(
                lista="LISTA 3",
                numero=r[1] if len(r)>1 else None,
                direccion=direccion, comuna=clean(r[5]) if len(r)>5 else None,
                region=r[6] if len(r)>6 else None,
                situacion=clean(r[7]) if len(r)>7 else None,
                tasacion_uf=parse_uf(r[8]) if len(r)>8 else None,
            ))
        elif name=="LISTA 4":
            # detectar fila de datos limpia (tabla a partir de fila 16): col1=tipo, col2=dir, col3=comuna, col4=precio CLP
            if len(r)<5: continue
            tipo=(r[1] or "").strip().upper() if r[1] else ""
            direccion=clean(r[2]) if len(r)>2 else None
            comuna=clean(r[3]) if len(r)>3 else None
            precio=r[4] if len(r)>4 else None
            if direccion and str(direccion).upper() in ("DIRECCI\u00d3N","DIRECCION"): continue  # header
            if not (direccion and tipo in ("DPTO","CASA","TERRENO","DPTO ","CASA ","TERRENO ")):
                continue
            rows.append(dict(
                lista="LISTA 4", tipo=tipo.strip(), direccion=direccion, comuna=comuna,
                precio_clp=parse_clp(precio) if precio is not None else None,
                notas=clean(r[5]) if len(r)>5 else None,
            ))

# dedup por direccion+comuna
seen=set(); uniq=[]
for r in rows:
    key=(r["direccion"], r["comuna"])
    if key in seen: continue
    seen.add(key); uniq.append(r)

json.dump({"count":len(uniq),"properties":uniq}, open("excel.json","w",encoding="utf-8"), ensure_ascii=False, indent=2)
print("Filas Excel unicas:", len(uniq))
from collections import Counter
print(Counter(r["lista"] for r in uniq))
print("Ejemplo LISTA1:", uniq[0])
print("Ejemplo LISTA4:", [r for r in uniq if r["lista"]=="LISTA 4"][:2])
