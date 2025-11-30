import { useState } from "react";
import { Image, Text, View } from "react-native";
import RemoteSvg from "./RemoteSvg";

export default function Flag({ uri, width = 24, height = 16 }) {
  const [failed, setFailed] = useState(false);

  if (!uri) {
    return (
      <View
        style={{
          width,
          height,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#93B1A6" }}>🏳️</Text>
      </View>
    );
  }

  if (failed) {
    return (
      <View
        style={{
          width,
          height,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#93B1A6" }}>🏳️</Text>
      </View>
    );
  }

  const isSvg = uri.endsWith(".svg");

  return (
    <View
      style={{ width, height, alignItems: "center", justifyContent: "center" }}
    >
      {isSvg ? (
        <RemoteSvg
          uri={uri}
          width={width}
          height={height}
          onError={() => setFailed(true)}
        />
      ) : (
        <Image
          source={{ uri }}
          style={{ width, height }}
          onError={() => setFailed(true)}
          accessibilityLabel="flag"
        />
      )}
    </View>
  );
}
