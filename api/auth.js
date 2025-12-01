import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "./config";

/**
 * Registrar nuevo usuario
 * @param {Object} datos - { nombre, correo, contrasena }
 * @returns {Promise<Object>} Datos del usuario registrado
 */
export async function registrar(datos) {
  try {
    const response = await fetch(`${BASE_URL}/usuarios/registrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || "Error al registrar usuario");
    }

    // Si el registro incluye auto-login, guardar token
    if (data.token) {
      await AsyncStorage.setItem("authToken", data.token);
      await AsyncStorage.setItem(
        "userData",
        JSON.stringify({
          id: data.id,
          nombre: data.nombre,
          correo: data.correo,
        })
      );
    }

    return data;
  } catch (error) {
    console.error("Error en registrar:", error);
    throw error;
  }
}

/**
 * Iniciar sesión
 * @param {Object} credenciales - { correo, contrasena }
 * @returns {Promise<Object>} Datos del usuario y token
 */
export async function login(credenciales) {
  try {
    console.log("Iniciando login para:", credenciales.correo);

    const response = await fetch(`${BASE_URL}/usuarios/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credenciales),
    });

    const data = await response.json();
    console.log("Respuesta del servidor:", data);

    if (!response.ok) {
      throw new Error(data.mensaje || "Credenciales incorrectas");
    }

    // Guardar token en AsyncStorage
    if (data.token) {
      console.log("Guardando token en AsyncStorage...");
      await AsyncStorage.setItem("authToken", data.token);
      await AsyncStorage.setItem(
        "userData",
        JSON.stringify({
          id: data.id,
          nombre: data.nombre,
          correo: data.correo,
        })
      );
      console.log("Datos guardados exitosamente");
    } else {
      console.log("No se recibió token del servidor");
    }

    return data;
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
}

/**
 * Cerrar sesión (elimina token del almacenamiento local)
 * @returns {Promise<Object>} Mensaje de confirmación
 */
export async function logout() {
  try {
    // Obtener token antes de eliminarlo
    const token = await AsyncStorage.getItem("authToken");

    // Eliminar token y datos del usuario del almacenamiento local
    await AsyncStorage.multiRemove(["authToken", "userData"]);

    // Opcionalmente notificar al servidor (si es necesario)
    if (token) {
      try {
        await fetch(`${BASE_URL}/usuarios/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (serverError) {
        // Ignorar errores del servidor en logout
        console.log("Error al notificar logout al servidor:", serverError);
      }
    }

    return { mensaje: "Sesión cerrada exitosamente" };
  } catch (error) {
    console.error("Error en logout:", error);
    throw error;
  }
}

/**
 * Obtener datos del usuario autenticado
 * Valida si el token es válido
 * @returns {Promise<Object>} Datos del usuario actual
 */
export async function getUsuarios() {
  try {
    console.log("Verificando autenticación...");

    const token = await AsyncStorage.getItem("authToken");
    const userData = await AsyncStorage.getItem("userData");

    console.log("Token encontrado:", token ? "Sí" : "No");
    console.log("UserData encontrado:", userData ? "Sí" : "No");

    if (!token || !userData) {
      console.log("No hay sesión activa en AsyncStorage");
      throw new Error("No hay sesión activa");
    }

    // Por ahora solo validar localmente para diagnosticar el problema
    const parsedUserData = JSON.parse(userData);
    console.log(
      "Datos locales encontrados para usuario:",
      parsedUserData.nombre
    );

    // TODO: Descomentar validación del servidor cuando funcione el flujo básico
    /*
    console.log("Validando token con servidor...");
    const response = await fetch(`${BASE_URL}/usuarios`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Respuesta del servidor - status:", response.status);

    if (!response.ok) {
      console.log("Token inválido, limpiando almacenamiento");
      await AsyncStorage.multiRemove(["authToken", "userData"]);
      throw new Error("Token inválido");
    }
    */

    return parsedUserData;
  } catch (error) {
    console.error("Error en getUsuarios:", error.message);
    throw error;
  }
}
