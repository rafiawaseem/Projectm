import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Login(){
const [email, setemail] = useState('');
const [password, setPassword] = useState('');
const [errorMessage, setErrorMessage] = useState('');
const [loading, setLoading] = useState(false);
const navigation = useNavigation();
// const [userType, setUserType] = useState('client'); // Default to 'client'
const [selectedButton, setSelectedButton] = useState(null);//for button selection
const handleButtonPress=(buttonName)=>{
  setSelectedButton(buttonName);
}
const validateEmail = (email) => {
  // Basic email validation using regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
  const handleLogin = async() => {
    if (!validateEmail(email)) {
      setErrorMessage('Invalid email');
      return;
    }
    // Conditionally make API call based on the selected button
    if (selectedButton === 'button1') {
      try {
        setLoading(true);
        const apiUrl = 'http://192.168.43.138:8000/api/client/login';  // Replace with your actual API URL
        const response = await axios.post(apiUrl, {
          email: email,
          password: password,
        });
        console.log('API Response:', response.data);
        AsyncStorage.setItem('clientId', JSON.stringify(response.data));
        const clientstore = await AsyncStorage.getItem('clientId');
        // Log the stored ID directly in the console
        console.log('Client ID stored successfully. Stored ID:', clientstore);
        navigation.navigate('MHome');
      } catch (error) {
        console.error('API Error:', error);
      }finally {
        setLoading(false); 
      }
      
    } else if (selectedButton === 'button2') {
      try {
        setLoading(true);
        const apiUrl = 'http://192.168.43.138:8000/api/builder/login';  // Replace with your actual API URL
        const response = await axios.post(apiUrl, {
          email: email,
          password: password,
        });
        console.log('API Response:', response.data);
        AsyncStorage.setItem('builderId', JSON.stringify(response.data));
        // Retrieve the stored ID
        const storedId = await AsyncStorage.getItem('builderId');
        // Log the stored ID directly in the console
        console.log('Builder ID stored successfully. Stored ID:', storedId);
        navigation.navigate('BuilderHome');
      } catch (error) {
        console.error('API Error:', error);
      }finally {
        setLoading(false); 
      }
    }

    // Navigate to the next screen or perform necessary actions
    
    
    } 

  

  return (
    <ScrollView>
      <View style={styles.container}>
      <View style={styles.loginContainer}>
      <Text style={styles.heading}>Login</Text>
      <View  style={styles.buttonContainer}>
      <TouchableOpacity //button1 client
        style={[
          styles.touchable,
          selectedButton === 'button1' && styles.selectedButton, // Apply styles if button1 is selected
        ]}onPress={() => handleButtonPress('button1')}>
          <Icon
          //changing the color of icon and text when the button is selected
          name='account-circle' size={35} color={selectedButton=='button1'?'#ffffff':'#8a2be2'}
          />
          {/* name="sort" size={28} color="#181818" #363434 black*/} 
        <Text style={[styles.text,{color:selectedButton=='button1'?'#ffffff':'#8a2be2'}]}>Client</Text>
      </TouchableOpacity>

      <TouchableOpacity //button2 builder
        style={[
          styles.touchable,
          selectedButton === 'button2' && styles.selectedButton, // Apply styles if button2 is selected
        ]}
        onPress={() => handleButtonPress('button2')}>
          <Icon
          //changing the color of icon and text when the button is selected
          name='account-circle' size={35} color={selectedButton=='button2'?'#ffffff':'#8a2be2'}
          />
        <Text style={[styles.text,{color:selectedButton=='button2'?'#ffffff':'#8a2be2'}]}>Builder</Text>
      </TouchableOpacity>
      </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ffffff"
          value={email}
          onChangeText={setemail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ffffff"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
        onPress={handleLogin} style={{backgroundColor:'#8a2be2', padding:10 ,borderRadius: 10}}
        >
          <Text style={{color:'#ffffff', fontSize:20, alignSelf:'center' , alignItems:'center'}}> LOGIN </Text>
        </TouchableOpacity>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      </View>
    </View>
    {loading && (
  <View style={styles.loaderContainer}>
    <View style={styles.loaderCircle}>
      <LottieView
        source={require('./assets/Animation - 1705585934337.json')}
        autoPlay
        loop
      />
    </View>
  </View>
)}
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:170,
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  loaderCircle: {
    height:100,
    width:100,
    marginTop:180,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
    borderRadius: 80, // Half of the width/height to make it a circle
    padding: 20, // Adjust as needed
    elevation: 5, // Add some elevation for Android shadow
  },
  loginContainer: {
    width: '80%',
    height:'100%',
    alignContent:'center',
    justifyContent:'center',
    padding: 20,
    backgroundColor: '#181818',
    borderRadius: 10,
    shadowColor: 'white',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    elevation: 18,
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    color:'white',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  heading: {
    fontSize: 35,
    color: '#FFFFFF', //WHITE
    fontWeight: 'bold',
    marginBottom: 10, // Add spacing between the heading and inputs
    textAlign: 'center'},

    touchable: {
      backgroundColor: '#363434', //grey
      padding: 16,
      borderRadius: 8,
      marginBottom: 16,
      height:80,
      width:80,
      alignContent:'space-between',
      justifyContent:'center',
      alignItems:'center'
    },
    text: {
      color: '#8a2be2',
      fontSize: 18,
    },
    selectedButton: {
      backgroundColor: '#8a2be2', // Change the color when selected
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
      marginHorizontal:10
    },
});


