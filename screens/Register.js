import {
  View,
  Text,
  Button,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import db from "../database/firebase";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { SHA256 } from "crypto-js";
import { addDoc, collection } from "firebase/firestore";

const RegisterScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullame] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState([]);
  const [ci, setCi] = useState("");

  // Hash password
  const hashPassword = (password) => {
    const hash = SHA256(password).toString();
    return hash;
  };

  // Create account function
  const handleCreateAccount = async () => {
    console.log("Creating account...");
    if (email.length === 0) {
      alert("Please enter an email");
    } else {
      try {
        await addDoc(collection(db, "users"), {
          fullname: fullname,
          email: email,
          password: hashPassword(password),
          phone: phone,
          address: address,
          ci: ci,
          donations: [],
        });
        props.navigation.navigate("Login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  //get actual position and set it to the map
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleMarkerPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setAddress({latitude,longitude});
    setPosition({
      latitude: latitude,
      longitude: longitude,
    });
    // console.log(address);
  };

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          alert("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setPosition({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        alert(error.message);
      }
    })();
  }, []);

  return (
    <KeyboardAvoidingView
      className="bg-white h-full w-full"
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView>
        <View className="px-4">
          {/* <View className="absolute px-4 flex-row items-center">
            <Image
              className="h-20 w-20"
              source={require("../assets/elderIcon.png")}
            />
            <Text className="text-3xl font-extrabold text-quaternary">
              ElderAid
            </Text>
          </View> */}

          <View className="w-full h-full items-center justify-center">
            <View className="flex-row items-center justify-center">
              <Text className="text-5xl font-bold text-senary">Register</Text>
            </View>
            {/* Register information */}
            <TextInput
              className="border-b-2 border-primary w-80 h-8 mt-4 px-2"
              placeholder="Correo electrónico"
              inputMode="email"
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              className="border-b-2 border-primary w-80 h-8 mt-4 px-2"
              placeholder="Contraseña"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
            <TextInput
              className="border-b-2 border-primary w-80 h-8 mt-4 px-2"
              placeholder="Nombre Completo"
              onChangeText={(text) => setFullame(text)}
            />
            <TextInput
              className="border-b-2 border-primary w-80 h-8 mt-4 px-2"
              placeholder="Número de teléfono"
              inputMode="tel"
              onChangeText={(text) => setPhone(text)}
            />
            <TextInput
              className="border-b-2 border-primary w-80 h-8 mt-4 px-2"
              placeholder="Carnet de identidad"
              onChangeText={(text) => setCi(text)}
            />
            <MapView
              style={{ width: 300, height: 300, marginTop: 10 }}
              region={position}
              onPress={handleMarkerPress}
            >
              <Marker coordinate={position} />
            </MapView>

            {/* Register button */}
            <TouchableOpacity
              className="bg-primary w-80 h-8 mt-4 items-center justify-center"
              onPress={handleCreateAccount}
            >
              <Text className="text-white text-xl font-bold">Registrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="w-80 mt-2 items-end justify-start"
              onPress={() => props.navigation.navigate("Login")}
            >
              <Text className="text-quaternary text-md font-bold">
                ¿Ya tienes una cuenta?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
