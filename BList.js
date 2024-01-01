import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export default function BList() {
  const [ClientId, setClientId] = useState('');
  const [clients, setClients] = useState([]);
  const [builderId,setBuilderId]=useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedId = await AsyncStorage.getItem('builderId');
        const userObject = JSON.parse(storedId);
        setBuilderId(userObject.id);
  
        const response = await axios.get(
          `http://192.168.206.238:8000/api/builder-chat-list/${userObject.id}`,
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        console.log("builder id:", );

        console.log(response.data);
        setClients(response.data);

      } catch (error) {
        console.error('Error getting chat list:', error);
      }
    };
  
    fetchData();
  }, []);
  

  const navigation = useNavigation();
  // <Image source={{uri: getImageUri(item.imageSource)}} style={styles.itemImage} />

  const Handlepress=(clientid) =>{
    setClientId(clientid);
 
   // Log the post ID inside a callback function
   setClientId(async (newId) => {
     console.log("clientid:", newId);
     AsyncStorage.setItem('client', JSON.stringify(newId));
     const storedId = await AsyncStorage.getItem('client');
     console.log('client ID stored successfully. Stored ID:', storedId);
    navigation.navigate('Chat');
   })}

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => Handlepress(item.client.id)}>
      <View style={styles.itemContainer}>
        <View style={styles.itemTextContainer}>
        <Text style={styles.itemDescription}>{`Client ID: ${item.client.id}`}</Text>
        <Text style={styles.itemTitle}>{`Username: ${item.client.username}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={clients}
      keyExtractor={(item) => item.client.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 8,

  },
  itemContainer: {
    height:80,
    backgroundColor: '#181818',
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row', // Align image and text horizontally
    alignItems: 'center', // Center items vertically
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 32, // To create a circular image
  },
  itemTextContainer: {
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: 18,
    color:'#ffffff',
    fontWeight: 'bold',
    // marginTop:-20
  },
  itemDescription: {
    fontSize: 16,
    color:'#ffffff',

  },
});