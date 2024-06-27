import React, { useState, useEffect } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, ScrollView, Modal, TextInput, Alert, Keyboard, KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SvgUri from "react-native-svg-uri";
import ChevronBackSVG from "../components/icons/chevron-back.svg";
import LogoMyCarSVG from "../components/LogoMyCar.svg";
import ThreeDotsSVG from "../components/icons/ellipsis.svg";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VehiculeData from "../components/VehiculeData";

const MyCarPage = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [showFirstRegistration, setShowFirstRegistration] = useState(false);
  const [showTechnicalControl, setShowTechnicalControl] = useState(false);
  const [vehicleData, setVehicleData] = useState({});
  const [showSubMenu, setShowSubMenu] = useState(false); // Etat pour le sous-menu

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadVehicleData();
      if (data) {
        setVehicleData(data);
      }
    };
    fetchData();
  }, []);

  const saveVehicleData = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem("@vehicle_data", jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  const loadVehicleData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@vehicle_data");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error(e);
    }
  };

  const showModal = () => {
    setStep(1);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleNext = () => {
    if (step === 1) {
      if (!vehicleData.marque || !vehicleData.modele) {
        Alert.alert("Erreur", "Veuillez remplir tous les champs.");
        return;
      }
    } else if (step === 2) {
      if (!vehicleData.puissance || !vehicleData.puissanceFiscale || !vehicleData.coupleMoteur || !vehicleData.capaciteReservoir) {
        Alert.alert("Erreur", "Veuillez remplir tous les champs.");
        return;
      }
    }
    setStep(step + 1);
  };

  const handleSaveExpense = () => {
    saveVehicleData(vehicleData);
    setModalVisible(false);
    Alert.alert("Fiche créée avec succès !");
  };

  const handleGesture = (event) => {
    if (event.nativeEvent.translationY > 50) {
      Keyboard.dismiss();
    }
  };

  const handleEdit = () => {
    setModalVisible(true); // Ouvrir le modal pour éditer
    setShowSubMenu(false); // Cacher le sous-menu
  };

  const handleDelete = async () => {
    try {
      // Supprimer les données de AsyncStorage
      await AsyncStorage.removeItem("@vehicle_data");
      setVehicleData({});
      setShowSubMenu(false);
    } catch (error) {
      console.error("Erreur lors de la suppression des données :", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de la suppression des données du véhicule.");
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: "20%" }}>
            <SvgUri width="20" height="20" source={ChevronBackSVG} />
          </TouchableOpacity>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold", textAlign: "center", flex: 1 }}>Mon véhicule</Text>
          {/* Bouton pour ouvrir ou fermer le sous-menu */}
          <TouchableOpacity onPress={() => setShowSubMenu(!showSubMenu)}>
            <SvgUri width="20" height="20" source={ThreeDotsSVG} />
          </TouchableOpacity>
        </View>

        {Object.keys(vehicleData).length > 0 ? (
          <ScrollView style={{ paddingHorizontal: 16 }}>
            <VehiculeData data={vehicleData.marque} title="Marque" />
            <VehiculeData data={vehicleData.modele} title="Modèle" />
            <View className="mt-5">
              <VehiculeData data={vehicleData.puissance + " " + "ch"} title="Puissance" />
              <VehiculeData data={vehicleData.puissanceFiscale + " " + "cv"} title="Puissance fiscale" />
              <VehiculeData data={vehicleData.coupleMoteur} title="Couple moteur" />
              <VehiculeData data={vehicleData.capaciteReservoir} title="Taille du réservoir" />
            </View>
            <View className="mt-5">
              <VehiculeData data={vehicleData.vin} title="VIN" />
              <VehiculeData data={vehicleData.immatriculation} title="Immatriculation" />
              <VehiculeData data={vehicleData.premiereMiseEnCirculation} title="Première mise en circulation" />
              <VehiculeData data={vehicleData.controleTechnique} title="Contrôle technique" />
            </View>
          </ScrollView>
        ) : (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 30 }}>
            <SvgUri width="100" height="100" source={LogoMyCarSVG} />
            <Text style={{ color: "#fff", fontSize: 18, marginTop: 10 }}>La fiche de votre véhicule n'est pas créée</Text>
            <TouchableOpacity onPress={showModal} style={{ marginTop: 10 }}>
              <Text style={{ color: "#FFFF00", fontSize: 18, fontWeight: "bold" }}>Créer une fiche</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Modal de création ou d'édition de fiche */}
        <Modal transparent={true} visible={modalVisible} onRequestClose={hideModal} animationType="slide">
          <PanGestureHandler onGestureEvent={handleGesture}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
              <TouchableOpacity style={{ flex: 1, width: "100%" }} activeOpacity={1} onPressOut={hideModal} />
              <KeyboardAvoidingView
                behavior="padding"
                style={{ width: "100%", height: "85%", backgroundColor: "#1c1c1e", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
              >
                <View style={{ flex: 1, justifyContent: "space-between" }}>
                  <View style={{ padding: 20 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                      {step > 1 && (
                        <TouchableOpacity onPress={() => setStep(step - 1)}>
                          <Text style={{ color: "#FFFF00" }}>Précédent</Text>
                        </TouchableOpacity>
                      )}
                      {step === 1 && (
                        <Text style={{ color: "#FFFF00" }} onPress={hideModal}>
                          Annuler
                        </Text>
                      )}
                      <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>Nouvelle fiche</Text>

                      {step < 2 ? (
                        <TouchableOpacity onPress={handleNext}>
                          <Text style={{ color: "#FFFF00" }}>Suivant</Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity onPress={handleSaveExpense}>
                          <Text style={{ color: "#FFFF00" }}>Terminer</Text>
                        </TouchableOpacity>
                      )}
                    </View>

                    {/* Champs de création ou d'édition de fiche */}
                    {step === 1 && (
                      <ScrollView>
                        <TextInput
                          placeholder="Marque (ex: Audi)"
                          placeholderTextColor="#6c6c6e"
                          style={{ backgroundColor: "#2c2c2e", color: "#fff", padding: 12, fontSize: 18, borderRadius: 10, marginBottom: 16 }}
                          value={vehicleData.marque}
                          onChangeText={(text) => setVehicleData({ ...vehicleData, marque: text })}
                        />
                        <TextInput
                          placeholder="Modèle (ex: A3 Sportback)"
                          placeholderTextColor="#6c6c6e"
                          style={{ backgroundColor: "#2c2c2e", color: "#fff", padding: 12, fontSize: 18, borderRadius: 10, marginBottom: 32 }}
                          value={vehicleData.modele}
                          onChangeText={(text) => setVehicleData({ ...vehicleData, modele: text })}
                        />
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: "#2c2c2e",
                            borderRadius: 10,
                            marginBottom: 16,
                          }}
                        >
                          <TextInput
                            placeholder="Puissance (ex: 150)"
                            placeholderTextColor="#6c6c6e"
                            style={{ backgroundColor: "#2c2c2e", color: "#fff", padding: 12, fontSize: 18, borderRadius: 10, flex: 1 }}
                            keyboardType="numeric"
                            value={vehicleData.puissance}
                            onChangeText={(text) => setVehicleData({ ...vehicleData, puissance: text })}
                          />
                          <Text style={{ color: "#fff", fontSize: 18, marginRight: 12 }}>ch</Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: "#2c2c2e",
                            borderRadius: 10,
                            marginBottom: 16,
                          }}
                        >
                          <TextInput
                            placeholder="Puissance fiscale (ex: 7)"
                            placeholderTextColor="#6c6c6e"
                            style={{ backgroundColor: "#2c2c2e", color: "#fff", padding: 12, fontSize: 18, borderRadius: 10, flex: 1 }}
                            keyboardType="numeric"
                            value={vehicleData.puissanceFiscale}
                            onChangeText={(text) => setVehicleData({ ...vehicleData, puissanceFiscale: text })}
                          />
                          <Text style={{ color: "#fff", fontSize: 18, marginRight: 12 }}>cv</Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: "#2c2c2e",
                            borderRadius: 10,
                            marginBottom: 16,
                          }}
                        >
                          <TextInput
                            placeholder="Couple moteur (ex: 320)"
                            placeholderTextColor="#6c6c6e"
                            style={{ backgroundColor: "#2c2c2e", color: "#fff", padding: 12, fontSize: 18, borderRadius: 10, flex: 1 }}
                            keyboardType="numeric"
                            value={vehicleData.coupleMoteur}
                            onChangeText={(text) => setVehicleData({ ...vehicleData, coupleMoteur: text })}
                          />
                          <Text style={{ color: "#fff", fontSize: 18, marginRight: 12 }}>Nm</Text>
                        </View>
                        <TextInput
                          placeholder="Capacité du réservoir (ex: 55)"
                          placeholderTextColor="#6c6c6e"
                          style={{ backgroundColor: "#2c2c2e", color: "#fff", padding: 12, fontSize: 18, borderRadius: 10, marginBottom: 16 }}
                          keyboardType="numeric"
                          value={vehicleData.capaciteReservoir}
                          onChangeText={(text) => setVehicleData({ ...vehicleData, capaciteReservoir: text })}
                        />
                      </ScrollView>
                    )}

                    {step === 2 && (
                      <ScrollView>
                        <TextInput
                          placeholder="Numéro de série (VIN)"
                          placeholderTextColor="#6c6c6e"
                          style={{ backgroundColor: "#2c2c2e", color: "#fff", padding: 12, fontSize: 18, borderRadius: 10, marginBottom: 16 }}
                          value={vehicleData.vin}
                          onChangeText={(text) => setVehicleData({ ...vehicleData, vin: text })}
                        />
                        <TextInput
                          placeholder="Numéro d'immatriculation"
                          placeholderTextColor="#6c6c6e"
                          style={{ backgroundColor: "#2c2c2e", color: "#fff", padding: 12, fontSize: 18, borderRadius: 10, marginBottom: 16 }}
                          value={vehicleData.immatriculation}
                          onChangeText={(text) => setVehicleData({ ...vehicleData, immatriculation: text })}
                        />
                        <TouchableOpacity onPress={() => setShowFirstRegistration(!showFirstRegistration)}>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              borderRadius: 10,
                              padding: 12,
                            }}
                          >
                            <Text className="text-[#FFFF00] mb-3">
                              {showFirstRegistration ? "- Première mise en circulation" : "+ Première mise en circulation"}
                            </Text>
                          </View>
                        </TouchableOpacity>
                        {showFirstRegistration && (
                          <TextInput
                            placeholder="Première mise en circulation"
                            placeholderTextColor="#6c6c6e"
                            style={{ backgroundColor: "#2c2c2e", color: "#fff", padding: 12, fontSize: 18, borderRadius: 10, marginBottom: 16 }}
                            value={vehicleData.premiereMiseEnCirculation}
                            onChangeText={(text) => setVehicleData({ ...vehicleData, premiereMiseEnCirculation: text })}
                          />
                        )}
                        <TouchableOpacity onPress={() => setShowTechnicalControl(!showTechnicalControl)}>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              borderRadius: 10,
                              padding: 12,
                            }}
                          >
                            <Text className="text-[#FFFF00] mb-3">{showTechnicalControl ? "- Contrôle technique" : "+ Contrôle technique"}</Text>
                          </View>
                        </TouchableOpacity>
                        {showTechnicalControl && (
                          <TextInput
                            placeholder="Contrôle technique"
                            placeholderTextColor="#6c6c6e"
                            style={{ backgroundColor: "#2c2c2e", color: "#fff", padding: 12, fontSize: 18, borderRadius: 10, marginBottom: 16 }}
                            value={vehicleData.controleTechnique}
                            onChangeText={(text) => setVehicleData({ ...vehicleData, controleTechnique: text })}
                          />
                        )}
                      </ScrollView>
                    )}
                  </View>
                </View>
              </KeyboardAvoidingView>
            </View>
          </PanGestureHandler>
        </Modal>

        {/* Sous-menu pour les options supplémentaires */}
        {showSubMenu && (
          <View style={{ position: "absolute", top: 50, right: 10, backgroundColor: "#2c2c2e", borderRadius: 10, zIndex: 1 }}>
            <TouchableOpacity onPress={handleEdit}>
              <Text style={{ color: "#fff", padding: 10 }}>Modifier</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
              <Text style={{ color: "#fff", padding: 10 }}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default MyCarPage;
