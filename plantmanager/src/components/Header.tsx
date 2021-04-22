import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/core';
import { Image, StyleSheet, Text, View } from 'react-native'
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import user from "../assets/me.png";
import colors from '../styles/colors'
import fonts from '../styles/fonts';

export const Header = () => {
  const route = useRoute()

  const [username, setUsername] = useState('')

  useEffect(() => {
    AsyncStorage.getItem("@plantmanager:user")
      .then(data => setUsername(data || ''))
  }, [])

  return (
    <View style={styles.container}>
      {route.name === "Nova Planta"
        ? (
          <View>
            <Text style={styles.greeting}>Olá,</Text>
            <Text style={styles.username}>{username}</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.greeting}>Minhas</Text>
            <Text style={styles.username}>Plantinhas</Text>
          </View>
        )}
      <View>
        <Image source={user} style={styles.image} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getStatusBarHeight(),
    width: '100%',
  },
  image: {
    borderRadius: 50,
    height: 56,
    width: 56,
  },
  greeting: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 32,
  },
  username: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 32,
    lineHeight: 40,
  }
})
