import { BASE_URL } from "./config";

const base = BASE_URL.replace(/\/$/, "");

export async function getEquipos() {
  try {
    const res = await fetch(`${base}/equipos`);
    const body = await res.json();

    if (Array.isArray(body)) return body;

    // Common server envelopes: { teams: [...] } | { data: [...] } | { data: { teams: [...] } }
    if (Array.isArray(body.teams)) return body.teams;
    // Spanish/other envelope: { equipos: [...] }
    if (Array.isArray(body.equipos)) return body.equipos;
    if (Array.isArray(body.data)) return body.data;
    if (Array.isArray(body?.data?.teams)) return body.data.teams;
    if (Array.isArray(body?.teams?.data)) return body.teams.data;
    if (Array.isArray(body?.data?.equipos)) return body.data.equipos;
    if (Array.isArray(body?.equipos?.data)) return body.equipos.data;

    // Fallback: return the raw body so callers can inspect it
    if (__DEV__) {
      try {
        console.log("getEquipos() response body:", body);
      } catch (e) {}
    }

    return body;
  } catch (err) {
    if (__DEV__) console.warn("getEquipos() failed to fetch/parse:", err);
    throw err;
  }
}

export async function getEquipoById(id) {
  const res = await fetch(`${base}/equipos/${id}`);
  return res.json();
}

export async function getPartidosEquipo(id) {
  const res = await fetch(`${base}/equipos/${id}/partidos`);
  return res.json();
}

export default { getEquipos, getEquipoById, getPartidosEquipo };
