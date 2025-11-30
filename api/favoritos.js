import { BASE_URL } from "./config";

const base = BASE_URL.replace(/\/$/, "");

// Competiciones favoritas
async function getCompeticionesFavoritas() {
  const res = await fetch(`${base}/competiciones-favoritas`);
  return res.json();
}

async function addCompeticionFavorita({ competicion_id }) {
  const res = await fetch(`${base}/competiciones-favoritas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ competicion_id }),
  });
  return res.json();
}

async function removeCompeticionFavorita(id) {
  const res = await fetch(`${base}/competiciones-favoritas/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

// Equipos favoritos
async function getEquiposFavoritos() {
  const res = await fetch(`${base}/equipos-favoritos`);
  return res.json();
}

async function addEquipoFavorito({ equipo_id }) {
  const res = await fetch(`${base}/equipos-favoritos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ equipo_id }),
  });
  return res.json();
}

async function removeEquipoFavorito(id) {
  const res = await fetch(`${base}/equipos-favoritos/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

// Personas favoritas
async function getPersonasFavoritas() {
  const res = await fetch(`${base}/favoritos-personas`);
  return res.json();
}

async function addPersonaFavorita({ jugador_id }) {
  const res = await fetch(`${base}/favoritos-personas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jugador_id }),
  });
  return res.json();
}

async function removePersonaFavorita(id) {
  const res = await fetch(`${base}/favoritos-personas/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

export const competiciones = {
  getFavoritas: getCompeticionesFavoritas,
  addFavorita: addCompeticionFavorita,
  removeFavorita: removeCompeticionFavorita,
};

export const equipos = {
  getFavoritos: getEquiposFavoritos,
  addFavorito: addEquipoFavorito,
  removeFavorito: removeEquipoFavorito,
};

export const personas = {
  getFavoritos: getPersonasFavoritas,
  addFavorito: addPersonaFavorita,
  removeFavorito: removePersonaFavorita,
};

export default { competiciones, equipos, personas };
