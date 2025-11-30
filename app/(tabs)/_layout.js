import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#040D12",
          borderTopWidth: 2,
          borderTopColor: "#234E47",
          height: 85,
          paddingTop: 8,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: "#93B1A6",
        tabBarInactiveTintColor: "#5C8374",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
        }}
      />
      <Tabs.Screen
        name="favoritos"
        options={{
          title: "Favoritos",
        }}
      />
    </Tabs>
  );
}
