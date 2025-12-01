// app/(tabs)/perfil.js
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getUsuarios, logout } from "../../api/auth";

export default function PerfilScreen() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    cargarDatosUsuario();
  }, []);

  const cargarDatosUsuario = async () => {
    try {
      const datos = await getUsuarios();
      setUsuario(datos);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar tus datos");
      console.error("Error al cargar usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert("Cerrar Sesión", "¿Estás seguro que deseas cerrar sesión?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Cerrar Sesión",
        style: "destructive",
        onPress: async () => {
          setLoggingOut(true);
          try {
            await logout();
            // Redirigir a login
            router.replace("/login");
          } catch (error) {
            Alert.alert("Error", "No se pudo cerrar sesión");
            console.error("Error al cerrar sesión:", error);
          } finally {
            setLoggingOut(false);
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View className="flex-1 bg-[#040D12] items-center justify-center">
        <ActivityIndicator size="large" color="#40A578" />
        <Text className="text-[#7BA05B] mt-4 text-sm">Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-[#040D12] px-4 py-6">
      {/* Header */}
      <View className="mb-8 items-center">
        <View className="p-6 bg-gradient-to-br from-[#234E47] to-[#183D3D] rounded-full mb-4 shadow-lg border-2 border-[#40A578]">
          <Text className="text-[40px]">👤</Text>
        </View>
        <Text className="text-[32px] font-bold text-[#E8F5E8] text-center leading-tight">
          Mi Perfil
        </Text>
        <Text className="text-[16px] text-[#7BA05B] text-center mt-3 px-4 leading-relaxed">
          Gestiona tu cuenta y preferencias
        </Text>
      </View>

      {/* Avatar y nombre del usuario */}
      <View className="items-center mb-8">
        <View className="w-24 h-24 bg-gradient-to-br from-[#234E47] to-[#183D3D] rounded-full items-center justify-center mb-4 shadow-lg border-2 border-[#40A578]">
          <Text className="text-[#E8F5E8] text-4xl font-bold">
            {usuario?.nombre?.charAt(0).toUpperCase() || "?"}
          </Text>
        </View>
        <Text className="text-[#E8F5E8] text-2xl font-bold">
          {usuario?.nombre || "Usuario"}
        </Text>
      </View>

      {/* Datos del Usuario */}
      <View className="bg-gradient-to-br from-[#0F2624] to-[#0A1D1B] rounded-[16px] p-5 mb-6 border border-[#2A5750] shadow-xl">
        <View className="flex-row items-center mb-4">
          <View className="w-1 h-6 bg-[#40A578] rounded-full mr-3"></View>
          <Text className="text-[#E8F5E8] font-bold text-lg">
            Información Personal
          </Text>
        </View>

        <View className="mb-4 pb-4 border-b border-[#234E47]">
          <Text className="text-[#7BA05B] text-sm mb-1">ID de Usuario</Text>
          <Text className="text-[#E8F5E8] text-base font-medium">
            #{usuario?.id || "N/A"}
          </Text>
        </View>

        <View className="mb-4 pb-4 border-b border-[#234E47]">
          <Text className="text-[#7BA05B] text-sm mb-1">Nombre</Text>
          <Text className="text-[#E8F5E8] text-base font-medium">
            {usuario?.nombre || "No disponible"}
          </Text>
        </View>

        <View>
          <Text className="text-[#7BA05B] text-sm mb-1">
            Correo Electrónico
          </Text>
          <Text className="text-[#E8F5E8] text-base font-medium">
            {usuario?.correo || "No disponible"}
          </Text>
        </View>
      </View>

      {/* Estadísticas
      <View className="bg-gradient-to-br from-[#0F2624] to-[#0A1D1B] rounded-[16px] p-5 mb-6 border border-[#2A5750] shadow-xl">
        <View className="flex-row items-center mb-4">
          <View className="w-1 h-6 bg-[#40A578] rounded-full mr-3"></View>
          <Text className="text-[#E8F5E8] font-bold text-lg">Estadísticas</Text>
        </View>
        <View className="flex-row justify-around">
          <View className="items-center">
            <View className="w-12 h-12 rounded-full bg-gradient-to-br from-[#234E47] to-[#183D3D] items-center justify-center mb-2 border border-[#40A578]">
              <Text className="text-[#40A578] text-xl font-bold">0</Text>
            </View>
            <Text className="text-[#7BA05B] text-sm">Favoritos</Text>
          </View>
          <View className="items-center">
            <View className="w-12 h-12 rounded-full bg-gradient-to-br from-[#234E47] to-[#183D3D] items-center justify-center mb-2 border border-[#40A578]">
              <Text className="text-[#40A578] text-xl font-bold">0</Text>
            </View>
            <Text className="text-[#7BA05B] text-sm">Equipos</Text>
          </View>
          <View className="items-center">
            <View className="w-12 h-12 rounded-full bg-gradient-to-br from-[#234E47] to-[#183D3D] items-center justify-center mb-2 border border-[#40A578]">
              <Text className="text-[#40A578] text-xl font-bold">0</Text>
            </View>
            <Text className="text-[#7BA05B] text-sm">Ligas</Text>
          </View>
        </View>
      </View>
       */}

      {/* Botón de Cerrar Sesión */}
      <TouchableOpacity
        className={`bg-gradient-to-br from-red-600 to-red-700 py-4 rounded-[16px] items-center border border-red-500 shadow-xl ${loggingOut ? "opacity-50" : ""}`}
        onPress={handleLogout}
        disabled={loggingOut}
      >
        {loggingOut ? (
          <ActivityIndicator color="#E8F5E8" />
        ) : (
          <Text className="text-[#E8F5E8] text-base font-bold">
            Cerrar Sesión
          </Text>
        )}
      </TouchableOpacity>

      {/* Espacio inferior */}
      <View className="h-8" />
    </ScrollView>
  );
}
