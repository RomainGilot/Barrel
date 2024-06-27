import React, { useState, useEffect } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SvgUri from "react-native-svg-uri";
import ChevronBackSVG from "../components/icons/chevron-back.svg";
import ExpenseItem from "../components/ExpenseItem";

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
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const jsonExpenses = await AsyncStorage.getItem("@expenses");
      if (jsonExpenses !== null) {
        setExpenses(JSON.parse(jsonExpenses));
      }
    } catch (error) {
      console.error("Error loading expenses from AsyncStorage:", error);
      Alert.alert("Erreur", "Une erreur est survenue lors du chargement de l'historique des dépenses.");
    }
  };

  const groupedExpenses = groupExpensesByMonthAndYear(expenses);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: "20%" }}>
          <SvgUri width="20" height="20" source={ChevronBackSVG} />
        </TouchableOpacity>
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold", textAlign: "center", flex: 1 }}>Historique</Text>
        <View style={{ width: "20%" }} />
      </View>
      <ScrollView style={{ padding: 16 }}>
        {Object.keys(groupedExpenses).map((monthYear) => (
          <View key={monthYear}>
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>{monthYear}</Text>
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
