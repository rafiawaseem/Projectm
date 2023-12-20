import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import AppStack from './AppStack'; // Import your AppStack component
import DrawerNavigator from './DrawerNavigator';

export default function App() {
  return (
    <NavigationContainer theme={{ colors: { background: '#363434' } }}>
      <AppStack /> 
    </NavigationContainer>
    
  );
}
