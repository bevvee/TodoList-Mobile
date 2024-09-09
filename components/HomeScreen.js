// src/components/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import tw from 'twrnc';

const HomeScreen = () => {
  // State for loading, data, and error
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // Fetch data from an API
  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // Replace with your API
      const result = await response.json();
      setData(result); // Update the data state with the fetched data
    } catch (err) {
      setError(err); // If there's an error, set the error state
    } finally {
      setLoading(false); // Always stop the loading spinner when data is fetched or error occurs
    }
  };

  // Call the API when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={tw`mt-4 text-lg`}>Loading...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-lg text-red-500`}>Error: {error.message}</Text>
      </View>
    );
  }

  // Render fetched data
  return (
    <View style={tw`flex-1 p-4`}>
      <Text style={tw`text-xl font-bold mb-4`}>API Data</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={tw`mb-4 p-4 bg-gray-100 rounded-lg`}>
            <Text style={tw`font-bold text-lg`}>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Additional styles (if needed)
});

export default HomeScreen;