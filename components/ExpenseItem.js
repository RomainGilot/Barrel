import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import SvgUri from "react-native-svg-uri";
import FuelSVG from "../components/icons/fuel.svg";

const ExpenseItem = ({ amount, volume, kilometers, pricePerLiter, date }) => {
  return (
    <TouchableOpacity className="w-full bg-[#1C1C1E] border-2 border-[#39393D] rounded-[16px] p-3 mb-3">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <View>
            <View className="bg-[#39393D] p-2 rounded-lg flex-row items-center justify-center">
              <SvgUri width="20" height="20" source={FuelSVG} />
            </View>
          </View>
          <View className="flex-col ml-5">
            <Text className="text-lg text-white font-bold">
              {amount}€ / {volume} L
            </Text>
            <Text className="text-sm text-white font-medium">{kilometers} KM</Text>
          </View>
        </View>
        <View className="flex-col items-end">
          <Text className="text-sm text-[#636366]">{pricePerLiter}€ / L</Text>
          <Text className="text-sm text-[#636366]">{date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExpenseItem;
