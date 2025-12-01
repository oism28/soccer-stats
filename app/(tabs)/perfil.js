// app/(tabs)/perfil.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { getUsuarios, logout } from '../../api/auth';

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
      Alert.alert('Error', 'No se pudieron cargar tus datos');
      console.error('Error al cargar usuario:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            setLoggingOut(true);
            try {
              await logout();
              // Redirigir a login
              router.replace('/login');
            } catch (error) {
              Alert.alert('Error', 'No se pudo cerrar sesión');
              console.error('Error al cerrar sesión:', error);
            } finally {
              setLoggingOut(false);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View className="flex-1 bg-gray-900 items-center justify-center">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-900">
      {/* Header */}
      <View className="pt-16 pb-8 px-6 bg-gray-800">
        <Text className="text-white text-3xl font-bold mb-2">
          Mi Perfil
        </Text>
        <Text className="text-gray-400 text-base">
          Gestiona tu cuenta y preferencias
        </Text>
      </View>

      {/* Información del Usuario */}
      <View className="px-6 pt-8">
        {/* Avatar (placeholder) */}
        <View className="items-center mb-8">
          <View className="w-24 h-24 bg-blue-600 rounded-full items-center justify-center mb-4">
            <Text className="text-white text-4xl font-bold">
              {usuario?.nombre?.charAt(0).toUpperCase() || '?'}
            </Text>
          </View>
          <Text className="text-white text-2xl font-bold">
            {usuario?.nombre || 'Usuario'}
          </Text>
        </View>

        {/* Datos del Usuario */}
        <View className="bg-gray-800 rounded-lg p-4 mb-6">
          <View className="mb-4 pb-4 border-b border-gray-700">
            <Text className="text-gray-400 text-sm mb-1">ID de Usuario</Text>
            <Text className="text-white text-base font-medium">
              #{usuario?.id || 'N/A'}
            </Text>
          </View>

          <View className="mb-4 pb-4 border-b border-gray-700">
            <Text className="text-gray-400 text-sm mb-1">Nombre</Text>
            <Text className="text-white text-base font-medium">
              {usuario?.nombre || 'No disponible'}
            </Text>
          </View>

          <View>
            <Text className="text-gray-400 text-sm mb-1">Correo Electrónico</Text>
            <Text className="text-white text-base font-medium">
              {usuario?.correo || 'No disponible'}
            </Text>
          </View>
        </View>

        {/* Estadísticas (opcional - para futuro) */}
        <View className="bg-gray-800 rounded-lg p-4 mb-6">
          <Text className="text-white text-lg font-bold mb-4">Estadísticas</Text>
          <View className="flex-row justify-around">
            <View className="items-center">
              <Text className="text-blue-500 text-2xl font-bold">0</Text>
              <Text className="text-gray-400 text-sm">Favoritos</Text>
            </View>
            <View className="items-center">
              <Text className="text-blue-500 text-2xl font-bold">0</Text>
              <Text className="text-gray-400 text-sm">Equipos</Text>
            </View>
            <View className="items-center">
              <Text className="text-blue-500 text-2xl font-bold">0</Text>
              <Text className="text-gray-400 text-sm">Ligas</Text>
            </View>
          </View>
        </View>

        {/* Botón de Cerrar Sesión */}
        <TouchableOpacity
          className={`bg-red-600 py-4 rounded-lg items-center ${loggingOut ? 'opacity-50' : ''}`}
          onPress={handleLogout}
          disabled={loggingOut}
        >
          {loggingOut ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-base font-bold">
              Cerrar Sesión
            </Text>
          )}
        </TouchableOpacity>

        {/* Espacio inferior */}
        <View className="h-8" />
      </View>
    </ScrollView>
  );
}