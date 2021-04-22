import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/core'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'

import { Button } from '../components/Button'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function UserIdentification() {
  const navigation = useNavigation()

  const [name, setName] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  async function handleSubmit() {
    if (!name) return Alert.alert("Me diga como te chamar 😢")

    try {
      await AsyncStorage.setItem('@plantmanager:user', name)
      navigation.navigate("Confirmation", {
        title: "Prontinho",
        subtitle: "Agora vamos começar a cuidar das suas \n plantinhas com muito cuidado",
        buttonTitle: "Começar",
        icon: "smile",
        nextScreen: "PlantSelect",
      })
    } catch (error) {
      Alert.alert("Não foi possível salvar o seu nome 😢")
    }
  }

  function handleBlur() {
    setIsFocused(false)
    setIsFilled(!!name)
  }

  function handleFocus() {
    setIsFocused(true)
  }

  function handleChange(value: string) {
    setIsFilled(!!value)
    setName(value)
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>
                  {!isFilled ? '😃' : '😄'}
                </Text>
                <Text style={styles.title}>
                  Como podemos {'\n'} chamar você?
                </Text>
              </View>

              <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green }
                ]}
                placeholder="Digite um nome"
                value={name} onChangeText={handleChange}
                onBlur={handleBlur} onFocus={handleFocus} />

              <View style={styles.footer}>
                <Button title="Confirmar" onPress={handleSubmit} disabled={!name} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
    width: "100%",
  },
  content: {
    flex: 1,
    width: '100%',
  },
  form: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
  },
  emoji: {
    fontSize: 36
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center',
    width: '100%',
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 24,
    lineHeight: 32,
    marginTop: 24,
    textAlign: 'center',
  },
  footer: {
    marginTop: 40,
    paddingHorizontal: 20,
    width: "100%",
  },
  header: {
    alignItems: 'center',
  }
})