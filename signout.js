import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Signout() {
  const navigation = useNavigation();

  const handleSignout = async () => {
    // Clear user information from AsyncStorage
    try{
      await AsyncStorage.removeItem('clientId');
      navigation.navigate('Login')
    }catch (error) {
      console.error('Error signing out', error);
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Out</Text>
      <Button style={{color:'#8a2be2'}} title="Sign Out" onPress={handleSignout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});
