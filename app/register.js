// app/register.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { registrar } from '../api/auth';
import { ScreenLayout } from "../components/ScreenLayout";

export default function RegisterScreen() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [loading, setLoading] = useState(false);

  // Validación de email
  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegistro = async () => {
    // Validaciones
    if (!nombre.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu nombre completo');
      return;
    }

    if (nombre.trim().length < 3) {
      Alert.alert('Error', 'El nombre debe tener al menos 3 caracteres');
      return;
    }

    if (!correo.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu correo electrónico');
      return;
    }

    if (!validarEmail(correo)) {
      Alert.alert('Error', 'Por favor ingresa un correo electrónico válido');
      return;
    }

    if (!contrasena) {
      Alert.alert('Error', 'Por favor ingresa una contraseña');
      return;
    }

    if (contrasena.length < 3) {
      Alert.alert('Error', 'La contraseña debe tener al menos 3 caracteres');
      return;
    }

    if (contrasena !== confirmarContrasena) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      const datos = {
        nombre: nombre.trim(),
        correo: correo.trim(),
        contrasena
      };

      await registrar(datos);
      
      // Registro exitoso
      Alert.alert(
        'Registro exitoso',
        'Tu cuenta ha sido creada. Ahora puedes iniciar sesión.',
        [
          {
            text: 'Continuar',
            onPress: () => router.replace('/login')
          }
        ]
      );
    } catch (error) {
      Alert.alert(
        'Error en el registro',
        error.message || 'No se pudo completar el registro. Por favor intenta nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <ScrollView className="flex-1">
    <ScreenLayout>
      {/* Header */}
      <View className="pt-16 pb-8 px-6 bg-#040D12 border-b border-#183D3D">
        <Text className="text-[#93B1A6] text-3xl font-bold mb-2">
          Crear Cuenta
        </Text>
        <Text className="text-gray-400 text-base">
          Regístrate para acceder a todas las funciones
        </Text>
      </View>

      {/* Formulario */}
      <View className="px-6 pt-8 pb-12">
        {/* Campo de Nombre */}
        <View className="mb-6">
          <Text className="text-[#93B1A6] text-sm font-medium mb-2">
            Nombre Completo
          </Text>
          <TextInput
            className="bg-[#183D3D] text-white px-4 py-3 rounded-lg border border-[#5C8374]"
            placeholder="Ej: Alexis Tuz"
            placeholderTextColor="#6B7280"
            value={nombre}
            onChangeText={setNombre}
            autoCapitalize="words"
          />
        </View>

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
          />
        </View>

        {/* Campo de Contraseña */}
        <View className="mb-6">
          <Text className="text-[#93B1A6] text-sm font-medium mb-2">
            Contraseña
          </Text>
          <TextInput
            className="bg-[#183D3D] text-white px-4 py-3 rounded-lg border border-[#5C8374]"
            placeholder="Mínimo 3 caracteres"
            placeholderTextColor="#6B7280"
            value={contrasena}
            onChangeText={setContrasena}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        {/* Confirmar Contraseña */}
        <View className="mb-8">
          <Text className="text-[#93B1A6] text-sm font-medium mb-2">
            Confirmar Contraseña
          </Text>
          <TextInput
            className="bg-[#183D3D] text-white px-4 py-3 rounded-lg border border-[#5C8374]"
            placeholder="Repite tu contraseña"
            placeholderTextColor="#6B7280"
            value={confirmarContrasena}
            onChangeText={setConfirmarContrasena}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        {/* Botón Registro */}
        <TouchableOpacity
          className={`bg-[#5C8374] py-4 rounded-lg items-center ${loading ? 'opacity-50' : ''}`}
          onPress={handleRegistro}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-base font-bold">
              Registrarse
            </Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-400">¿Ya tienes cuenta? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text className="text-[#5C8374] font-semibold">Inicia Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenLayout>
  </ScrollView>
);
}