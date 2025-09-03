import { Text, View } from "react-native";

export function Score({ score }) {
  const getColor = () => {
    if (score >= 90) {
      return "border-green-700";
    } else if (score >= 80) {
      return "border-white";
    } else {
      return "border-red-700";
    }
  };
  const className = getColor();

  return (
    <View>
      <Text
        className={` ${className}  text-white mt-2.5 mb-2.5 h-12 w-12 border-4 rounded-full  p-2 justify-center items-center`}
      >
        {score}
      </Text>
    </View>
  );
}
