import React from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Asset } from 'expo-asset';

const ChatListScreen = () => {
  const data = [
    { key: 'item1', title: 'Builder 1', description: 'Tap to chat.', imageSource: require('./assets/profile.jpg') },
    { key: 'item2', title: 'Builder 2', description: 'Tap to chat.', imageSource: require('./assets/profile.jpg') },
    { key: 'item3', title: 'Builder 3', description: 'Tap to chat.', imageSource: require('./assets/profile.jpg') },
    // Add more items here
  ];
  const getImageUri = (asset) => Asset.fromModule(asset).uri;

  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', { contact: item })}>
      <View style={styles.itemContainer}>
        <Image source={{uri: getImageUri(item.imageSource)}} style={styles.itemImage} />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.key}
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
  },
  itemDescription: {
    fontSize: 16,
    color:'#ffffff',

  },
});

export default ChatListScreen;
