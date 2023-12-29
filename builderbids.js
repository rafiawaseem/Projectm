import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import profile from './assets/profile.jpg';

const BuilderBids = () => {
  const [builderId, setBuilderId] = useState('');
  const [builderBids, setBuilderBids] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('builderId');
        const userObject = JSON.parse(storedUserId);
        setBuilderId(userObject);

        // Fetch builder's bids based on builderId
        const response = await axios.get('http://192.168.5.105:8000/api/bid');
        console.log(response.data);
        const builderPosts = response.data.filter(bids => bids.builder_id === userObject);
        setBuilderBids(builderPosts);
        console.log("bids", builderBids);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [builderId]); 
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
    marginLeft: -35,
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
    height: 95, // Adjust the height as needed
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
});

export default BuilderBids;
