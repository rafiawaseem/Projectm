import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import profile from './assets/profile.jpg';
import { useNavigation } from '@react-navigation/native';

const Bids = () => {
  const navigation = useNavigation();
  const [postId, setpostId] = useState('');
  const [builderBids, setBuilderBids] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedpostId = await AsyncStorage.getItem('PostId');
        const userObject = JSON.parse(storedpostId);
        setpostId(userObject);

        // Fetch builder's bids based on builderId
        const response = await axios.get(`http://192.168.5.105:8000/api/bid`);
        console.log(response.data);
        const builderPosts = response.data.filter(bids => bids.model_id === userObject && bids.bid_accepted === 0);
        setBuilderBids(builderPosts);
        console.log("bids", builderBids);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [postId]); 

  const handleAcceptBid = async (bidId) => {
    try {
      // Store builderId in async storage
      await AsyncStorage.setItem('AcceptedId', JSON.stringify(bidId));
      console.log(' ID accepted:', bidId);
      const response = await axios.post('http://192.168.5.105:8000/api/bid-proposal/accept',
        { bidProposalId: bidId },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data.message);
      // navigation.navigate('ChatScreen')
      // Additional logic or navigation can be added here
    } catch (error) {
      console.error('Error storing builderId:', error);
    }
  };
  return (
    <ScrollView>
      <View>
        {builderBids.map((bid, index) => (
          <View key={index} style={styles.bidContainer}>
            <View style={styles.rowContainer}>
              <View style={styles.contactImageContainer}>
                <Image
                  source={profile}
                  style={styles.contactImage}
                  onError={(error) => console.error('Image Error:', error)}
                />
              </View>
              <View style={styles.bidDetails}>
                <Text style={styles.bidProperty}>{`Builders ID: ${bid.builder_id}`}</Text>
                <Text style={styles.bidProperty}>{`Bid Price: ${bid.bid_price}`}</Text>
                <Text style={styles.bidProperty}>{`Post ID: ${bid.model_id}`}</Text>
                <Text style={styles.bidProperty}>{`Date: ${bid.created_at}`}</Text>
                <TouchableOpacity onPress={() => handleAcceptBid(bid.id)} style={styles.acceptBidButton}>
                <Text style={styles.acceptBidButtonText}>Accept Bid</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
  },
  contactImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderColor: '#8a2be2',
    borderWidth: 2,
    marginBottom: 5,
    marginTop: 5,
    marginLeft: -37,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    resizeMode: 'cover',
  },
  bidContainer: {
    backgroundColor: '#8a2be2',
    borderRadius: 40,
    marginHorizontal:5,
    marginTop:10,
    padding: 8,
    height: 130, // Adjust the height as needed
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: 'white',
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 1,
    elevation: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bidDetails: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  bidProperty: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 2,
  },
  acceptBidButton: {
    backgroundColor: '#181818', // Add the desired background color
    padding: 5, // Add padding as needed
    borderRadius: 8, // Add borderRadius as needed
    marginTop: 5,
    height:30,
    width:110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptBidButtonText: {
    fontSize: 16,
    color: '#ffffff',}
});


export default Bids;