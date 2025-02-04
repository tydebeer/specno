import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Office, AddOffice } from './components/pages';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Office" component={Office} />
        <Stack.Screen name="AddOffice" component={AddOffice} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
