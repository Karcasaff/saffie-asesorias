let cached = null;
let fetchedAt = 0;
const TTL = 24 * 60 * 60 * 1000;

export async function getUF() {
  const now = Date.now();
  if (cached && now - fetchedAt < TTL) return cached;
  try {
    const res = await fetch("https://mindicador.cl/api/uf", { cache: "no-store" });
    const data = await res.json();
    const val = parseFloat(String(data.serie[0].valor).replace(",", "."));
    if (!isNaN(val)) {
      cached = val; fetchedAt = now;
      try { localStorage.setItem("uf_valor", String(val)); localStorage.setItem("uf_fecha", String(now)); } catch {}
      return val;
    }
  } catch {}
  try {
    const v = localStorage.getItem("uf_valor"); const f = localStorage.getItem("uf_fecha");
    if (v && f && now - parseFloat(f) < TTL) {
      cached = parseFloat(v); fetchedAt = parseFloat(f); return cached;
    }
  } catch {}
  return null;
}

export function fmtCLP(v) {
  if (v == null) return "—";
  return "$" + v.toLocaleString("es-CL");
}
export function fmtUF(v) {
  if (v == null) return "—";
  return "UF " + v.toLocaleString("es-CL");
}
