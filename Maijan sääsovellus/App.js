import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';

import Weather from './Weather';
import History from './History';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Sää" component={Weather} />
          <Stack.Screen name="Historia" component={History} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}