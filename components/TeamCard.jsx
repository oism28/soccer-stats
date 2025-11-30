import { Image, Text, TouchableOpacity, View } from "react-native";
import Flag from "./Flag";

export default function TeamCard({ item, onToggleFavorite, favorited }) {
  const flagUri = (() => {
    const candidates = [
      item?.area?.flag,
      item?.country?.flag,
      item?.flag,
      item?.countryFlag,
      item?.area?.emblem,
      item?.crest,
    ];
    return candidates.find(Boolean) || null;
  })();

  if (__DEV__ && flagUri) {
    try {
      console.log(`TeamCard flagUri for ${item?.name}:`, flagUri);
    } catch (e) {}
  }

  return (
    <View className="w-[220px] bg-gradient-to-br from-[#0F2624] to-[#0A1D1B] rounded-[16px] p-5 mr-4 border border-[#2A5750] shadow-xl">
      <View className="flex-col space-y-4">
        {/* Header with team crest and favorite */}
        <View className="flex-row items-center justify-between">
          {item.crest ? (
            <View className="w-16 h-16 rounded-full bg-white/10 p-1 shadow-lg">
              <Image
                source={{ uri: item.crest }}
                className="w-14 h-14 rounded-full"
                resizeMode="contain"
              />
            </View>
          ) : (
            <View className="w-16 h-16 rounded-full bg-gradient-to-br from-[#234E47] to-[#183D3D] items-center justify-center border-2 border-[#40A578] shadow-lg">
              <Text className="text-[24px]">⚽</Text>
            </View>
          )}

          <TouchableOpacity
            onPress={onToggleFavorite}
            className="w-10 h-10 rounded-full bg-[#1A3532] items-center justify-center border border-[#234E47] active:scale-95"
          >
            <Text className="text-[20px]">{favorited ? "❤️" : "🤍"}</Text>
          </TouchableOpacity>
        </View>

        {/* Team name */}
        <View className="flex-1">
          <Text
            className="text-[#E8F5E8] font-bold text-[16px] leading-tight"
            numberOfLines={2}
          >
            {item.name}
          </Text>
          {item?.shortName && item.shortName !== item.name && (
            <Text className="text-[#7BA05B] text-[12px] mt-1 font-medium">
              {item.shortName}
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
