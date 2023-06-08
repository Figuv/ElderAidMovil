import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

export default function DonationComplete() {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Donations");
    }, 4000);
  }, []);

  return (
    <SafeAreaView className="bg-white flex-1 justify-center items-center">
      <Animatable.Text
        animation="slideInUp"
        easing="ease-in-out"
        iterationCount={1}
        duration={500}
        className="h-36 aspect-[409/295] object-contain font-bold text-2xl"
        style={{ textAlign: "center" }}
      >
        Un encargado se aproximara a su direccion el dia seleccionado!
      </Animatable.Text>

      <Animatable.Image
        source={require("../assets/delivery.gif")}
        animation="slideInUp"
        iterationCount="infinite"
        duration={500}
        direction="alternate"
        className="h-36 aspect-[409/295] object-contain "
      />
    </SafeAreaView>
  );
}
