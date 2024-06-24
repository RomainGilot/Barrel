import React from "react";
import { View, Text } from "react-native";

const ExpenseItemLong = ({ number, suffixe, text }) => {
  return (
    <View className="w-full bg-[#1C1C1E] border-2 border-[#39393D] rounded-[16px] p-3 m-1">
      <View className="flex-row justify-between">
        <View className="rounded-lg flex-row items-center justify-center">
          <Text className="text-3xl font-bold text-white">
            {number}
            <Text className="text-sm"> {suffixe} </Text>
          </Text>
        </View>
      </View>
      <Text className="font-medium text-base text-white mt-2">{text}</Text>
    </View>
  );
};

export default ExpenseItemLong;
