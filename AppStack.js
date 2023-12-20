import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home';
import DetailsScreen from './Details';
import Login from './Login';
import Visualize from './builderbids';
import BidDashboard from './PostProj';
import ChatListScreen from './Chatlist';
import ChatScreen from './ChatScreen';
import MyProjects from './MyProjects';
import DrawerNavigator from './DrawerNavigator';
import UserProfile from './UserProfile';
import Buhome from './Buhome';
import Viewbids from './Viewbids';
import BList from './BList';
import Bchat from './Bchat';
import Bprofile from './Bprofile';
import VPlans from './VPlans';
import AddBid from './AddBid';
import PostProject from './PostProj';
import Dashboard from './Dashboard';
import Api from './Api';
import Signout from './signout';
import BuilderBids from './builderbids';
import Bids from './Viewbids';

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerTitleStyle: { color: '#ffffff' }, // Change the color to the desired color
      headerStyle: { backgroundColor: '#8a2be2' }, 
    }}>
      {/* for CLIENT*/}
      {/* <Stack.Screen name="Api" component={Api} /> */}
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Post Project" component={PostProject} options={{ headerShown: true }} />
      <Stack.Screen name="ChatList" component={ChatListScreen} options={{ headerShown: true, headerStyle: { backgroundColor: '#c877ed' }, }} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: true }} />
      {/* <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: true}} /> */}
      <Stack.Screen name="Projects" component={MyProjects} options={{ headerShown: true }} />
      <Stack.Screen name='Bids' component={Bids}/>
      <Stack.Screen name="MHome" component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name='UProfile' component={UserProfile} />
      <Stack.Screen name='Signout' component={Signout} options={{ headerShown: false }}/>
      {/* for BUILDER*/}
      <Stack.Screen name='BHome' component={Buhome} options={{ headerShown: false }}/>
      <Stack.Screen name='ChatHome' component={BList} options={{ headerShown: true }} />
      <Stack.Screen name='Chat' component={Bchat} options={{ headerShown: true }} />
      <Stack.Screen name='BuilderProfile' component={Bprofile} options={{ headerShown: true }} />
      <Stack.Screen name='ViewPlans' component={VPlans} options={{ headerShown: true , headerStyle: { backgroundColor: '#8a2be2' }, }} />
      <Stack.Screen name='AddBid' component={AddBid} options={{ headerShown: true }} />
      <Stack.Screen name='Builderbids' component={BuilderBids} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
}
