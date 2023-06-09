import React, { useContext, useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { AppContext } from "../AppContext";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import db from "../database/firebase";
import DonationCard from "../components/DonationComponents/DonationCard";
import { ScrollView } from "react-native-gesture-handler";

const DonationsScreen = () => {
  const { globalData } = useContext(AppContext);
  const { user } = globalData;
  const [donations, setDonations] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "donations"), where("userId", "==", user.id)),
      (snapshot) => {
        const donationList = [];
        snapshot.forEach((doc) => {
          donationList.push(doc.data());
        });
        setDonations(donationList);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => unsubscribe();
  }, []);

  const fetchCampaign = async (documentId) => {
    try {
      const docRef = doc(db, "campaigns", documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // El documento existe, puedes acceder a sus datos utilizando docSnap.data()
        const documentData = docSnap.data();
        // console.log("Datos del documento:", documentData);
        return documentData;
      } else {
        console.log("No se encontró ningún documento con el ID:", documentId);
        return null;
      }
    } catch (error) {
      console.log("Error al buscar el documento:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchCampaigns = async () => {
      const campaignList = [];
      for (const donation of donations) {
        const campaignData = await fetchCampaign(donation.campaignId.toString());
        campaignList.push(campaignData);
      }
      setCampaigns(campaignList);
    };

    fetchCampaigns();
  }, [donations]);

  return (
    <SafeAreaView className="h-screen w-screen bg-white ">
      <View className="flex-1 justify-center items-center mb-20">
        <Text className="text-4xl m-4 font-bold">Mis Donaciones</Text>
        <ScrollView
          className=""
        showsVerticalScrollIndicator={false}>
          {donations.map((donation, index) => (
            <DonationCard
              key={index}
              donation={donation}
              campaign={campaigns[index]}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DonationsScreen;
