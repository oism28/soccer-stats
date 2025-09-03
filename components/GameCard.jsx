import { Link } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Image, Pressable, Text, View } from "react-native";
import { Score } from "./Score";

export function GameCard({ game }) {
  return (
    <Link asChild href={`/${game.slug}`}>
      <Pressable className="active:opacity-50 border-2 border-black active:border-white/50 rounded-2xl">
        <View className="flex-row justify-center items-center">
          <Image
            className="w-44 h-44 p-3 rounded-2xl"
            source={{ uri: game.image }}
          />
          <View className="flex-col w-3/4 h-auto flex-shrink ">
            <Text className="text-white mt-2.5 text-2xl font-bold">
              {game.title}
            </Text>
            <Score score={game.score} />
            <Text className="mt-2.5 mb-4 text-white">
              {game.description.slice(0, 100)}...{" "}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
{
  /*animacion de renderizado, no entendí un carajo como funciona */
}
export function AnimatedGameCard({ game, index }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      delay: index * 250,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <GameCard game={game} />
    </Animated.View>
  );
}
