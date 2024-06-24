import React from "react";
import { SafeAreaView, TouchableOpacity, View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SvgUri from "react-native-svg-uri";
import ChevronBackSVG from "../components/icons/chevron-back.svg";
import LogoMyCarSVG from "../components/LogoMyCar.svg";
import VehiculeData from "../components/VehiculeData";

const vehicleData = {
  marque: "Renault",
  modele: "Clio",
  puissanceCh: 90,
  puissanceFiscale: 5,
  coupleMoteur: "160 Nm",
  tailleReservoir: "45 L",
  vin: "VF1R1234567890123",
  immatriculation: "AB-123-CD",
  premiereMiseEnCirculation: "15/05/2018",
  controleTechnique: "20/05/2023",
};

const MyCarPage = () => {
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

      {vehicleData ? (
        <ScrollView>
          <VehiculeData data={vehicleData.marque} title="Marque" />
          <VehiculeData data={vehicleData.modele} title="Modèle" />
          <View className="mt-5">
            <VehiculeData data={vehicleData.puissanceCh + " " + "ch"} title="Puissance" />
            <VehiculeData data={vehicleData.puissanceFiscale + " " + "cv"} title="Puissance fiscale" />
            <VehiculeData data={vehicleData.coupleMoteur} title="Couple moteur" />
            <VehiculeData data={vehicleData.tailleReservoir} title="Taille du réservoir" />
          </View>
          <View className="mt-5">
            <VehiculeData data={vehicleData.vin} title="VIN" />
            <VehiculeData data={vehicleData.immatriculation} title="Immatriculation" />
            <VehiculeData data={vehicleData.premiereMiseEnCirculation} title="Première mise en circulation" />
            <VehiculeData data={vehicleData.controleTechnique} title="Contrôle technique" />
          </View>
        </ScrollView>
      ) : (
        <View className="flex-col justify-center items-center flex-1 mt-3">
          <SvgUri width="100" height="100" source={LogoMyCarSVG} className="mb-2" />
          <Text className="text-white text-base text-center">La fiche de votre véhicule n'est pas créée</Text>
          <TouchableOpacity className="mt-2">
            <Text className="text-[#FFFF00] text-base font-bold">Créer une fiche</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default MyCarPage;
