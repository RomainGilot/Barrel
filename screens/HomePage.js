import { SafeAreaView, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SvgUri from "react-native-svg-uri";
import CarSVG from "../components/icons/car.svg";
import ChartSVG from "../components/icons/chart.svg";
import ArrowRightSVG from "../components/icons/arrow-right.svg";
import SettingsSVG from "../components/icons/settings.svg";
import PlusSVG from "../components/icons/plus.svg";
import HomeCellule from "../components/HomeCellule";
import ExpenseItem from "../components/ExpenseItem";
import { useState } from "react";
import LogoSVG from "../components/Logo.svg";
import ExpenseItemLong from "../components/ExpenseItemLong";

const HomePage = () => {
  const navigation = useNavigation();

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      amount: 56.32,
      volume: 49.23,
      kilometers: 68076,
      pricePerLiter: 1.5,
      date: "20/04/2024",
    },
    {
      id: 2,
      amount: 45.75,
      volume: 40.12,
      kilometers: 70213,
      pricePerLiter: 1.35,
      date: "18/04/2024",
    },
    {
      id: 3,
      amount: 62.4,
      volume: 52.87,
      kilometers: 69000,
      pricePerLiter: 1.18,
      date: "15/04/2024",
    },
    {
      id: 4,
      amount: 48.15,
      volume: 42.36,
      kilometers: 67500,
      pricePerLiter: 1.4,
      date: "12/04/2024",
    },
    {
      id: 5,
      amount: 55.21,
      volume: 48.75,
      kilometers: 67000,
      pricePerLiter: 1.13,
      date: "10/04/2024",
    },
    {
      id: 6,
      amount: 60.85,
      volume: 54.23,
      kilometers: 66500,
      pricePerLiter: 1.25,
      date: "08/04/2024",
    },
    {
      id: 7,
      amount: 57.92,
      volume: 51.28,
      kilometers: 66000,
      pricePerLiter: 1.3,
      date: "05/04/2024",
    },
    {
      id: 8,
      amount: 52.18,
      volume: 46.32,
      kilometers: 65500,
      pricePerLiter: 1.45,
      date: "02/04/2024",
    },
    {
      id: 9,
      amount: 49.63,
      volume: 44.12,
      kilometers: 65000,
      pricePerLiter: 1.38,
      date: "30/03/2024",
    },
    {
      id: 10,
      amount: 47.85,
      volume: 42.65,
      kilometers: 64500,
      pricePerLiter: 1.28,
      date: "28/03/2024",
    },
    {
      id: 11,
      amount: 54.29,
      volume: 47.81,
      kilometers: 64000,
      pricePerLiter: 1.33,
      date: "25/03/2024",
    },
    {
      id: 12,
      amount: 58.76,
      volume: 52.18,
      kilometers: 63500,
      pricePerLiter: 1.22,
      date: "22/03/2024",
    },
    {
      id: 13,
      amount: 61.43,
      volume: 54.32,
      kilometers: 63000,
      pricePerLiter: 1.17,
      date: "20/03/2024",
    },
    {
      id: 14,
      amount: 50.87,
      volume: 45.76,
      kilometers: 62500,
      pricePerLiter: 1.39,
      date: "18/03/2024",
    },
    {
      id: 15,
      amount: 46.92,
      volume: 41.85,
      kilometers: 62000,
      pricePerLiter: 1.42,
      date: "15/03/2024",
    },
    {
      id: 16,
      amount: 53.15,
      volume: 47.32,
      kilometers: 61500,
      pricePerLiter: 1.27,
      date: "12/03/2024",
    },
    {
      id: 17,
      amount: 59.27,
      volume: 52.76,
      kilometers: 61000,
      pricePerLiter: 1.24,
      date: "10/03/2024",
    },
    {
      id: 18,
      amount: 63.18,
      volume: 56.32,
      kilometers: 60500,
      pricePerLiter: 1.15,
      date: "08/03/2024",
    },
    {
      id: 19,
      amount: 48.75,
      volume: 43.21,
      kilometers: 60000,
      pricePerLiter: 1.36,
      date: "05/03/2024",
    },
    {
      id: 20,
      amount: 55.84,
      volume: 49.67,
      kilometers: 59500,
      pricePerLiter: 1.31,
      date: "02/03/2024",
    },
  ]);

  expenses.sort((a, b) => {
    const dateA = new Date(a.date.split("/").reverse().join("/"));
    const dateB = new Date(b.date.split("/").reverse().join("/"));
    return dateB - dateA;
  });

  const lastTenExpenses = expenses.slice(0, 10);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-row items-center justify-between p-4 z-50">
        <Text className="text-white text-4xl font-bold">Barrel</Text>
        <TouchableOpacity>
          <SvgUri width="28" height="28" source={SettingsSVG} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View className="flex-row justify-center items-center w-full">
          <HomeCellule text="Mon véhicule" iconSVG={CarSVG} onPress={() => navigation.navigate("MyCar")} />
          <HomeCellule text="Mes statistiques" iconSVG={ChartSVG} />
        </View>
        <View className="flex-col items-center m-1">
          <ExpenseItemLong number="730" suffixe="jours restants" text="Le prochain contrôle technique sera à faire le Mercredi 24 Juin 2026" />
        </View>
        <View className="p-1 mt-2">
          <Text className="text-white text-xl font-bold">Estimations</Text>
          <ExpenseItemLong number="2331" suffixe="km" text="Estimation du kilomètrage au prochain plein" />
          <ExpenseItemLong number="1558" suffixe="km" text="Estimation du kilomètrage à la fin de l'année" />
        </View>
        <View className="mt-5 p-1">
          <TouchableOpacity className="flex-row justify-between items-center w-full mb-3">
            <Text className="text-white text-xl font-bold">Dépenses récentes</Text>

            <SvgUri width="18" height="18" source={ArrowRightSVG} />
          </TouchableOpacity>
          <View>
            {lastTenExpenses.length > 0 ? (
              <View>
                {lastTenExpenses.map((expense) => (
                  <ExpenseItem
                    key={expense.id}
                    amount={expense.amount}
                    volume={expense.volume}
                    kilometers={expense.kilometers}
                    pricePerLiter={expense.pricePerLiter}
                    date={expense.date}
                  />
                ))}
              </View>
            ) : (
              <View className="flex-col justify-center items-center w-full mt-5">
                <SvgUri width="100" height="100" source={LogoSVG} />
                <Text className="text-white text-base">Vous n'avez fait aucune entrée pour l'instant</Text>
                <TouchableOpacity>
                  <Text className="text-[#FFFF00] text-base font-bold">Ajouter une entrée</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 40,
          right: 0,
          left: 0,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 30,
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: 100,
          marginHorizontal: "auto",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#FFFF00",
            borderRadius: 100,
            padding: 20,
          }}
        >
          <SvgUri width="20" height="20" source={PlusSVG} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
