import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Settings, StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { AppProvider } from "./AppContext";
//expo splash screen
import * as SplashScreen from "expo-splash-screen";
import LoginScreen from "./screens/Login";
import RegisterScreen from "./screens/Register";
import CampaignsScreen from "./screens/Campaigns";
import DonationsScreen from "./screens/Donations";
import SettingsScreen from "./screens/Settings";
import CaimpaignModal from "./components/CampaignComponents/CaimpaignModal";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Campaigns"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#5BBF94",
        },
        tabBarActiveTintColor: "#0A1A15",
        tabBarInactiveTintColor: "#CEF1D8",
      }}
    >
      <Tab.Screen
        name="Campaigns"
        component={CampaignsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="hand-heart-outline"
              color={color}
              size={size}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Donations"
        component={DonationsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="gift-outline"
              color={color}
              size={size}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="cog-outline"
              color={color}
              size={size}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Register"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={BottomTabNavigator}
      />

      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          options={{ headerShown: false }}
          name="CampaignModal"
          component={CaimpaignModal}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </AppProvider>
  );
}
