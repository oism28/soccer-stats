import { Tabs } from "expo-router";
import { AboutIcon, HomeIcon } from "../../components/Icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "black",
          borderTopWidth: 5,
          borderTopColor: "black",
          height: 80,
        },
        tabBarActiveTintColor: "yellow",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: HomeIcon,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: AboutIcon,
        }}
      />
    </Tabs>
  );
}
