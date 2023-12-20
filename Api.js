import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Api() {
  const [apiData, setApiData] = useState([]); // State to store the fetched data

  useEffect(() => {
    axios.get('http://192.168.243.238:8000/api/client')
      .then((response) => {
        console.log('Data:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  

  return (
    <View>
      <Text>API Data for User:</Text>
      
        
    </View>
  );
}
