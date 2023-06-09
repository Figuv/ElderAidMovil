import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import { isAfter } from "date-fns";

const CampaignModal = (props) => {
  const { campaign } = props.route.params; // Acceder a la información enviada, incluido el ID
  const endDate = campaign.end_date.toDate();
  const isEndDateAfterCurrentDate = isAfter(endDate, new Date());

  const formatDateString = (date) => {
    if (date instanceof Date) {
      return date.toLocaleDateString(); // O utiliza: date.toDateString();
    }
    return "";
  };

  return (
    <SafeAreaView className="bg-tertiary flex-1">
      <View className="">
        {/* <ScrollView
          className="w-screen"
          horizontal={true}
          showsVerticalScrollIndicator={false}
        >
          {campaign.campaign_images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image.image_url }}
              className="aspect-[9/5] w-screen"
            />
          ))}
        </ScrollView> */}
        <FlatList
          data={campaign.campaign_images}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.image_url }}
              className="aspect-[9/5] w-screen"
            />
          )}
          keyExtractor={(item, index) => index.toString()}
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
      </View>

      {isEndDateAfterCurrentDate ? (
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
