import React from 'react';
import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost'
import { StyleSheet } from 'react-native';
import AppLoading from 'expo-app-loading'

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  })

  if (!fontsLoaded) return <AppLoading />

  return (
    <Routes />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  }
})