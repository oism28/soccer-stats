import { Link } from "expo-router";
import { Pressable, ScrollView, Text } from "react-native";
import { ScreenLayout } from "../../components/ScreenLayout";
import { HomeIcon } from "./../../components/Icons";

export default function About() {
  return (
    <ScreenLayout>
      <ScrollView>
        <Text className="text-white font-bold text-2xl ">About Us</Text>
        <Link asChild href="/">
          <Pressable className="flex-row gap-4 items-center mb-4 active:opacity-50">
            <Text className="text-white">Home</Text>
            <HomeIcon />
          </Pressable>
        </Link>
        <Text className="text-white text-white/50 mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam, quos.
        </Text>
        <Text className="text-white text-white/50 mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam, quos.
        </Text>
        <Text className="text-white text-white/50 mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam, quos.
        </Text>
        <Text className="text-white text-white/50 mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam, quos.
        </Text>
      </ScrollView>
    </ScreenLayout>
  );
}
