import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Bprofile() {

  const [builderData, setBuilderData] = useState(null);

  useEffect(() => {
    const fetchBuilderData = async () => {
      try {
        // Fetch the stored client ID from AsyncStorage
        const storedBuilderId = await AsyncStorage.getItem('builderId');
        const builderId = JSON.parse(storedBuilderId).id;

        // Fetch client data from the API using the client ID
        const response = await axios.get(`http://192.168.5.101:8000/api/builder/${builderId}`);
        setBuilderData(response.data.builder);
        console.log('builder data', builderData)
      } catch (error) {
        console.error('Error fetching builder data:', error);
      }
    };

    fetchBuilderData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {builderData && (
        <>
          <View style={styles.imageContainer}>
            <Image
              style={styles.profileImage}
              source={require('./assets/profile.jpg')}
            />
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.name}>{builderData.username}</Text>
            <Text style={styles.email}>{builderData.email}</Text>
            <Text style={styles.phoneNumber}>{builderData.phone_number}</Text>
            <Text style={styles.address}>{builderData.address}</Text>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#363434',
      flexDirection: 'column',
      marginTop:25, // Use row layout to align other components to the left
      marginLeft: 20, // Margin on the left for other components
      marginRight: 20, // Margin on the right for other components
    },
    imageContainer: {
      flex: 1, // Takes up 1/3 of the available space
      alignItems: 'center', // Center the profile image horizontally
    },
    profileImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
      borderColor: 'black',
    //   marginTop: 40,
    //   marginBottom: 20,
      backgroundColor: 'lightgray', // Add a background color to the image container
    },
    detailsContainer: {
      flex: 1,
      marginTop:15,
       // Takes up 2/3 of the available space
    },
    name: {
      fontSize: 24,
      color:'#8a2be2',
      fontWeight: 'bold',
      marginBottom: 10,
      marginBottom: 8,
      padding: 16,
      borderRadius: 8,
      backgroundColor: '#181818',
    },
    email: {
      fontSize: 24,
      fontWeight:'bold',
      color:'#8a2be2',
      marginBottom: 10,
      marginBottom: 8,
      padding: 16,
      borderRadius: 8,
      backgroundColor: '#181818',
    },
    phoneNumber: {
        fontSize: 24,
        fontWeight:'bold',
        color:'#8a2be2',
        marginBottom: 10,
        marginBottom: 8,
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#181818',
    },
    address: {
        fontSize: 24,
        fontWeight:'bold',
        color:'#8a2be2',
        marginBottom: 10,
        marginBottom: 8,
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#181818',
    },
  });