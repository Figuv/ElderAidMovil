import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import CampaignCard from "../components/CampaignComponents/CampaignCard";

const CampaignsScreen = (props) => {
  const [type, setType] = useState(true); // Estado de la variable ongoing

  const campaignsData = [
    {
      name: "Campaña 1",
      startDate: "2023-06-01",
      endDate: "2023-06-30",
      beneficiaryType: "Type A",
      requirement: "Requirement A",
      img_url:
        "https://e3.365dm.com/21/08/2048x1152/skynews-afghanistan-refugees_5487757.jpg",
    },
    {
      name: "Campaña 2",
      startDate: "2023-07-01",
      endDate: "2023-07-31",
      beneficiaryType: "Type B",
      requirement: "Requirement B",
      img_url:
        "https://e3.365dm.com/21/08/2048x1152/skynews-afghanistan-refugees_5487757.jpg",
    },
    {
      name: "Campaña 3",
      startDate: "2023-08-01",
      endDate: "2023-08-31",
      beneficiaryType: "Type C",
      requirement: "Requirement C",
      img_url:
        "https://e3.365dm.com/21/08/2048x1152/skynews-afghanistan-refugees_5487757.jpg",
    },
    {
      name: "Campaña 1",
      startDate: "2023-06-01",
      endDate: "2023-06-30",
      beneficiaryType: "Type A",
      requirement: "Requirement A",
      img_url:
        "https://e3.365dm.com/21/08/2048x1152/skynews-afghanistan-refugees_5487757.jpg",
    },
    {
      name: "Campaña 1",
      startDate: "2023-06-01",
      endDate: "2023-06-30",
      beneficiaryType: "Type A",
      requirement: "Requirement A",
      img_url:
        "https://e3.365dm.com/21/08/2048x1152/skynews-afghanistan-refugees_5487757.jpg",
    },
    
  ];
  console.log(type);

  return (
    <SafeAreaView className="bg-white">
      <View className="items-center px-4 mb-32">
        <View className="flex-row justify-center my-2 p-1 space-x-2 rounded-full">
          <TouchableOpacity
            className={`bg-${
              type ? "black" : "white"
            } px-2 py-1 rounded-full justify-center items-center`}
            onPress={() => setType(true)}
          >
            <Text className="text-3xl font-extrabold text-secondary">
              OnGoing
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`bg-${
              type ? "white" : "black"
            } px-2 py-1 rounded-full justify-center items-center`}
            onPress={() => setType(false)}
          >
            <Text className="text-3xl font-extrabold text-secondary">
              PastDue
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView className="" showsVerticalScrollIndicator={false}>
          {campaignsData.map((campaign, index) => (
            <CampaignCard
              key={index}
              campaign={campaign}
              url={campaign.img_url}
              name={campaign.name}
              startDate={campaign.startDate}
              endDate={campaign.endDate}
              beneficiaryType={campaign.beneficiaryType}
              requirement={campaign.requirement}
              onPress={() => {
                props.navigation.navigate("CampaignModal", {
                  campaign: campaign,
                });
              }}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CampaignsScreen;
