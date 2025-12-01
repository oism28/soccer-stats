import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import { getEquipos } from "../../api/equipos";
import { ScreenLayout } from "../../components/ScreenLayout";
import TeamCard from "../../components/TeamCard";

export default function EquiposPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await getEquipos();
        const list = Array.isArray(res) ? res : (res?.teams ?? res?.data ?? []);
        if (mounted) setItems(list);
      } catch (e) {
        if (mounted) setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  return (
    <ScreenLayout>
      <ScrollView className="flex-1 p-4">
        <Text className="text-[#E8F5E8] text-[18px] font-bold mb-4">
          Todos los equipos
        </Text>

        {loading ? (
          <View className="items-center mt-8">
            <ActivityIndicator size="large" color="#40A578" />
            <Text className="text-[#7BA05B] mt-4">Cargando equipos...</Text>
          </View>
        ) : (
          <View className="flex-row flex-wrap justify-center">
            {items.map((t, i) => {
              const id = t?.id ?? `team-${i}`;
              return (
                <View key={id} className="mr-4 mb-4">
                  <TeamCard item={t} />
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </ScreenLayout>
  );
}
