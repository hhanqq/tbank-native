import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AnonymizationInfoScreen } from './src/screens/AnonymizationInfoScreen';
import { ConfirmParticipationScreen } from './src/screens/ConfirmParticipationScreen';
import { LevelSelectionScreen } from './src/screens/LevelSelectionScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { SuccessScreen } from './src/screens/SuccessScreen';
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { ProgramProvider } from './src/state/ProgramContext';
import { RootStackParamList } from './src/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <ProgramProvider>
          <NavigationContainer theme={navigationTheme}>
            <StatusBar style="dark" />
            <Stack.Navigator
              initialRouteName="Welcome"
              screenOptions={{
                headerShown: false,
                contentStyle: styles.transparent,
                animation: 'slide_from_right',
              }}
            >
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen
                name="LevelSelection"
                component={LevelSelectionScreen}
              />
              <Stack.Screen
                name="ConfirmParticipation"
                component={ConfirmParticipationScreen}
              />
              <Stack.Screen name="Success" component={SuccessScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen
                name="AnonymizationInfo"
                component={AnonymizationInfoScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ProgramProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
});
