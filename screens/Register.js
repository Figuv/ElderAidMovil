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
import React from "react";

const RegisterScreen = (props) => {
  const handleRegister = () => {
    // Lógica de inicio de sesión aquí
    // Puedes usar un botón para iniciar sesión de prueba
    // Por ejemplo, puedes hacer que al presionar el botón se navegue a MainScreen
    props.navigation.navigate("Home");
  };

  return (
    <KeyboardAvoidingView
      className="bg-white h-full w-full"
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
              <Text className="text-5xl font-bold text-senary">Register</Text>
            </View>
            <TextInput
              className="border-b-2 border-primary w-80 h-10 mt-4 px-2"
              placeholder="Correo electrónico"
            />
            <TextInput
              className="border-b-2 border-primary w-80 h-10 mt-4 px-2"
              placeholder="Contraseña"
            />
            <TouchableOpacity
              className="bg-primary w-80 h-10 mt-4 items-center justify-center"
              onPress={handleRegister}
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
