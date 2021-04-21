import React from 'react'
import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text, View } from 'react-native'

import { Button } from '../components/Button'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function Confirmation() {
  const navigation = useNavigation()
  
  function handleMoveOn() {
    navigation.navigate("PlantSelect")
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          😁
        </Text>
        <Text style={styles.title}>
          Prontinho
        </Text>
        <Text style={styles.subtitle}>
          Agora vamos começar a cuidar das suas {'\n'} plantinhas com muito cuidado.
        </Text>
        <View style={styles.footer}>
          <Button title="Começar" onPress={handleMoveOn} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    width: '100%',
  },
  emoji: {
    fontSize: 96
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 28,
    marginTop: 64,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 18,
    marginTop: 5,
    paddingVertical: 20,
    textAlign: 'center',
  },
  footer: {
    marginTop: 40,
    paddingHorizontal: 75,
    width: '100%',
  }
})