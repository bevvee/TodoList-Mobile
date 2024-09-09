// src/components/Navbar.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Navbar = ({ setCurrentScreen }) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('Home')}>
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('Profile')}>
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  navItem: {
    padding: 10,
  },
  navText: {
    fontSize: 18,
    color: '#007AFF',
  },
});

export default Navbar;