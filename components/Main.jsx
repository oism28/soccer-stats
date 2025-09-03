import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { mockGames } from "../lib/mockData";
import { AnimatedGameCard } from "./GameCard";

export function Main() {
  const [games, setGames] = useState([]);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    setGames(mockGames);
  }, []);

  return (
    <View className="flex-1 bg-black">
      {games.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
          }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          style={styles.scrollView}
          data={games}
          keyExtractor={game => game.slug}
          renderItem={({ item, index }) => (
            <AnimatedGameCard game={item} index={index} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 8,
    height: "100%",
    width: "100%",
  },
});
