import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

const CaimpaignModal = (props) => {
  const campaign = props.route.params.campaign;

  console.log(campaign);

  return (
    <SafeAreaView className="bg-tertiary h-full">
      <Image
        source={{ uri: campaign.img_url }}
        className="aspect-[9/5] w-max"
      />
      <View className="p-2">
        <Text className="text-4xl font-bold self-center">{campaign.name}</Text>
        <View className="flex-row justify-between">
          <Text className="text-black opacity-80">
            Ends: {campaign.endDate}
          </Text>
        </View>
        <Text>Beneficiary Type: {campaign.beneficiaryType}</Text>
        <Text>Requirement: {campaign.requirement}</Text>
      </View>
      <TouchableOpacity
        className="bg-white self-center px-3 py-2 absolute bottom-10 rounded-full"
        onPress={() =>
          props.navigation.navigate("Donation", { campaign: campaign })
        }
      >
        <Text className="text-center text-2xl text-black font-bold">
          Donate
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CaimpaignModal;
