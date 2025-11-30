import { BASE_URL } from "./config";

const base = BASE_URL.replace(/\/$/, "");

export async function getCompeticiones() {
  const res = await fetch(`${base}/competiciones`);
  return res.json();
}

export async function getCompeticionById(id) {
  const res = await fetch(`${base}/competiciones/${id}`);
  return res.json();
}

export async function getPosiciones(competicionId) {
  const res = await fetch(`${base}/competiciones/${competicionId}/posiciones`);
  return res.json();
}

export async function getPartidos(competicionId) {
  const res = await fetch(`${base}/competiciones/${competicionId}/partidos`);
  return res.json();
}

export async function getTeams(competicionId) {
  const res = await fetch(`${base}/competiciones/${competicionId}/teams`);
  return res.json();
}

export async function getGoleadores(competicionId) {
  const res = await fetch(`${base}/competiciones/${competicionId}/goleadores`);
  return res.json();
}

export default {
  getCompeticiones,
  getCompeticionById,
  getPosiciones,
  getPartidos,
  getTeams,
  getGoleadores,
};
