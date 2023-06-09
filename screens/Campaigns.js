import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import CampaignCard from "../components/CampaignComponents/CampaignCard";
import { AppContext } from "../AppContext";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import db from "../database/firebase";

const CampaignsScreen = (props) => {
  const [type, setType] = useState(true);
  const [campaignsData, setCampaignsData] = useState([]);
  const { globalData } = useContext(AppContext);
  const { user } = globalData;
  const currentTimestamp = Timestamp.fromDate(new Date());

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const q = query(
          collection(db, "campaigns"),
          where("end_date", type ? ">=" : "<", currentTimestamp)
        );

        const querySnapshot = await getDocs(q);
        const campaignList = [];
        querySnapshot.forEach((doc) => {
          const campaign = doc.data();
          campaign.id = doc.id;
          campaignList.push(campaign);
        });
        setCampaignsData(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchCampaigns();
  }, [type]);

  return (
    <SafeAreaView className="bg-white">
      <View className="items-center mb-32">
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
        <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
          {campaignsData.map((campaign, index) => (
            <CampaignCard
              key={index}
              campaign={campaign}
              url={campaign.campaign_images[0].image_url}
              name={campaign.name}
              startDate={campaign.start_date}
              endDate={campaign.end_date}
              beneficiaryType={campaign.beneficiary_type}
              requirement={campaign.requirement}
              onPress={() => {
                props.navigation.navigate("CampaignModal", {
                  campaign: campaign,
                  id: campaign.id, // Agregar el ID de la campaña
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
