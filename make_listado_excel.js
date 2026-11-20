import json, openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

matched = json.load(open("matched_fotos.json", encoding="utf-8"))["properties"]
unmatched = json.load(open("unmatched.json", encoding="utf-8"))["properties"]

UF_HOY = 41371.05

def infer_type(direccion):
    a = (direccion or "").upper()
    if "TERRENO" in a or "PARCELA" in a or "LOTE" in a or "PREDIO" in a: return "Terreno"
    if "DPTO" in a or "DEPTO" in a or "DEPARTAMENTO" in a: return "Departamento"
    if "CASA" in a: return "Casa"
    if "LOCAL" in a or "OFICINA" in a: return "Comercial"
    return "-"

rows = []

def add(e, source):
    direccion = e.get("direccion") or e.get("neighborhood") or ""
    comuna = e.get("comuna") or ""
    tipo = e.get("propertyType") or e.get("tipo") or infer_type(direccion)
    price_uf = e.get("price")
    price_clp = e.get("price_clp")
    if price_uf is None and price_clp is not None:
        price_uf = round(price_clp / UF_HOY)
    if price_clp is None and price_uf is not None:
        price_clp = int(price_uf * UF_HOY)
    fotos = "Sí" if (e.get("images") and len(e["images"]) > 0) else "No"
    estado = e.get("estado") or e.get("status") or "disponible"
    banco = e.get("bankOrigin") or ("Scotiabank" if e.get("lista") == "LISTA 1" else "")
    rows.append([
        e.get("code") or f"SF-{e.get('id','')}",
        direccion,
        comuna,
        e.get("region") or "",
        tipo,
        price_uf if price_uf is not None else "",
        price_clp if price_clp is not None else "",
        e.get("bedrooms") or "",
        e.get("bathrooms") or "",
        e.get("parking") or "",
        e.get("area") or "",
        estado.title() if isinstance(estado,str) else estado,
        fotos,
        banco,
        (e.get("notas") or e.get("descripcion") or "")[:80],
    ])

for e in matched: add(e, "matched")
for e in unmatched: add(e, "unmatched")

wb = openpyxl.Workbook()
ws = wb.active
ws.title = "Propiedades"

headers = ["Código","Dirección","Comuna","Región","Tipo","Precio UF","Precio CLP","Dorm","Baños","Estac.","m²","Estado","Fotos","Banco","Observaciones"]
ws.append(headers)

header_fill = PatternFill("solid", fgColor="1F3A5F")
header_font = Font(bold=True, color="FFFFFF", size=10)
thin = Side(style="thin", color="B0B0B0")
border = Border(left=thin, right=thin, top=thin, bottom=thin)

for col in range(1, len(headers)+1):
    c = ws.cell(row=1, column=col)
    c.fill = header_fill; c.font = header_font
    c.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
    c.border = border

for r in rows:
    ws.append(r)

for row in ws.iter_rows(min_row=2, max_row=ws.max_row, min_col=1, max_col=len(headers)):
    for c in row:
        c.border = border
        c.alignment = Alignment(vertical="top", wrap_text=True, horizontal="center" if c.column in (1,4,5,6,7,8,9,10,11,12,13) else "left")
        if isinstance(c.value, (int, float)):
            c.number_format = '#,##0'

widths = [10, 40, 18, 12, 14, 12, 14, 8, 8, 9, 10, 14, 8, 14, 40]
for i, w in enumerate(widths, start=1):
    ws.column_dimensions[get_column_letter(i)].width = w

ws.freeze_panes = "A2"
ws.auto_filter.ref = f"A1:{get_column_letter(len(headers))}{ws.max_row}"

wb.save("public/listado-completo.xlsx")
print("Excel guardado:", len(rows), "propiedades")
