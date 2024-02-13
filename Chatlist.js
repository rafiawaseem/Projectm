import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ChatListScreen = () => {
  const [ClientId, setClientId] = useState('');
  const [builders, setBuilders] = useState([]);
  const [builderId, setBuilderId] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('clientId');
        const userObject = JSON.parse(storedUserId);
        setClientId(userObject.id);
        console.log("client id:", userObject.id);

        const response = await axios.get(
          `https://estihomebidder.com/api/client-chat-list/${userObject.id}`,
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );

        console.log(response.data.builderInfo);
         // Convert the object into an array of objects
         const buildersArray = Object.keys(response.data.builderInfo).map(id => ({
          id: parseInt(id),
          username: response.data.builderInfo[id],
        }));
        setBuilders(buildersArray);

      } catch (error) {
        console.error('Error getting chat list:', error);
      }
    };
    fetchData();
  }, []);

  const getImageUri = (asset) => Asset.fromModule(asset).uri;

  const navigation = useNavigation();
  // <Image source={{uri: getImageUri(item.imageSource)}} style={styles.itemImage} />

  const Handlepress = (builderid) => {
    setBuilderId(builderid);

    // Log the post ID inside a callback function
    setBuilderId(async (newId) => {
      console.log("builderid:", newId);
      AsyncStorage.setItem('builder', JSON.stringify(newId));
      const storedId = await AsyncStorage.getItem('builder');
      console.log('builder ID stored successfully. Stored ID:', storedId);
      navigation.navigate('ChatScreen');
    })
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => Handlepress(item.id)}>
      <View style={styles.itemContainer}>
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemDescription}>{`Builder ID: ${item.id}`}</Text>
          <Text style={styles.itemTitle}>{`Username: ${item.username}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={builders}
      keyExtractor={(item) => item.id}
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
    height: 80,
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
    color: '#ffffff',
    fontWeight: 'bold',
    // marginTop:-20
  },
  itemDescription: {
    fontSize: 16,
    color: '#ffffff',

  },
});

export default ChatListScreen;
