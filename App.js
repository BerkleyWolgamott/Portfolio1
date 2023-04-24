import {NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import MainMenuScreen from "./screens/MainMenuScreen.js"
import ConfirmationScreen from "./screens/ConfirmationScreen.js"

import FontAwesome from '@expo/vector-icons/FontAwesome'

async function cacheFonts(fonts){
  return fonts.map(async (font) => await Font.loadAsync(font))
}

const Stack = createNativeStackNavigator();

export default function App() {
  cacheFonts([FontAwesome.font])
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={MainMenuScreen}/>
        <Stack.Screen name="Checkout" component={ConfirmationScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
