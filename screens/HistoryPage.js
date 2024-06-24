import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SvgUri from "react-native-svg-uri";
import ChevronBackSVG from "../components/icons/chevron-back.svg";
import ExpenseItem from "../components/ExpenseItem"; // Assurez-vous du bon chemin d'importation

const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

const groupExpensesByMonthAndYear = (expenses) => {
  const groupedExpenses = {};

  expenses.forEach((expense) => {
    const [day, month, year] = expense.date.split("/");
    const monthName = monthNames[parseInt(month, 10) - 1];
    const monthYear = `${monthName} ${year}`;

    if (!groupedExpenses[monthYear]) {
      groupedExpenses[monthYear] = [];
    }

    groupedExpenses[monthYear].push(expense);
  });

  return groupedExpenses;
};

const HistoryPage = () => {
  const navigation = useNavigation();
  const [expenses, setExpenses] = useState([
    // Votre liste de dépenses
    { id: 1, amount: 56.32, volume: 49.23, kilometers: 68076, pricePerLiter: 1.5, date: "20/06/2024" },
    { id: 2, amount: 45.75, volume: 40.12, kilometers: 70213, pricePerLiter: 1.35, date: "18/04/2024" },
    { id: 3, amount: 62.4, volume: 52.87, kilometers: 69000, pricePerLiter: 1.18, date: "15/04/2024" },
    { id: 4, amount: 48.15, volume: 42.36, kilometers: 67500, pricePerLiter: 1.4, date: "12/04/2024" },
    { id: 5, amount: 55.21, volume: 48.75, kilometers: 67000, pricePerLiter: 1.13, date: "10/04/2024" },
    { id: 6, amount: 60.85, volume: 54.23, kilometers: 66500, pricePerLiter: 1.25, date: "08/04/2024" },
    { id: 7, amount: 57.92, volume: 51.28, kilometers: 66000, pricePerLiter: 1.3, date: "05/04/2024" },
    { id: 8, amount: 52.18, volume: 46.32, kilometers: 65500, pricePerLiter: 1.45, date: "02/04/2024" },
    { id: 9, amount: 49.63, volume: 44.12, kilometers: 65000, pricePerLiter: 1.38, date: "30/03/2024" },
    { id: 10, amount: 47.85, volume: 42.65, kilometers: 64500, pricePerLiter: 1.28, date: "28/03/2024" },
    { id: 11, amount: 54.29, volume: 47.81, kilometers: 64000, pricePerLiter: 1.33, date: "25/03/2024" },
  ]);

  // Grouper les dépenses par mois et année
  const groupedExpenses = groupExpensesByMonthAndYear(expenses);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-row items-center justify-between p-4">
        <TouchableOpacity onPress={() => navigation.goBack()} className="w-1/6">
          <SvgUri width="20" height="20" source={ChevronBackSVG} />
        </TouchableOpacity>
        <Text className="text-white text-lg font-medium flex-4 text-center">Historique</Text>
        <View className="w-1/6"></View>
      </View>
      <ScrollView className="p-4">
        {Object.keys(groupedExpenses).map((monthYear) => (
          <View key={monthYear}>
            <Text className="text-white text-xl font-bold mb-2">{monthYear}</Text>
            {groupedExpenses[monthYear].map((expense) => (
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
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryPage;
