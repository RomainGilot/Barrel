import { View, Text } from "react-native";

const VehiculeData = ({ data, title }) => {
  return (
    <View className="w-full bg-[#1C1C1E] border-2 border-[#39393D] rounded-[16px] p-1 mb-3 flex-row justify-between">
      <View className="flex-row items-center px-2">
        <Text className="text-white font-bold text-lg">{data}</Text>
      </View>
      <View className="bg-[#1C1C1E] border-2 border-[#39393D] rounded-[16px] p-1 px-2 mb-3">
        <Text className="text-white text-[9em] font-bold">{title}</Text>
      </View>
    </View>
  );
};

export default VehiculeData;
