import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddOffice, Home, Office } from '../components/pages';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Office" component={Office} />
        <Stack.Screen name="AddOffice" component={AddOffice} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}; 