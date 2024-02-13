
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import React from 'react';
import Home from './components/screens/Home';   
import About from './components/screens/About';
import Game from './components/screens/Game'
import Highscore from './components/screens/Highscore';
import Settings from './components/screens/Settings';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>  
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} 
          options={{
            headerStyle: {
              backgroundColor: '#4ac0fd', 
            },
            headerTintColor: '#fff',  
          }} 
        
        /> 
        <Stack.Screen name="Game" component={Game}
          options={{
            headerStyle: {
              backgroundColor: '#4ac0fd', 
            },
            headerTintColor: '#fff',  
          }} 
         /> 
        <Stack.Screen name="About" component={About}
          options={{
            headerStyle: {
              backgroundColor: '#4ac0fd', 
            },
            headerTintColor: '#fff',  
          }} 
         />
        <Stack.Screen name="Highscore" component={Highscore}
          options={{
            headerStyle: {
              backgroundColor: '#4ac0fd', 
            },
            headerTintColor: '#fff',  
          }} 
         />
        <Stack.Screen name="Settings" component={Settings}
          options={{
            headerStyle: {
              backgroundColor: '#4ac0fd', 
            },
            headerTintColor: '#fff',  
          }} 
         />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

