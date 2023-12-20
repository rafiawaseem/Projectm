// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import HomeScreen from './Home';
import ChatListScreen from './Chatlist';
import BidDashboard from './PostProj';
import MyProjects from './MyProjects';
import UserProfile from './UserProfile';
import PostProject from './PostProj';
import Signout from './signout';

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#8a2be2' },
      drawerStyle: {
        backgroundColor: 'rgba(54, 52, 52, 0.9)'
         // Set drawer background color with opacity
      },
      drawerLabelStyle: {
        fontSize: 30, // Set the font size for screen names
        color: '#8a2be2', // Set the color for screen names
      },
    }}
  >
      <Drawer.Screen name="Home" component={HomeScreen} options={{headerShown:false, headerStyle:{backgroundColor:'#8a2be2'}}} />
      <Drawer.Screen name="ChatList" component={ChatListScreen} options={{headerStyle:{backgroundColor:'#8a2be2'}}}/>
      <Drawer.Screen name="Post Project" component={PostProject} options={{headerStyle:{backgroundColor:'#8a2be2'}}}/>
      <Drawer.Screen name="Projects" component={MyProjects} options={{headerStyle:{backgroundColor:'#8a2be2'}}}/>
      <Drawer.Screen name='UProfile' component={UserProfile} options={{headerStyle:{backgroundColor:'#8a2be2'}}}/>
      <Drawer.Screen name='Signout' component={Signout} options={{ headerShown: false }}/>
      {/* Add other screens for the drawer */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

// const CustomDrawerContent = ({ navigation }) => {
//   return (
//     <DrawerContentScrollView>
//       <DrawerItem
//         label="Home"
//         onPress={() => navigation.navigate('Home')} // Navigate to HomeScreen when clicked
//       />
      
//       <DrawerItem
//         label="Chat"
//         onPress={() => navigation.navigate('ChatList')} // Navigate to ProfileScreen when clicked
//       />
//       <DrawerItem
//         label="BiddingDashboard"
//         onPress={() => navigation.navigate('Biddash')} // Navigate to ProfileScreen when clicked
//       />
//       {/* Add other DrawerItems for your screens */}
//     </DrawerContentScrollView>
//   );
// };