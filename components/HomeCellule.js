import { Text, TouchableOpacity, View } from "react-native";
import SvgUri from "react-native-svg-uri";
import ChevronRightSVG from "./icons/chevron-right.svg";
import { useNavigation } from "@react-navigation/native";

const HomeCellule = ({ iconSVG, text, props }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="w-[47%] bg-[#1C1C1E] border-2 border-[#39393D] rounded-[16px] p-3 m-2"
      onPress={() => navigation.navigate("MyCarPage")}
      {...props}
    >
      <View className="flex-row justify-between">
        <View className="bg-[#39393D] p-2 rounded-lg flex-row items-center justify-center">
          <SvgUri width="20" height="20" source={iconSVG} />
        </View>
        <View className="p-2">
          <SvgUri width="15" height="15" source={ChevronRightSVG} />
        </View>
      </View>
      <Text className="font-medium text-base text-white mt-3">{text}</Text>
    </TouchableOpacity>
  );
};

export default HomeCellule;
