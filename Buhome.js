import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Button, SafeAreaView, View, StyleSheet, ScrollView, TouchableOpacity, Text, useColorScheme, FlatList, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StatusBar } from 'expo-status-bar';

export default function Buhome() {
  const navigation = useNavigation();
  const { height, width } = Dimensions.get('window');
  const icons = [
    <Icon name="attach-money" size={25} color={"#ffffff"} onPress={() => navigation.navigate('ViewPlans')} />,
    <Icon name="dns" size={25} color={"#ffffff"} onPress={() => navigation.navigate('Builderbids')} />,
    <Icon name="mail" size={25} color={"#ffffff"} onPress={() => navigation.navigate('ChatHome')} />,
  ];
  const handleSignout = async () => {
    // Clear user information from AsyncStorage
    try{
      await AsyncStorage.removeItem('builderId');
      navigation.navigate('Login')
    }catch (error) {
      console.error('Error signing out', error);
    }

  };
  // array of data which are vertically imported in container bellow the slider
  const icontainer = [
    { key: 'item1', description: 'The three bedroom house plan.' , containerImageSource: require('./assets/plot1.jpg') },
    { key: 'item2', description: 'The three bedroom house plan', containerImageSource: require('./assets/plot2.jpg') },
    { key: 'item3', description: 'The two bedroom house plan', containerImageSource: require('./assets/plot3.png') },
  ];
  
  function List() {
    return (                                                                                                                                                                                                                                              
      <View style={styles.categorycontainer}>
        {icons.map((icon, index) => (
          <TouchableOpacity key={index} style={styles.iconContainer}>{icon}</TouchableOpacity>
        ))}
      </View>
    );
  }
  return (
    //header of screen //"#8a2be2" purple 
    <SafeAreaView>
      <StatusBar translucent={false} backgroundColor={"#8a2be2"} /> 
      <View style={styles.Header} > 
        <TouchableOpacity onPress={''}>
          <Icon
            name="sort" size={28} color="#ffffff"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignout}>
        <Icon
          name="notifications-none" size={28} color="#ffffff"
        />
        </TouchableOpacity>
        
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'#363434' }}>
        <View style={{ backgroundColor: "#8a2be2", height: 135, paddingHorizontal: 20 , borderBottomLeftRadius:20, borderBottomRightRadius:20 }}>
          <Text style={{ fontSize: 30, color: '#ffffff', fontWeight: 'bold' }}>
          Estihome Bidder                                                                                                                                                                                                                                                                                        
          </Text>
          <Text style={{ fontSize: 25, color: '#ffffff', }}>
          Building Trust, Building Excellence
          </Text>
        </View>
        <List />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'  }}>
          <FlatList
            data={[
              { key: 'item1', title: 'Item 1', imageSource: require('./assets/img1.jpg') },
              { key: 'item2', title: 'Item 2', imageSource: require('./assets/3dr.png') },
              { key: 'item3', title: 'Item 3', imageSource: require('./assets/BID2R.png') },
              { key: 'item4', title: 'Item 4', imageSource: require('./assets/biding.png') },
            ]}
            showsHorizontalScrollIndicator={false}
            horizontal
            pagingEnabled
            renderItem={({ item, index }) => (
              <View
                style={{
                  marginTop:-60,
                  width: width,
                  height: height / 2,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Image
                  source={item.imageSource}
                  style={{
                    width: '90%',
                    height: '55%',
                    borderRadius: 11
                  }}
                />
              </View>
            )}
          />
        </View>
        <View style={{marginTop:-20}}>
          <Text style={{fontSize: 30,marginHorizontal: 15,marginTop:-47, color: '#ffffff', fontWeight: 'bold'}} >
            View Projects:
          </Text>
        {icontainer.map((item) => (
        <View style={styles.container} key={item.key}>
          <Image source={item.containerImageSource} style={styles.containerImage} />
          <Text style={styles.containerDescription}>{item.description}</Text>
          <TouchableOpacity style={styles.containerButton}>
            <Text style={styles.buttonText}>Bid Now</Text>
            </TouchableOpacity>
            </View>
             ))}
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#8a2be2",
  },
  categorycontainer: {
    marginTop: 48,
    marginHorizontal: 60,
    marginTop: -20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: '#181818',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6
  },
  container: {
    marginVertical: 10,
    marginHorizontal: 15,
    backgroundColor: '#181818', // Adjust the background color as needed
    borderRadius: 5,
    overflow: 'hidden', // Ensure the image doesn't overflow the container
  },

  // Image style (takes the whole space)
  containerImage: {
    width: '100%',
    height: 175, 
    // Adjust the height as needed
    aspectRatio: 16 / 9, // You can adjust the aspect ratio to your preference
    marginVertical: 10, // Adjust the vertical margin
    marginHorizontal: 10,
  },

  // Description style (below the image)
  containerDescription: {
    padding: 14.5,
    fontSize: 18,
    marginTop:-5,
    color:'#ffffff',
    textAlign: 'left', // You can adjust the text alignment
  },

  // Button style (in the corner)
  containerButton: {
    position: 'absolute',
    bottom: 12,
    right: 15,
    backgroundColor: '#8a2be2', // Adjust the button style
    padding: 8,
    borderRadius: 5,
  },

  // Button text style
  buttonText: {
    color: '#ffffff', // Adjust the text color
  },
});