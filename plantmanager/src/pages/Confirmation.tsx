import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/core'
import { StyleSheet, Text, View } from 'react-native'

import { Button } from '../components/Button'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface IConfirmationProps {
  title: string
  subtitle: string
  buttonTitle: string
  icon: 'smile' | 'hug'
  nextScreen: string
}

const emojis = {
  hug: '🤗',
  smile: '😁'
}

export function Confirmation() {
  const navigation = useNavigation()
  const routes = useRoute()
  const { title, subtitle, buttonTitle, icon, nextScreen } = routes.params as IConfirmationProps

  function handleMoveOn() {
    navigation.navigate(nextScreen)
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          {emojis[icon]}
        </Text>
        <Text style={styles.title}>
          {title}
        </Text>
        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
        <View style={styles.footer}>
          <Button title={buttonTitle} onPress={handleMoveOn} />
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