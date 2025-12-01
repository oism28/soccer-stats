const BASE_URL = "https://soccer-stats-pc1w.onrender.com";

/**
 * Registrar nuevo usuario
 * @param {Object} datos - { nombre, correo, contrasena }
 * @returns {Promise<Object>} Datos del usuario registrado
 */
export async function registrar(datos) {
  try {
    const response = await fetch(`${BASE_URL}/usuarios/registrar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
      credentials: 'include', // CRÍTICO: Permite enviar/recibir cookies
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || 'Error al registrar usuario');
    }

    return data;
  } catch (error) {
    console.error('Error en registrar:', error);
    throw error;
  }
}

/**
 * Iniciar sesión
 * @param {Object} credenciales - { correo, contrasena }
 * @returns {Promise<Object>} Datos del usuario y token (la cookie se setea automáticamente)
 */
export async function login(credenciales) {
  try {
    const response = await fetch(`${BASE_URL}/usuarios/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credenciales),
      credentials: 'include', // CRÍTICO: Permite recibir la cookie HttpOnly
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || 'Credenciales incorrectas');
    }

    // El backend retorna: { id, nombre, correo, token }
    // La cookie 'soccer-stats-token' se setea automáticamente
    return data;
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
}

/**
 * Cerrar sesión (elimina cookie del servidor)
 * @returns {Promise<Object>} Mensaje de confirmación
 */
export async function logout() {
  try {
    const response = await fetch(`${BASE_URL}/usuarios/logout`, {
      method: 'POST',
      credentials: 'include', // CRÍTICO: Envía la cookie para eliminarla
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || 'Error al cerrar sesión');
    }

    return data;
  } catch (error) {
    console.error('Error en logout:', error);
    throw error;
  }
}

/**
 * Obtener datos del usuario autenticado
 * Valida si la cookie es válida
 * @returns {Promise<Object>} Datos del usuario actual
 */
export async function getUsuarios() {
  try {
    const response = await fetch(`${BASE_URL}/usuarios`, {
      method: 'GET',
      credentials: 'include', // CRÍTICO: Envía la cookie automáticamente
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || 'No autenticado');
    }

    // Retorna: { id, nombre, correo }
    return data;
  } catch (error) {
    console.error('Error en getUsuarios:', error);
    throw error;
  }
}

// Exportar la BASE_URL por si se necesita en otros archivos
export { BASE_URL };