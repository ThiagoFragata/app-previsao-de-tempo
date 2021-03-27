import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Conditions from "../../components/Conditions";

// ACCESSING API
import api, { key } from "../../services/api";

export default function Search() {
  const navigation = useNavigation();

  const [input, setInput] = useState("");
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);

  async function handleSearch() {
    //weather?key=64b43dc5&city_name=Campinas,SP

    const response = await api.get(`weather?key=${key}&city_name=${input}`);
    // console.log(response.data);

    if (response.data.by === "default") {
      setError("Ops, cidade não encontrada!");
      setInput("");
      setCity(null);
      Keyboard.dismiss();
      return;
    }

    // console.log(response.data);
    setCity(response.data);
    setInput("");
    Keyboard.dismiss();
  }

  // IF A CITY EXISTS AND CREATE APPARENT
  if (city) {
    return (
      <SafeAreaView style={styles.container}>
        {/* BUTTON BACK */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Feather name="chevron-left" size={32} color="#000000" />
          <Text style={{ fontSize: 22 }}>Voltar</Text>
        </TouchableOpacity>

        {/* BOX SEARCH */}
        <View style={styles.searchBox}>
          <TextInput
            value={input}
            onChangeText={(valor) => setInput(valor)}
            placeholder={"Ex: Itacoatiara, AM"}
            style={styles.input}
          />
          <TouchableOpacity style={styles.icon} onPress={handleSearch}>
            <Feather name="search" size={22} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* BOX CITY */}
        <LinearGradient style={styles.header} colors={["#1ed6ff", "#97c1ff"]}>
          <Text style={styles.date}>{city.results.date}</Text>
          <Text style={styles.city}>{city.results.city}</Text>
          <View>
            <Text style={styles.temp}>{city.results.temp}º</Text>
          </View>
          <Conditions weather={city} />
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* BUTTON BACK */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Feather name="chevron-left" size={32} color="#000000" />
        <Text style={{ fontSize: 22 }}>Voltar</Text>
      </TouchableOpacity>

      {/* BOX SEARCH */}
      <View style={styles.searchBox}>
        <TextInput
          value={input}
          onChangeText={(valor) => setInput(valor)}
          placeholder={"Ex: Itacoatiara, AM"}
          style={styles.input}
        />
        <TouchableOpacity style={styles.icon} onPress={handleSearch}>
          <Feather name="search" size={22} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {error && (
        <Text style={{ marginTop: 25, fontSize: 18, color: "#ff0000" }}>
          {error}
        </Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: "10%",
    backgroundColor: "#e8f0ff",
  },
  backButton: {
    flexDirection: "row",
    marginLeft: 15,
    alignSelf: "flex-start",
    alignItems: "center",
    marginBottom: 10,
  },
  searchBox: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#dddddd",
    width: "90%",
    height: 50,
    borderRadius: 8,
  },
  input: {
    width: "85%",
    height: 50,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,

    padding: 7,
  },
  icon: {
    width: "15%",
    height: 50,
    backgroundColor: "#1ed6ff",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginTop: "5%",
    width: "90%",
    paddingTop: "5%",
    paddingBottom: "5%",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
  },
  date: {
    color: "#ffffff",
    fontSize: 16,
  },
  city: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  temp: {
    color: "#ffffff",
    fontSize: 90,
    fontWeight: "bold",
  },
});
