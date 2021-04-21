import React from 'react'
import LottieView from 'lottie-react-native'
import { StyleSheet, Text, View } from 'react-native'

import loader from '../assets/load.json'

export const Loader = () => {
  return (
    <View style={styles.container}>
      <LottieView source={loader} autoPlay loop style={styles.animation} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  animation: {
    backgroundColor: "transparent",
    height: 200,
    width: 200,
  }
})