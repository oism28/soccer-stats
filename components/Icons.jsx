import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export const InfoIcon = props => {
  return <FontAwesome5 name="info-circle" size={24} color="white" {...props} />;
};

/* los props son importantes */

export const HomeIcon = props => {
  return <Entypo name="home" size={24} color="white" {...props} />;
};

export const AboutIcon = props => {
  return <FontAwesome5 name="info" size={24} color="white" {...props} />;
};
