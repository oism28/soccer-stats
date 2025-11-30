import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import { getCompeticiones } from "../api/competiciones";
import CompetitionCard from "../components/CompetitionCard";
import { ScreenLayout } from "../components/ScreenLayout";

export default function CompeticionesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await getCompeticiones();
        const list = Array.isArray(res)
          ? res
          : (res?.competitions ?? res?.data ?? []);
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
          Todas las competiciones
        </Text>

        {loading ? (
          <View className="items-center mt-8">
            <ActivityIndicator size="large" color="#40A578" />
            <Text className="text-[#7BA05B] mt-4">
              Cargando competiciones...
            </Text>
          </View>
        ) : (
          <View className="flex-row flex-wrap justify-center">
            {items.map((c, i) => {
              const id = c?.id ?? `comp-${i}`;
              return (
                <View key={id} className="mr-4 mb-4">
                  <CompetitionCard item={c} />
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </ScreenLayout>
  );
}
