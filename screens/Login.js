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
import React, { useContext, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AppContext } from "../AppContext";
import { SHA256 } from "crypto-js";
import db from "../database/firebase";

const LoginScreen = (props) => {
  const { storeGlobalData } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email.length === 0 || password.length === 0) {
      alert("Please enter an email and password");
      return;
    }

    try {
      const usersQuery = query(
        collection(db, "users"),
        where("email", "==", email)
      );
      const usersQuerySnapshot = await getDocs(usersQuery);

      if (usersQuerySnapshot.empty) {
        alert("User not found");
        return;
      }

      const user = usersQuerySnapshot.docs[0];
      const userData = user.data();

      if (hashPassword(password) !== userData.password) {
        alert("Incorrect password");
        return;
      }

      userData.id = user.id;
      storeGlobalData({ user: userData });

      props.navigation.navigate("Home");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred during login");
    }
  };

  const hashPassword = (password) => {
    const hash = SHA256(password).toString();
    return hash;
  };

  return (
    <KeyboardAvoidingView
      className="bg-white h-full w-full items-center justify-center"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView>
        <View className="px-4">
          <View className="absolute px-4 flex-row items-center">
            <Image
              className="h-20 w-20"
              source={require("../assets/elderIcon.png")}
            />
            <Text className="text-3xl font-extrabold text-quaternary">
              ElderAid
            </Text>
          </View>

          <View className="w-full h-full items-center justify-center">
            <View className="flex-row items-center justify-center">
              <Text className="text-5xl font-bold text-senary">Login</Text>
            </View>
            <TextInput
              className="border-b-2 border-primary w-80 h-10 mt-4 px-2"
              placeholder="Correo electrónico"
              inputMode="email"
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              className="border-b-2 border-primary w-80 h-10 mt-4 px-2"
              placeholder="Contraseña"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              className="bg-primary w-80 h-10 mt-4 items-center justify-center"
              onPress={handleLogin}
            >
              <Text className="text-white text-xl font-bold">
                Iniciar sesión
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="w-80 mt-2 items-end justify-start"
              onPress={() => props.navigation.navigate("Register")}
            >
              <Text className="text-quaternary text-md font-bold">
                ¿No tienes cuenta? Regístrate
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
