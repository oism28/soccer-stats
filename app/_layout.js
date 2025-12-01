import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { getUsuarios } from "../api/auth";
import { ScreenLayout } from "../components/ScreenLayout";
import "../global.css";

export default function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    checkAuth();
  }, []);

  // Agregar listener para cambios en los segments para re-verificar auth
  useEffect(() => {
    if (segments[0] === "(tabs)" && isAuthenticated === false && !isLoading) {
      console.log("Re-verificando autenticación al entrar a tabs...");
      // Re-verificar autenticación después de un pequeño delay
      setTimeout(() => {
        checkAuth();
      }, 200);
    }
  }, [segments]);

  useEffect(() => {
    console.log(
      "Layout useEffect - isLoading:",
      isLoading,
      "isAuthenticated:",
      isAuthenticated,
      "segments:",
      segments
    );

    if (isLoading || isAuthenticated === null) return;

    const inTabsGroup = segments[0] === "(tabs)";
    console.log("Usuario en tabs group:", inTabsGroup);

    if (!isAuthenticated && inTabsGroup) {
      console.log("Usuario no autenticado en tabs, redirigiendo a login");
      router.replace("/login");
    } else if (isAuthenticated && !inTabsGroup) {
      console.log("Usuario autenticado fuera de tabs, redirigiendo a tabs");
      router.replace("/(tabs)");
    } else {
      console.log("Usuario en la ubicación correcta");
    }
  }, [isAuthenticated, segments, isLoading]);

  const checkAuth = async () => {
    console.log("Iniciando verificación de autenticación...");
    try {
      const usuario = await getUsuarios();

      if (usuario && usuario.id) {
        console.log("Usuario autenticado:", usuario.nombre);
        setIsAuthenticated(true);
      } else {
        console.log("Usuario no válido:", usuario);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log("Error verificando autenticación:", error.message);
      setIsAuthenticated(false);
    } finally {
      console.log("Verificación completada, isLoading = false");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-gray-900 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScreenLayout>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ScreenLayout>
  );
}
