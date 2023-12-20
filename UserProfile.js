import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const UserProfile = ({ user }) => {
    const myImage = require('./assets/profile.jpg');
  return (
    <ScrollView style={{ backgroundColor: '#363434', marginLeft: 20, marginRight: 20,flexDirection: 'column',
    marginTop:25, flex: 1, }}>
        <View style={styles.imageContainer}>
        <Image
        style={styles.profileImage}
        source = {myImage}
      />
        </View>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>User</Text>
        <Text style={styles.email}>user@gmail.com</Text>
        <Text style={styles.phoneNumber}>022166232</Text>
        <Text style={styles.address}>
            Robert Robertson, 
                     1234 NW Bobcat Lane, St. Robert, MO 65584-5678.</Text>
      </View>    
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
  });export default UserProfile;
