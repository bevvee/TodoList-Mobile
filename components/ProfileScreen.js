// src/components/ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Image, Button, StyleSheet } from 'react-native';
import tw from 'twrnc'; // Using Tailwind for styles

const ProfileScreen = () => {
  // State for the form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission (can connect to backend API)
  const handleSubmit = () => {
    console.log("User's new data:", { name, email, password });
    // You can handle the logic of updating user info here.
  };

  return (
    <View style={tw`flex-1 p-4`}>
      {/* Avatar */}
      <View style={tw`items-center mb-8`}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }} // Avatar placeholder
          style={styles.avatar}
        />
        <Text style={tw`text-xl font-bold mt-4`}>User's Profile</Text>
      </View>

      {/* Input fields */}
      <View style={tw`mb-4`}>
        <Text style={tw`mb-1 text-lg`}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`mb-1 text-lg`}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`mb-1 text-lg`}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry={true}
        />
      </View>

      {/* Submit button */}
      <Button title="Save Changes" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});

export default ProfileScreen;