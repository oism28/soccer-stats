import { BASE_URL } from "./config";

const base = BASE_URL.replace(/\/$/, "");

export async function getPersonaById(id) {
  const res = await fetch(`${base}/personas/${id}`);
  return res.json();
}

export async function getPartidosPersona(id) {
  const res = await fetch(`${base}/personas/${id}/partidos`);
  return res.json();
}

export default { getPersonaById, getPartidosPersona };
