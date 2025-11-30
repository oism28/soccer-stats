import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { ScreenLayout } from "../components/ScreenLayout";
import "../global.css";

export default function Layout() {
  return (
    <ScreenLayout>
      <StatusBar style="light" backgroundColor="#040D12" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#040D12",
            borderBottomWidth: 1,
            borderBottomColor: "#183D3D",
          },
          headerTintColor: "#93B1A6",
          headerTitle: "",
          headerBackTitle: "",
        }}
      ></Stack>
    </ScreenLayout>
  );
}
