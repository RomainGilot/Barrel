import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Banner = () => {
  return (
    <View className="flex-row justify-between items-center w-full p-4">
      <Text className="text-white text-4xl font-bold">Barrel</Text>
      <TouchableOpacity>
        <Ionicons name="settings" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Banner;
