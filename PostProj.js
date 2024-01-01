import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function PostProject() {
  const navigation = useNavigation();
  const [postTitle, setPostTitle] = useState('');
  const [house_area, sethouse_area] = useState();
  const [house_location, sethouse_location] = useState('');
  const [proposalDescription, setProposalDescription] = useState('');
  const [userId, setUserId] = useState();

  useEffect(() => {
    // Retrieve the user ID from async storage
    const retrieveUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('clientId');
        const userObject = JSON.parse(storedUserId);
        setUserId(userObject.id);
      } catch (error) {
        console.error('Error retrieving user ID:', error);
      }
    };

    retrieveUserId();
  }, []);


  const projectData = {
    post_name: postTitle,
    house_area: parseInt(house_area),
    house_location: house_location,
    proposal_description: proposalDescription,
    model_file: 'Model File',
    client_id: userId,
    bid_count: 0, // or any default value you want to set
  };
  



  const handleSubmit = async () => {
    if (!postTitle || !proposalDescription || !house_area || !house_location) {
      alert('Project title and description are required.');
      return;
    }
    console.log(projectData)
    await axios.post('http://192.168.206.238:8000/api/project', JSON.stringify(projectData), 
    {headers:{
      'Content-Type': 'application/json',
    }})
      .then(response => {
        console.log('API Response:', response.data);
        navigation.navigate('Projects');
        // Handle the response as needed
      })
      .catch(error => {
        console.error('Error submitting project:', error);
        // Handle the error, e.g., show an error message to the user
      });
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#8a2be2' }}>
      <View style={styles.Header} >
        <Text style={styles.Heading}>Post Your Projects</Text>
      </View>
      <ScrollView style={{ backgroundColor: '#363434', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
        <View style={styles.inputContainer} >
          <TextInput
            style={[styles.input, { color: '#ffffff' }]}
            placeholder='Project Title'
            placeholderTextColor='#ffffff'
            value={postTitle}
            onChangeText={setPostTitle}
          />
          <TextInput
            style={[styles.input, { color: '#ffffff' }]}
            placeholder='House Area'
            placeholderTextColor='#ffffff'
            value={house_area}
            onChangeText={sethouse_area}
          />
          <TextInput
            style={[styles.input, { color: '#ffffff' }]}
            placeholder='House Loacation'
            placeholderTextColor='#ffffff'
            value={house_location}
            onChangeText={sethouse_location}
          />
          <TextInput
            style={[styles.input, { color: '#ffffff' }]}
            placeholder="Proposal Description"
            placeholderTextColor='#ffffff'
            multiline
            value={proposalDescription}
            onChangeText={setProposalDescription}

          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>

    </SafeAreaView>
  )

}
const styles = StyleSheet.create({
  Header: {
    paddingVertical: 35,
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: "#8a2be2",

  },
  Heading: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: -5,
    marginBottom: 15,
    color: '#ffffff'
  },
  inputContainer: {
    backgroundColor: '#363434',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10, // Add margin between input containers


  },
  input: {
    height: 60,
    borderWidth: 1,
    fontSize: 20,
    borderColor: '#8a2be2',
    marginBottom: 10,
    alignContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 8,
    marginHorizontal: 8
  },

  submitButton: {
    height: 40,
    width: 150,
    backgroundColor: '#8a2be2',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 5,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 20,
  },
});