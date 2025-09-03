import { Stack, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Score } from "../components/Score";
import { ScreenLayout } from "../components/ScreenLayout";
import { getMockGameDetails } from "../lib/mockData";

export default function Details() {
  const [game, setGame] = useState([]);
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();

  async function getGameDetails() {
    const data = await getMockGameDetails(id);
    setGame(data);
  }

  useEffect(() => {
    getGameDetails();
  }, [id]);

  return (
    <ScreenLayout>
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "yellow",
          },
          headerTintColor: "black",
          headerBackTitle: "",
          headerLeft: () => {},
          headerTitle: `${game.title}`,
          headerRight: () => {},
        }}
      />

      {game.slug == null ? (
        <View
          className="flex-1 items-center, justify-center"
          style={{ paddingTop: insets.top }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView>
          <View className="flex-1 items-center">
            <Image
              source={{ uri: game.img }}
              className="w-80 h-96 p-3 rounded-2xl mt-4 "
            />

            <Text className="text-white text-4xl font-bold my-4 text-center ">
              {game.title}
            </Text>
            <Score score={game.score} />
            <Text className="text-white text-base  mt-16  mx-8 text-center ">
              {game.description}
            </Text>
            <View>
              <Text className="text-white text-3xl font-bold my-16 text-center">
                Reviews:
              </Text>
              {game.reviews.map(review => (
                <Text
                  key={review.quote}
                  className="text-white text-md  mt-4  mx-6 text-center border rounded-xl border-white p-4"
                >
                  {review.quote}
                </Text>
              ))}
            </View>
            <View className="flex-1 bg-black h-4 mt-4 border-white"></View>
          </View>
        </ScrollView>
      )}
    </ScreenLayout>
  );
}
