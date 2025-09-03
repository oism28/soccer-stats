import { Link, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable } from "react-native";
import { InfoIcon } from "../components/Icons";
import { Logo } from "../components/Logo";
import { ScreenLayout } from "../components/ScreenLayout";
import "../global.css";

export default function Layout() {
  return (
    <ScreenLayout>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
          headerTitle: "",
          headerBackTitle: "",

          headerLeft: () => <Logo />,
          headerRight: () => (
            <Link asChild href="/about">
              <Pressable className=" mb-2 active:opacity-50">
                <InfoIcon />
              </Pressable>
            </Link>
          ),
        }}
      ></Stack>
    </ScreenLayout>
  );
}
