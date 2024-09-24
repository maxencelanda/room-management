import { StyleSheet, Text, View } from 'react-native';
import Salles from "./components/Salles";
import SalleDetail from "./components/SalleDetail";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Salles" component={Salles} options={{headerShown: false}}/>
        <Stack.Screen name="SalleDetail" component={SalleDetail} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}