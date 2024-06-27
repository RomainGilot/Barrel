// HomePage.js

import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, ScrollView, Modal, TextInput, Alert, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SvgUri from "react-native-svg-uri";
import CarSVG from "../components/icons/car.svg";
import ChartSVG from "../components/icons/chart.svg";
import ArrowRightSVG from "../components/icons/arrow-right.svg";
import SettingsSVG from "../components/icons/settings.svg";
import PlusSVG from "../components/icons/plus.svg";
import HomeCellule from "../components/HomeCellule";
import ExpenseItem from "../components/ExpenseItem";
import LogoSVG from "../components/Logo.svg";
import ExpenseItemLong from "../components/ExpenseItemLong";

const HomePage = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [nextTechnicalCheckDate, setNextTechnicalCheckDate] = useState();

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
    }
  };

  const loadNextTechnicalCheckDate = async () => {
    try {
      const jsonDate = await AsyncStorage.getItem("@vehicle_data.controleTechnique");
      if (jsonDate !== null) {
        setNextTechnicalCheckDate(new Date(jsonDate));
      }
    } catch (error) {
      console.error("Error loading next technical check date from AsyncStorage:", error);
    }
  };

  const saveExpense = async (newExpense) => {
    try {
      const updatedExpenses = [...expenses, newExpense];
      await AsyncStorage.setItem("@expenses", JSON.stringify(updatedExpenses));
      setExpenses(updatedExpenses);
      setModalVisible(false);
    } catch (error) {
      console.error("Error saving expense to AsyncStorage:", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de l'enregistrement de la dépense.");
    }
  };

  const deleteExpense = async (expenseId) => {
    try {
      const updatedExpenses = expenses.filter((expense) => expense.id !== expenseId);
      await AsyncStorage.setItem("@expenses", JSON.stringify(updatedExpenses));
      setExpenses(updatedExpenses);
    } catch (error) {
      console.error("Error deleting expense from AsyncStorage:", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de la suppression de la dépense.");
    }
  };

  const [price, setPrice] = useState("");
  const [liters, setLiters] = useState("");
  const [kilometers, setKilometers] = useState("");

  const handleSaveExpense = () => {
    if (!price || !liters || !kilometers) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs du formulaire.");
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      amount: parseFloat(price),
      volume: parseFloat(liters),
      kilometers: parseInt(kilometers, 10),
      pricePerLiter: parseFloat((price / liters).toFixed(2)),
      date: new Date().toLocaleDateString("fr-FR"),
    };

    saveExpense(newExpense);
  };
  const screenHeight = Dimensions.get("window").height;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, zIndex: 50 }}>
        <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Barrel</Text>
        <TouchableOpacity onPress={() => {}}>
          <SvgUri width="28" height="28" source={SettingsSVG} />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ paddingHorizontal: 16 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <HomeCellule text="Mon véhicule" iconSVG={CarSVG} nav="MyCarPage" />
          <HomeCellule text="Mes statistiques" iconSVG={ChartSVG} nav="StatisticsPage" />
        </View>
        <View style={{ alignItems: "center", marginTop: 16 }}>
          <ExpenseItemLong number="730" suffixe="jours restants" text="Le prochain contrôle technique sera à faire le Mercredi 24 Juin 2026" />
        </View>
        {expenses.length > 1 && (
          <View style={{ padding: 8, marginTop: 16 }}>
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Estimations</Text>
            <View style={{ marginBottom: 16 }}>
              <ExpenseItemLong number="2331" suffixe="km" text="Estimation du kilomètrage au prochain plein" />
            </View>
            <ExpenseItemLong number="1558" suffixe="km" text="Estimation du kilomètrage à la fin de l'année" />
          </View>
        )}

        <View style={{ marginTop: 24, padding: 8 }}>
          {expenses.length != 0 && (
            <TouchableOpacity
              style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}
              onPress={() => navigation.navigate("HistoryPage")}
            >
              <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Dépenses récentes</Text>
              <SvgUri width="18" height="18" source={ArrowRightSVG} />
            </TouchableOpacity>
          )}
          <View>
            {expenses.length > 0 ? (
              expenses.slice(0, 10).map((expense) => (
                <ExpenseItem
                  key={expense.id}
                  id={expense.id}
                  amount={expense.amount}
                  volume={expense.volume}
                  kilometers={expense.kilometers}
                  pricePerLiter={expense.pricePerLiter}
                  date={expense.date}
                  onDelete={deleteExpense} // Passer la fonction deleteExpense
                />
              ))
            ) : (
              <View style={{ alignItems: "center", marginTop: 24 }}>
                <SvgUri width="100" height="100" source={LogoSVG} />
                <Text style={{ color: "#fff", fontSize: 16 }}>Vous n'avez fait aucune entrée pour l'instant</Text>
                <TouchableOpacity>
                  <Text style={{ color: "#FFFF00", fontSize: 16, fontWeight: "bold" }} onPress={() => setModalVisible(true)}>
                    Ajouter une entrée
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <SvgUri width="20" height="20" source={PlusSVG} />
        </TouchableOpacity>
      </View>

      <Modal transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)} animationType="slide">
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <TouchableOpacity style={{ flex: 1, width: "100%" }} activeOpacity={1} onPressOut={() => setModalVisible(false)} />
          <View style={{ width: "100%", height: "90%", backgroundColor: "#1c1c1e", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            <View style={{ flex: 1, justifyContent: "space-between" }}>
              <View style={{ padding: 20 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text style={{ color: "#FFFF00" }}>Annuler</Text>
                  </TouchableOpacity>
                  <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Nouvelle entrée</Text>
                  <TouchableOpacity onPress={handleSaveExpense}>
                    <Text style={{ color: "#FFFF00" }}>Enregistrer</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#2c2c2e",
                    borderRadius: 10,
                    marginBottom: 10,
                  }}
                >
                  <TextInput
                    placeholder="Prix (ex: 76,31)"
                    placeholderTextColor="#6c6c6e"
                    style={{ flex: 1, color: "#fff", padding: 12, fontSize: 18 }}
                    keyboardType="numeric"
                    value={price}
                    onChangeText={(text) => setPrice(text)}
                  />
                  <Text style={{ color: "#fff", fontSize: 18, fontWeight: "medium", paddingRight: 12 }}>€</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#2c2c2e",
                    borderRadius: 10,
                    marginBottom: 10,
                  }}
                >
                  <TextInput
                    placeholder="Litres (ex: 45,22)"
                    placeholderTextColor="#6c6c6e"
                    style={{ backgroundColor: "#2c2c2e", color: "#fff", padding: 12, fontSize: 18, borderRadius: 10 }}
                    keyboardType="numeric"
                    value={liters}
                    onChangeText={(text) => setLiters(text)}
                  />
                  <Text style={{ color: "#fff", fontSize: 18, fontWeight: "medium", paddingRight: 12 }}>L</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#2c2c2e",
                    borderRadius: 10,
                    marginBottom: 10,
                  }}
                >
                  <TextInput
                    placeholder="Kilométrage (ex: 68 072)"
                    placeholderTextColor="#6c6c6e"
                    style={{ backgroundColor: "#2c2c2e", color: "#fff", padding: 12, fontSize: 18, borderRadius: 10 }}
                    keyboardType="numeric"
                    value={kilometers}
                    onChangeText={(text) => setKilometers(text)}
                  />
                  <Text style={{ color: "#fff", fontSize: 18, fontWeight: "medium", paddingRight: 12 }}>KM</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#2c2c2e",
                    padding: 12,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ fontSize: 18, color: "#6c6c6e" }}>Date</Text>
                  <Text style={{ fontSize: 18, color: "#fff" }}>{new Date().toLocaleDateString("fr-FR")}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center", // Centrer verticalement les éléments dans le conteneur
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center", // Centrer horizontalement le conteneur de bouton
  },
  button: {
    backgroundColor: "#FFFF00",
    borderRadius: 100,
    padding: 20,
  },
});

export default HomePage;
