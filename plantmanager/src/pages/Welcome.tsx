import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import watering from '../assets/watering.png'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function Welcome() {
  const navigation = useNavigation()

  const handleStart = () => navigation.navigate('UserIdentification')

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Gerencie {'\n'} suas plantas de {'\n'} forma fácil
      </Text>

      <Image source={watering} style={styles.image} resizeMode="contain" />

      <Text style={styles.subtitle}>
        Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar.
      </Text>

      <TouchableOpacity style={styles.button} activeOpacity={.7} onPress={handleStart}>
        <Text>
          <Feather name="chevron-right" style={styles.buttonIcon} />
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 20
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    color: colors.heading,
    marginTop: 38,
    lineHeight: 34,
    fontFamily: fonts.heading,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green,
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },
  image: {
    height: Dimensions.get('window').width * 0.7,
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 24
  }
})
