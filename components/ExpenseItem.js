import React, { useState } from "react";
import { TouchableOpacity, View, Text, Vibration, Platform, Modal, TouchableWithoutFeedback } from "react-native";
import SvgUri from "react-native-svg-uri";
import FuelSVG from "../components/icons/fuel.svg";
import { FontAwesome } from "@expo/vector-icons";
import { BlurView } from "@react-native-community/blur"; // Importer BlurView

const ExpenseItem = ({ id, amount, volume, kilometers, pricePerLiter, date, onDelete }) => {
  const [isLongPressed, setIsLongPressed] = useState(false);

  const toggleSelection = () => {
    setIsLongPressed(!isLongPressed);

    if (!isLongPressed) {
      if (Platform.OS === "ios") {
        Vibration.vibrate([0, 10]);
      } else {
        Vibration.vibrate(10);
      }
    }
  };

  const handleDelete = () => {
    onDelete(id);
    setIsLongPressed(false);
  };

  return (
    <>
      <TouchableOpacity className="bg-[#1C1C1E] rounded-[16px] p-3 mb-2 border-2 border-[#39393D]" onLongPress={toggleSelection}>
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <View className="bg-[#39393D] p-3 rounded-md">
              <SvgUri width="20" height="20" source={FuelSVG} />
            </View>
            <View className="ml-2">
              <Text className="text-lg font-bold text-white">
                {amount}€ / {volume} L
              </Text>
              <Text className="text-sm text-white">{kilometers} KM</Text>
            </View>
          </View>
          <View className="items-end">
            <Text className="text-sm text-[#636366]">{pricePerLiter}€ / L</Text>
            <Text className="text-sm text-[#636366]">{date}</Text>
          </View>
        </View>
      </TouchableOpacity>

      {isLongPressed && (
        <Modal animationType="fade" transparent={true} visible={isLongPressed} onRequestClose={() => setIsLongPressed(false)}>
          <TouchableWithoutFeedback onPress={() => setIsLongPressed(false)}>
            <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.8)", justifyContent: "center", alignItems: "center" }}>
              <View className="bg-[#1C1C1E] w-11/12 rounded-[16px] p-3 mb-2 border-2 border-[#39393D]">
                <View className="flex-row justify-between items-center">
                  <View className="flex-row">
                    <View className="bg-[#39393D] p-3 rounded-md">
                      <SvgUri width="20" height="20" source={FuelSVG} />
                    </View>
                    <View className="ml-2">
                      <Text className="text-lg font-bold text-white">
                        {amount}€ / {volume} L
                      </Text>
                      <Text className="text-sm text-white">{kilometers} KM</Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="text-sm text-[#636366]">{pricePerLiter}€ / L</Text>
                    <Text className="text-sm text-[#636366]">{date}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={handleDelete} className="ml-5 flex flex-row w-2/4 items-center justify-between bg-[#1C1C1E] p-3 rounded-xl">
                <Text className="text-[#FB453A]">Supprimer</Text>
                <FontAwesome name="trash" size={20} color="#FB453A" />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </>
  );
};

export default ExpenseItem;
