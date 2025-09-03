import { View } from "react-native";

export function ScreenLayout({ children }) {
  return <View className="flex-1 bg-black  ">{children}</View>;
}
