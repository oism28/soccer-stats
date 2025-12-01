// app/login.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { login } from '../api/auth';
import { ScreenLayout } from "../components/ScreenLayout";

export default function LoginScreen() {
  const router = useRouter();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [loading, setLoading] = useState(false);

  // Validación básica de email
  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    // Validaciones
    if (!correo.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu correo electrónico');
      return;
    }

    if (!validarEmail(correo)) {
      Alert.alert('Error', 'Por favor ingresa un correo electrónico válido');
      return;
    }

    if (!contrasena.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu contraseña');
      return;
    }

    setLoading(true);

    try {
      const datos = await login({ correo: correo.trim(), contrasena });
      
      // Login exitoso - el token ya se guardó automáticamente en AsyncStorage
      console.log('Usuario autenticado:', datos);
      
      // Redirigir a tabs (home)
      router.replace('(tabs)/index');

    } catch (error) {
      Alert.alert(
        'Error de autenticación',
        error.message || 'Credenciales incorrectas. Por favor intenta nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <ScreenLayout>
    {/* Header */}
    <View className="pt-16 pb-8 px-6 bg-[#040D12] border-b border-[#183D3D]">
      <Text className="text-[#93B1A6] text-3xl font-bold mb-2">
        ⚽ Soccer Stats
      </Text>
      <Text className="text-gray-400 text-base">
        Inicia sesión para continuar
      </Text>
    </View>

    {/* Formulario */}
    <View className="flex-1 px-6 pt-8">
      {/* Campo de Correo */}
      <View className="mb-6">
        <Text className="text-[#93B1A6] text-sm font-medium mb-2">
          Correo Electrónico
        </Text>
        <TextInput
          className="bg-[#183D3D] text-white px-4 py-3 rounded-lg border border-[#5C8374]"
          placeholder="tu@email.com"
          placeholderTextColor="#6B7280"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />
      </View>

      {/* Campo de Contraseña */}
      <View className="mb-8">
        <Text className="text-[#93B1A6] text-sm font-medium mb-2">
          Contraseña
        </Text>
        <TextInput
          className="bg-[#183D3D] text-white px-4 py-3 rounded-lg border border-[#5C8374]"
          placeholder="••••••••"
          placeholderTextColor="#6B7280"
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry
          autoCapitalize="none"
          editable={!loading}
        />
      </View>

      {/* Botón de Login */}
      <TouchableOpacity
        className={`bg-[#5C8374] py-4 rounded-lg items-center ${loading ? 'opacity-50' : ''}`}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-base font-bold">
            Iniciar Sesión
          </Text>
        )}
      </TouchableOpacity>

      {/* Link a Registro */}
      <View className="flex-row justify-center mt-6">
        <Text className="text-gray-400">¿No tienes cuenta? </Text>
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text className="text-[#5C8374] font-semibold">Regístrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ScreenLayout>
);

}