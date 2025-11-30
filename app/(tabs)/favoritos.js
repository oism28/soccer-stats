import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { ScreenLayout } from "../../components/ScreenLayout";

export default function Favoritos() {
  return (
    <ScreenLayout>
      <ScrollView className="flex-1 bg-transparent">
        <View className="px-5 py-5 pb-10">
          <View className="flex-row items-center gap-3 mb-4">
            <Text className="text-[24px]">❤️</Text>
            <Text className="text-[24px] font-bold text-[#93B1A6]">
              My Favorites
            </Text>
          </View>

          {/* Favorite Players (empty state) */}
          <View className="mb-5">
            <Text className="text-[18px] font-bold text-[#93B1A6] mb-3">
              Favorite Players
            </Text>
            <View className="bg-[#183D3D] rounded-[15px] p-[30px] items-center border border-[#5C8374]">
              <Text className="text-[36px]">💚</Text>
              <Text className="text-[18px] font-bold text-[#93B1A6] mt-[12px]">
                No favorite players yet
              </Text>
              <Text className="text-[14px] text-[#5C8374] mt-[6px]">
                Add players from the Stats page!
              </Text>
            </View>
          </View>

          {/* Favorite Teams (empty state) */}
          <View className="mb-5">
            <Text className="text-[18px] font-bold text-[#93B1A6] mb-3">
              Favorite Teams
            </Text>
            <View className="bg-[#183D3D] rounded-[15px] p-[30px] items-center border border-[#5C8374]">
              <Text className="text-[36px]">🏆</Text>
              <Text className="text-[18px] font-bold text-[#93B1A6] mt-[12px]">
                No favorite teams yet
              </Text>
              <Text className="text-[14px] text-[#5C8374] mt-[6px]">
                Add teams from the Stats page!
              </Text>
            </View>
          </View>

          {/* Favorite Leagues (empty state) */}
          <View className="mb-5">
            <Text className="text-[18px] font-bold text-[#93B1A6] mb-3">
              Favorite Leagues
            </Text>
            <View className="bg-[#183D3D] rounded-[15px] p-[30px] items-center border border-[#5C8374]">
              <Text className="text-[36px]">📈</Text>
              <Text className="text-[18px] font-bold text-[#93B1A6] mt-[12px]">
                No favorite leagues yet
              </Text>
              <Text className="text-[14px] text-[#5C8374] mt-[6px]">
                Add leagues from the Stats page!
              </Text>
            </View>
          </View>

          <Link asChild href="/">
            <Pressable className="mt-[20px] py-[10px] px-[14px] bg-[#93B1A6] rounded-[8px] self-start">
              <Text className="text-[#040D12] font-semibold">← Inicio</Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}

/* Styles converted to Tailwind classes (className) */
