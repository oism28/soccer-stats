import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "./config";

const base = BASE_URL.replace(/\/$/, "");

// Competiciones favoritas
async function getCompeticionesFavoritas() {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      return [];
    }

    const res = await fetch(`${base}/competiciones-favoritas`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not JSON");
    }

    return await res.json();
  } catch (error) {
    console.error("Error in getCompeticionesFavoritas:", error);
    return [];
  }
}

async function addCompeticionFavorita({ competicion_id }) {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      throw new Error("No authentication token");
    }

    const res = await fetch(`${base}/competiciones-favoritas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ competicion_id }),
    });
    return res.json();
  } catch (error) {
    console.error("Error in addCompeticionFavorita:", error);
    throw error;
  }
}

async function removeCompeticionFavorita(id) {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      throw new Error("No authentication token");
    }

    const res = await fetch(`${base}/competiciones-favoritas/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    console.error("Error in removeCompeticionFavorita:", error);
    throw error;
  }
}

// Equipos favoritos
async function getEquiposFavoritos() {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      return [];
    }

    const res = await fetch(`${base}/equipos-favoritos`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not JSON");
    }

    return await res.json();
  } catch (error) {
    console.error("Error in getEquiposFavoritos:", error);
    return [];
  }
}

async function addEquipoFavorito({ equipo_id }) {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      throw new Error("No authentication token");
    }

    const res = await fetch(`${base}/equipos-favoritos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ equipo_id }),
    });
    return res.json();
  } catch (error) {
    console.error("Error in addEquipoFavorito:", error);
    throw error;
  }
}

async function removeEquipoFavorito(id) {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      throw new Error("No authentication token");
    }

    const res = await fetch(`${base}/equipos-favoritos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    console.error("Error in removeEquipoFavorito:", error);
    throw error;
  }
}

// Personas favoritas
async function getPersonasFavoritas() {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      return [];
    }

    const res = await fetch(`${base}/favoritos-personas`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not JSON");
    }

    return await res.json();
  } catch (error) {
    console.error("Error in getPersonasFavoritas:", error);
    return [];
  }
}

async function addPersonaFavorita({ jugador_id }) {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      throw new Error("No authentication token");
    }

    const res = await fetch(`${base}/favoritos-personas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ jugador_id }),
    });
    return res.json();
  } catch (error) {
    console.error("Error in addPersonaFavorita:", error);
    throw error;
  }
}

async function removePersonaFavorita(id) {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      throw new Error("No authentication token");
    }

    const res = await fetch(`${base}/favoritos-personas/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    console.error("Error in removePersonaFavorita:", error);
    throw error;
  }
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

// Funciones toggle para facilitar el uso
export async function toggleCompeticionFavorita(competicionId) {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      throw new Error("No authentication token");
    }

    const response = await fetch(`${base}/competiciones-favoritas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ competicion_id: competicionId }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error en toggleCompeticionFavorita:", error);
    throw error;
  }
}

export async function toggleEquipoFavorito(equipoId) {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      throw new Error("No authentication token");
    }

    const response = await fetch(`${base}/equipos-favoritos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ equipo_id: equipoId }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error en toggleEquipoFavorito:", error);
    throw error;
  }
}

export async function togglePersonaFavorita(personaId) {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      throw new Error("No authentication token");
    }

    const response = await fetch(`${base}/favoritos-personas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ jugador_id: personaId }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error en togglePersonaFavorita:", error);
    throw error;
  }
}

export default { competiciones, equipos, personas };
