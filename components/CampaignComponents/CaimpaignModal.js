import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

const CampaignModal = (props) => {
  const { campaign} = props.route.params; // Acceder a la información enviada, incluido el ID

  const formatDateString = (date) => {
    if (date instanceof Date) {
      return date.toLocaleDateString(); // O utiliza: date.toDateString();
    }
    return "";
  };

  return (
    <SafeAreaView className="bg-tertiary h-full">
      <Image
        source={{ uri: campaign.img_url }}
        className="aspect-[9/5] w-max"
      />
      <View className="p-2">
        <Text className="text-4xl font-bold self-center text-black">
          {campaign.name}
        </Text>
        <View className="flex-row justify-between">
          <Text className="text-black opacity-80">
            Ends: {formatDateString(campaign.end_date.toDate())}
          </Text>
        </View>
        <Text>Beneficiary Type: {campaign.beneficiary_type}</Text>
        <Text>Requirement: {campaign.requirement}</Text>
      </View>

      {campaign.status === 1 ? (
        <TouchableOpacity
          className="bg-white self-center px-3 py-2 absolute bottom-10 rounded-full"
          onPress={() =>
            props.navigation.navigate("DonationModal", { campaign: campaign })
          }
        >
          <Text className="text-center text-2xl text-black font-bold">
            Donate
          </Text>
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
};

export default CampaignModal;
