import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Buhome from './Buhome';
import BList from './BList';
import Bchat from './Bchat';
import Bprofile from './Bprofile';
import VPlans from './VPlans';
import BuilderBids from './builderbids';
import AddBid from './AddBid';
import AcceptedBids from './AcceptedBids';

const Drawer = createDrawerNavigator();
export default BuilderDrawer = () => {
  return (
    <Drawer.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#8a2be2' },
      drawerStyle: {
        backgroundColor: 'rgba(54, 52, 52, 0.9)'
         // Set drawer background color with opacity
      },
      drawerLabelStyle: {
        fontSize: 25, // Set the font size for screen names
        color: '#8a2be2', // Set the color for screen names
      },
    }}
  >
      <Drawer.Screen name="BHome" component={Buhome} options={{headerShown:false, headerStyle:{backgroundColor:'#8a2be2'}}} />
      <Drawer.Screen name='My Bids' component={BuilderBids} options={{headerStyle:{backgroundColor:'#8a2be2'}}}/>
      <Drawer.Screen name='AddBid' component={AddBid} options={{headerStyle:{backgroundColor:'#8a2be2'}}}/>
      <Drawer.Screen name='Accepted Bids' component={AcceptedBids} options={{headerStyle:{backgroundColor:'#8a2be2'}}}/>
      <Drawer.Screen name="ChatHome" component={BList} options={{headerStyle:{backgroundColor:'#8a2be2'}}}/>
      <Drawer.Screen name="Chat" component={Bchat} options={{headerStyle:{backgroundColor:'#8a2be2'}}}/>
      <Drawer.Screen name="BuilderProfile" component={Bprofile} options={{headerStyle:{backgroundColor:'#8a2be2'}}}/>
      <Drawer.Screen name='ViewPlans' component={VPlans} options={{headerStyle:{backgroundColor:'#8a2be2'}}}/>
      

      {/* Add other screens for the drawer */}
    </Drawer.Navigator>
  );
};