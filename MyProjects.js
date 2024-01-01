import React from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MyProjects = () => {
  const navigation=useNavigation();
  const [selectedPostId, setSelectedPostId] = useState(null); 
  const [clientId, setClientId] = useState('');
  const [clientPostsArray, setClientPostsArray] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('clientId');
        const userObject = JSON.parse(storedUserId);
        setClientId(userObject);
        console.log("client id:", userObject.id);
        const response = await axios.get(`http://192.168.5.102:8000/api/projects/not-accepted/${userObject.id}`);
        const clientPosts = response.data.projects_not_accepted;
        setClientPostsArray(clientPosts);
        console.log("client array", clientPostsArray)
      } catch (error) {
        console.error('Error fetching client projects:', error);
      }
    };

    fetchData();
  }, []);

  const handleBidNow = (postId) => {
    // Set the selected post ID and navigate to BidForm
   setSelectedPostId(postId);
 
   // Log the post ID inside a callback function
   setSelectedPostId(async (newId) => {
     console.log("postid:", newId);
     AsyncStorage.setItem('PostId', JSON.stringify(newId));
     const storedId = await AsyncStorage.getItem('PostId');
     console.log('Post ID stored successfully. Stored ID:', storedId);
     navigation.navigate('Bids');
 
   });
 
   // Navigate to the 'AddBid' screen
   
   };

  // Properties to exclude from display
  const excludedProperties = ['model_file', 'updated_at', 'client_id', 'bid_count'];

  return (
    <ScrollView>
      <View style={styles.container}>
        {clientPostsArray.map((post, index) => (
          <View key={index}
            style={styles.postContainer}>
            {Object.entries(post).map(([key, value]) => (
              !excludedProperties.includes(key) && (
                <View key={key} style={styles.postPropertyContainer}>
                  <Text style={styles.postProperty}>{`${key.charAt(0).toUpperCase() + key.slice(1)}:`}</Text>
                  <Text style={{ color: '#ffffff', textAlign: 'justify', marginLeft: 10, }}>{'\n' + value}</Text>
                </View>
              )
            ))}
            <TouchableOpacity style={styles.containerButton} onPress={() => handleBidNow(post.id)}>
            <Text style={styles.bidNowButton}>
              View Bids
            </Text>
            </TouchableOpacity>
          </View>
        ))}

      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  postContainer: {
    color: '#ffffff',
    borderWidth: 1,
    backgroundColor: '#181818',
    borderRadius: 5,
    overflow: 'hidden',
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  postPropertyContainer: {
    color: '#ffffff',
    flexDirection: 'column',
    marginBottom: 6,
  },
  postProperty: {
    fontSize: 20,
    color: '#8a2be2',
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: -12
  },
  bidNowButton: {
    color: '#ffffff',    
  },
  containerButton: {
    position: 'relative',
    // bottom: 12,
    left: 215,
    backgroundColor: '#8a2be2', // Adjust the button style
    paddingVertical: 11,
    paddingHorizontal:11,
    height:40,
    width:80,
    justifyself:'center',
    borderRadius: 5,
  },
});

export default MyProjects;
