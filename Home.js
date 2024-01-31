import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, SafeAreaView, View, StyleSheet, ScrollView, TouchableOpacity, Text, useColorScheme, FlatList, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StatusBar } from 'expo-status-bar';
import box1 from './assets/box1.png';
import bid from './assets/bid.png'
import post from './assets/post.png'
import proposal from './assets/proposal.png'
import { DrawerActions } from '@react-navigation/native';
export default function HomeScreen() {
  const navigation = useNavigation();
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  }
  const handleSignout = async () => {
    // Clear user information from AsyncStorage
    try{
      await AsyncStorage.removeItem('clientId');
      navigation.navigate('Login')
    }catch (error) {
      console.error('Error signing out', error);
    }

  };
  // const openDrawer = () => {
  //   navigation.openDrawer(); // Open the drawer
  // };
  const { height, width } = Dimensions.get('window');
  const icons = [
    <Icon name="share" size={25} color={"#ffffff"} onPress={() => navigation.navigate('Projects')} />,
    <Icon name="edit" size={25} color={"#ffffff"} onPress={() => navigation.navigate('Post Project')} />,
    <Icon name="mail" size={25} color={"#ffffff"} onPress={() => navigation.navigate('ChatList')} />,
  ];
  // array of data which are vertically imported in container bellow the slider
  // const imagecontainer = [
  //   { key: 'item1', description: 'The three bedroom house plan.' , containerImageSource: require('./assets/plot1.jpg') },
  //   { key: 'item2', description: 'The three bedroom house plan', containerImageSource: require('./assets/plot2.jpg') },
  //   { key: 'item3', description: 'The two bedroom house plan', containerImageSource: require('./assets/plot3.png') },
  // ];

  function ListCategory() {
    return (
      <View style={styles.categorycontainer}>
        {icons.map((icon, index) => (
          <TouchableOpacity key={index} style={styles.iconContainer}>{icon}</TouchableOpacity>
        ))}
      </View>
    );
  }
  const EzgifSection = () => {
    return (
      <View style={styles.stepContainer}>
        <View>
        <Image source={box1} style={{ height: 100, width: 100 , marginLeft:30}} />
        </View>
        <View style={{ marginLeft: 15 }}>
        <Text style={styles.stepText}>Step 01:</Text>
        <Text style={styles.stepText}>Make 3D Model</Text>
      </View>
      </View>
    );
  };

  const Step02PostProject = () => {
    return (
      <View style={styles.stepContainer}>
        <View>
        <Image source={post} style={{ height: 100, width: 100 , marginLeft:30}} />
        </View>
        <View>
        <Text style={styles.stepText}>
          Step 02:
        </Text>
        <Text style={styles.stepText}>
          Post Project
        </Text>
        </View>
      </View>
    );
  };

  const Step03ViewProposals = () => {
    return (
      <View style={styles.stepContainer}>
        <View>
        <Image source={proposal} style={{ height: 100, width: 100 , marginLeft:30}} />
        </View>
        <View>
        <Text style={styles.stepText}>
          Step 03:
        </Text>
        <Text style={styles.stepText}>
          View Proposal
        </Text>
        </View>
      </View>
    );
  };

  const Step04AcceptBid = () => {
    return (
      <View style={styles.stepContainer}>
        <View>
        <Image source={bid} style={{ height: 100, width: 100 , marginLeft:30}} />
        </View>
        <View>
        <Text style={styles.stepText}>
          Step 04:
        </Text>
        <Text style={styles.stepText}>
          View Bids
        </Text>
        </View>
      </View>
    );
  };


  return (
    //header of screen //"#8a2be2" purple 
    <SafeAreaView>
      <StatusBar translucent={false} backgroundColor={"#8a2be2"} />
      <View style={styles.Header} >
        <TouchableOpacity onPress={openDrawer}>
          <Icon
            name="sort" size={28} color="#ffffff"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignout}>
          <Icon name="exit-to-app" size={28} color="#ffffff" />
          </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 3 }} style={{ backgroundColor: '#363434'}}>
        <View style={{ backgroundColor: "#8a2be2", height: 120, paddingHorizontal: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
          <Text style={{ fontSize: 30, color: '#ffffff', fontWeight: 'bold' }}>
            Your Vision,
          </Text>
          <Text style={{ fontSize: 30, color: '#ffffff', fontWeight: 'bold' }}>
            Our Expertise!
          </Text>
        </View>
        <ListCategory />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
                  marginTop: -60,
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
        <View style={{ marginTop: -20 }}>
          <Text style={{ fontSize: 25, marginHorizontal: 15, marginTop: -47, color: '#ffffff', fontWeight: 'bold',alignSelf:'center' }} >
          WANT TO CONSTRUCT 
          </Text>
          <Text style={{ fontSize: 25, marginHorizontal: 15, marginTop: -5, color: '#ffffff', fontWeight: 'bold',alignSelf:'center' }} >
          YOUR HOUSE?
          </Text>
          <EzgifSection />
          <Step02PostProject />
          <Step03ViewProposals />
          <Step04AcceptBid />
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
    marginHorizontal: 45,
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
    marginTop: -5,
    color: '#ffffff',
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
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000', // Background color for the steps container
    borderRadius: 11,
    height:170,
    marginBottom:1,
    overflow: 'hidden',
    marginVertical: 10,
    marginHorizontal: 17,
  },
  stepText: {
    padding: 14.5,
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'left',
    marginBottom:-15,
    fontWeight:'bold'
  },
});

// {/* <Button
// title="Go to Details"
// onPress={() => navigation.navigate('Details')}/> */}
