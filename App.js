// App.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ProfileScreen from './components/ProfileScreen'
import HomeScreen from './components/HomeScreen'

import tw from 'twrnc'; // Import twrnc

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return (
          <View style={tw`flex-1 justify-center items-center`}>
            <HomeScreen/>
          </View>
        );
      case 'Profile':
        return (
          <View style={tw`flex-1 justify-center items-center`}>
            <ProfileScreen/>
          </View>
        );
      default:
        return (
          <View style={tw`flex-1 justify-center items-center`}>
            <HomeScreen/>
          </View>
        );
    }
  };

  return (
    <View style={tw`flex-1 justify-between`}>
      {renderScreen()}
      <View style={tw`flex-row justify-around bg-gray-200 p-4 border-t border-gray-400`}>
        <TouchableOpacity onPress={() => setCurrentScreen('Home')}>
          <Text style={tw`text-lg text-blue-500`}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setCurrentScreen('Profile')}>
          <Text style={tw`text-lg text-blue-500`}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}