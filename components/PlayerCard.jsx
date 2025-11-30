import { Text, TouchableOpacity, View } from "react-native";
import Flag from "./Flag";

export default function PlayerCard({ item, onToggleFavorite, favorited }) {
  const flagUri = (() => {
    const candidates = [
      item?.country?.flag,
      item?.area?.flag,
      item?.nationalityFlag,
      item?.flag,
      item?.countryFlag,
      item?.currentTeam?.area?.flag,
      item?.currentTeam?.crest,
    ];
    return candidates.find(Boolean) || null;
  })();

  if (__DEV__ && flagUri) {
    try {
      console.log(`PlayerCard flagUri for ${item?.name}:`, flagUri);
    } catch (e) {}
  }

  return (
    <View className="w-[200px] bg-gradient-to-br from-[#0F2624] to-[#0A1D1B] rounded-[16px] p-4 mr-4 border border-[#2A5750] shadow-xl">
      <View className="flex-col space-y-4">
        {/* Header with jersey number and favorite */}
        <View className="flex-row items-center justify-between">
          <View className="w-14 h-14 rounded-full bg-gradient-to-br from-[#234E47] to-[#183D3D] items-center justify-center border-2 border-[#40A578] shadow-lg">
            <Text className="text-[#40A578] font-bold text-[18px]">
              {item?.shirtNumber ? `#${item.shirtNumber}` : "—"}
            </Text>
          </View>

          <TouchableOpacity
            onPress={onToggleFavorite}
            className="w-10 h-10 rounded-full bg-[#1A3532] items-center justify-center border border-[#234E47] active:scale-95"
          >
            <Text className="text-[20px]">{favorited ? "❤️" : "🤍"}</Text>
          </TouchableOpacity>
        </View>

        {/* Player name */}
        <View className="flex-1">
          <Text
            className="text-[#E8F5E8] font-bold text-[16px] leading-tight"
            numberOfLines={2}
          >
            {item.name}
          </Text>
          {item?.position && (
            <Text className="text-[#7BA05B] text-[12px] mt-1 font-medium">
              {item.position}
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
