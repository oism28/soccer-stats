import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { SvgXml } from "react-native-svg";

export default function RemoteSvg({ uri, width = 20, height = 16, onError }) {
  const [xml, setXml] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;
    setXml(null);
    setError(false);
    if (!uri) return;

    fetch(uri)
      .then((res) => res.text())
      .then((text) => {
        if (!mounted) return;
        setXml(text);
      })
      .catch(() => {
        if (!mounted) return;
        setError(true);
        if (typeof onError === "function") onError();
      });

    return () => {
      mounted = false;
    };
  }, [uri]);

  if (!uri) return null;
  if (error) return null;
  if (!xml) return (
    <View style={{ width, height, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="small" color="#93B1A6" />
    </View>
  );

  return <SvgXml xml={xml} width={width} height={height} />;
}
