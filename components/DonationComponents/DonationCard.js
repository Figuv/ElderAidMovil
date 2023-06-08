import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const DonationCard = (props) => {
  const { campaign, donation } = props;

  const formatDeliveryDate = () => {
    const date = donation?.donationDate?.toDate();
    const formattedDate = date?.toLocaleDateString() || ""; // Si date es nulo, devuelve una cadena vacía
    return formattedDate;
  };

  return (
    <View
      className="flex-1 w-80 pb-3 justify-center relative bg-tertiary rounded-2xl my-1 overflow-hidden"
      onPress={() => {
        props.onPress();
      }}
    >
      <View className="p-2">
        <Text className="text-2xl font-bold">{campaign?.name || ""}</Text>
        <View className="flex-row justify-between">
          <Text className="text-black opacity-80">{donation?.amount || ""}</Text>
          <Text className="text-black opacity-80">{donation?.fullName || ""}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-black opacity-80">Fecha de entrega: {formatDeliveryDate(donation?.donationDate)}</Text>
          <Text className="text-black opacity-80"></Text>
        </View>
      </View>
    </View>
  );
};

export default DonationCard;
