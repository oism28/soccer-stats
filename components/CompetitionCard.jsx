import { Image, Text, TouchableOpacity, View } from "react-native";
import Flag from "./Flag";

export default function CompetitionCard({ item, onToggleFavorite, favorited }) {
  const flagUri = (() => {
    const candidates = [
      item?.area?.flag,
      item?.country?.flag,
      item?.flag,
      item?.emblemFlag,
      item?.area?.emblem,
      item?.emblem,
    ];
    return candidates.find(Boolean) || null;
  })();

  return (
    <View className="w-[240px] bg-gradient-to-br from-[#0F2624] to-[#0A1D1B] rounded-[16px] p-5 mr-4 border border-[#2A5750] shadow-xl">
      <View className="flex-col space-y-4">
        {/* Header with competition emblem and favorite */}
        <View className="flex-row items-center justify-between">
          {item.emblem ? (
            <Image
              source={{ uri: item.emblem }}
              className="w-16 h-16"
              resizeMode="contain"
            />
          ) : (
            <View className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] items-center justify-center border-2 border-[#FFD700] shadow-lg">
              <Text className="text-[24px]">🏆</Text>
            </View>
          )}

          <View className="flex-column items-center gap-8">
            <TouchableOpacity
              onPress={onToggleFavorite}
              className="w-10 h-10 rounded-full bg-[#1A3532] items-center justify-center border border-[#234E47] active:scale-95"
            >
              <Text className="text-[20px]">{favorited ? "❤️" : "🤍"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Competition info */}
        <View className="flex-1">
          <Text
            className="text-[#E8F5E8] font-bold text-[16px] leading-tight"
            numberOfLines={2}
          >
            {item.name}
          </Text>
          {(item.code || item.area?.name) && (
            <Text className="text-[#7BA05B] text-[12px] mt-1 font-medium">
              {item.code || item.area?.name || ""}
            </Text>
          )}
          {item?.currentSeason?.startDate && (
            <Text className="text-[#5C8374] text-[10px] mt-1">
              Season: {new Date(item.currentSeason.startDate).getFullYear()}
            </Text>
          )}
          <View className="flex-1justify-start mt-2">
            <Flag uri={flagUri} />
          </View>
        </View>
      </View>
    </View>
  );
}
