import React from "react";
import { SafeAreaView, TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SvgUri from "react-native-svg-uri";
import ChevronBackSVG from "../components/icons/chevron-back.svg";
import LogoMyCarSVG from "../components/LogoMyCar.svg";

const MyCar = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-row items-center justify-between p-4">
        <TouchableOpacity onPress={() => navigation.goBack()} className="w-1/6">
          <SvgUri width="20" height="20" source={ChevronBackSVG} />
        </TouchableOpacity>
        <Text className="text-white text-lg font-medium flex-4 text-center">Mon véhicule</Text>
        <View className="w-1/6"></View>
      </View>

      <View className="flex-col justify-center items-center flex-1 mt-3">
        <SvgUri width="100" height="100" source={LogoMyCarSVG} className="mb-2" />

        <Text className="text-white text-base text-center">La fiche de votre véhicule n'est pas créée</Text>
        <TouchableOpacity className="mt-2">
          <Text className="text-[#FFFF00] text-base font-bold">Créer une fiche</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MyCar;
