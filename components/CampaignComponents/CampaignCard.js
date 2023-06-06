import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const CampaignCard = (props) => {
  const { name, startDate, endDate, beneficiaryType, requirement, url } = props;

  return (
    <TouchableOpacity className="w-full pb-3 justify-center relative bg-tertiary rounded-2xl my-1 overflow-hidden"
      onPress={() => {props.onPress()}}
    >
      <Image source={{ uri: url }} className="aspect-[9/5] w-80" />
      <View className="px-2">
        <Text className="text-2xl font-bold">{name}</Text>
        <View className="flex-row justify-between">
          <Text className="text-black opacity-80">Starts: {startDate}</Text>
          <Text className="text-black opacity-80">Ends: {endDate}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-black opacity-80">{beneficiaryType}</Text>
          <Text className="text-black opacity-80">{requirement}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CampaignCard;
