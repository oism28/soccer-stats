import { BASE_URL } from "./config";

const base = BASE_URL.replace(/\/$/, "");

export async function registrar({ nombre, correo, contrasena }) {
  const res = await fetch(`${base}/usuarios/registrar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, correo, contrasena }),
  });
  return res.json();
}

export async function login({ correo, contrasena }) {
  const res = await fetch(`${base}/usuarios/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, contrasena }),
  });
  return res.json();
}

export async function logout() {
  const res = await fetch(`${base}/usuarios/logout`, { method: "POST" });
  return res.json();
}

export async function getUsuarios() {
  const res = await fetch(`${base}/usuarios`, { method: "GET" });
  return res.json();
}

export default { registrar, login, logout, getUsuarios };
