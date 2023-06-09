import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { AppContext } from "../../AppContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import db from "../../database/firebase";
import * as Progress from "react-native-progress";

const DonationModal = (props) => {
  const { globalData } = useContext(AppContext);
  const { user } = globalData;

  const [itemQuantity, setItemQuantity] = useState(0);
  const [donationAmount, setDonationAmount] = useState(0);
  const [donationDescription, setDonationDescription] = useState("");
  const [anonymousDonation, setAnonymousDonation] = useState(false);
  const [useRegisteredLocation, setUseRegisteredLocation] = useState(true);
  const [donateItems, setDonateItems] = useState(true);
  const [address, setAddress] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // const showDatePicker = () => {
  //   setShowPicker(true);
  // };

  const handleShowDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const campaign = props.route.params.campaign;
  console.log(campaign);

  const handleDonation = async () => {
    try {
      console.log("Registering donation....");
      const quantity = donateItems
        ? parseInt(itemQuantity)
        : parseInt(donationAmount);
      const description = donationDescription;
      const donation_date = date;
      // const location = useRegisteredLocation ? user.address : address;
      const userId = user.id;
      const campaignId = parseInt(campaign.id);
      const anonymous = anonymousDonation;
      const institutionId = campaign.institution_id;

      // Crea un objeto con los datos de la donación
      const donationData = {
        quantity,
        description,
        donation_date,
        anonymous,
        userId,
        campaignId,
        institutionId,
        status: "to_collect",
      };

      // Sube los datos a Firestore y obtén la referencia de la donación
      const donationRef = await addDoc(
        collection(db, "donations"),
        donationData
      );
      const donationId = donationRef.id;

      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, {
        donations: arrayUnion(donationId),
      });

      // Oculta el indicador de progreso
      setUploading(false);

      // Navega a la ventana DonationCompleteScreen
      props.navigation.navigate("DonationCompleteScreen");
    } catch (error) {
      console.log(error);
    }
  };

  //get actual position and set it to the map
  // const [position, setPosition] = useState({
  //   latitude: 0,
  //   longitude: 0,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.0421,
  // });

  // const handleMarkerPress = (event) => {
  //   const { latitude, longitude } = event.nativeEvent.coordinate;
  //   setAddress([latitude, longitude]);
  //   setPosition({
  //     latitude: latitude,
  //     longitude: longitude,
  //   });
  // };

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       let { status } = await Location.requestForegroundPermissionsAsync();
  //       if (status !== "granted") {
  //         alert("Permission to access location was denied");
  //         return;
  //       }

  //       let location = await Location.getCurrentPositionAsync({});
  //       setPosition({
  //         latitude: location.coords.latitude,
  //         longitude: location.coords.longitude,
  //         latitudeDelta: 0.0922,
  //         longitudeDelta: 0.0421,
  //       });
  //     } catch (error) {
  //       alert(error.message);
  //     }
  //   })();
  // }, []);

  return (
    <SafeAreaView className="bg-primary h-full w-screen">
      <View className="justify-center items-center ">
        <Text className="text-black text-4xl font-bold my-4">
          {campaign.name}
        </Text>
        {/* Opciones de donación */}
        <View className="mb-2 w-64">
          <Text className="text-black mb-1">Donar ítems o dinero:</Text>
          <Switch
            className="transform scale-75"
            value={donateItems}
            onValueChange={(value) => setDonateItems(value)}
          />
        </View>

        {donateItems ? (
          <View className="mb-2 w-64">
            <Text className="text-black mb-1">Cantidad de ítems a donar:</Text>
            <TextInput
              className="bg-white rounded px-4 py-2 w-64"
              value={itemQuantity.toString()} // Convertir a cadena de texto
              onChangeText={(text) => setItemQuantity(text)}
              keyboardType="numeric"
            />
          </View>
        ) : (
          <View className="mb-2 w-64">
            <Text className="text-black mb-1">Cantidad de dinero a donar:</Text>
            <TextInput
              className="bg-white rounded px-4 py-2 w-64"
              value={donationAmount.toString()} // Convertir a cadena de texto
              onChangeText={(text) => setDonationAmount(text)}
              keyboardType="numeric"
            />
          </View>
        )}

        {/* Descripción adicional */}
        <View className="mb-2 w-64">
          <Text className="text-black mb-1">Descripción adicional:</Text>
          <TextInput
            className="bg-white rounded px-4 py-2 h-10 w-64"
            value={donationDescription}
            onChangeText={(text) => setDonationDescription(text)}
          />
        </View>

        {/* Opción de anonimato */}
        <View className="mb-2 w-64">
          <Text className="text-black mb-1">Donar de forma anónima:</Text>
          <Switch
            className="transform scale-75"
            value={anonymousDonation}
            onValueChange={(value) => setAnonymousDonation(value)}
          />
        </View>

        {/* Date picker */}

        <View className="items-center w-64 flex-row">
          <Text>Fecha para recoleccion:</Text>
          {Platform.OS === "android" ? (
            <View>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text>Select Date</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  minimumDate={campaign.start_date.toDate()}
                  maximumDate={campaign.end_date.toDate()}
                />
              )}
            </View>
          ) : (
            <DateTimePicker
              value={date}
              mode="date"
              display="alert"
              onChange={handleDateChange}
              minimumDate={campaign.start_date.toDate()}
              maximumDate={campaign.end_date.toDate()}
            />
          )}
        </View>
        {/* Botón de donación */}
        <TouchableOpacity
          className="bg-black py-2 px-4 rounded-full w-32 h-16 items-center justify-center mt-4"
          onPress={handleDonation}
        >
          <Text className="text-white text-xl font-bold">Completar</Text>
        </TouchableOpacity>
      </View>
      {uploading && (
        <View className="flex-1 justify-center items-center">
          <Progress.Circle size={50} indeterminate={true} />
          <Text className="text-black">Subiendo donación...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default DonationModal;
