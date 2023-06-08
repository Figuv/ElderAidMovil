import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const CampaignCard = (props) => {
  const { name, startDate, endDate, beneficiaryType, requirement, url } = props;

  const formatDateString = (date) => {
    if (date instanceof Date) {
      return date.toLocaleDateString(); // O utiliza: date.toDateString();
    }
    return "";
  };

  return (
    <TouchableOpacity
      className="w-80 pb-3 justify-center relative bg-tertiary rounded-2xl my-1 overflow-hidden"
      onPress={() => {
        props.onPress();
      }}
    >
      <Image
        source={{ uri: url }}
        className="aspect-[9/5] content-stretch"
      />
      <View className="px-2">
        <Text className="text-2xl font-bold">{name}</Text>
        <View className="flex-row justify-between">
          <Text className="text-black opacity-80">
            Starts: {startDate ? formatDateString(startDate.toDate()) : ""}
          </Text>
          <Text className="text-black opacity-80">
            Ends: {endDate ? formatDateString(endDate.toDate()) : ""}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-black opacity-80">
            Beneficiado:
            {beneficiaryType ? beneficiaryType : ""}
          </Text>
          <Text className="text-black opacity-80">
            Requerimiento: 
            {requirement ? requirement : ""}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CampaignCard;
