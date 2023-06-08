import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'

const Settings = (props) => {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <TouchableOpacity className="w-48 h-24 items-center justify-center bg-red-600 rounded-full"
        onPress={() => {props.navigation.navigate("Login")}}
      >
        <Text className="text-4xl text-white font-bold">
          Salir
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Settings