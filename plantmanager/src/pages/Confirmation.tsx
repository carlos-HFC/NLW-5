import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button } from '../components/Button'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function Confirmation() {
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
          <Button title="Começar" />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1,
    padding: 30,
  },
  emoji: {
    fontSize: 96
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginTop: 64,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 5,
    fontSize: 18,
    fontFamily: fonts.text,
    color: colors.heading,
    textAlign: 'center',
    paddingVertical: 20
  },
  footer: {
    width: '100%',
    paddingHorizontal: 75,
    marginTop: 40,
  }
})