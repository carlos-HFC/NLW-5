import React, { useState } from 'react'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { useNavigation, useRoute } from '@react-navigation/core'
import { format, isBefore } from 'date-fns'
import { Alert, Image, Platform, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { SvgFromUri } from 'react-native-svg'

import { Button } from '../components/Button'
import { plantLoad, PlantProps, plantSave } from '../libs/storage'
import waterdrop from '../assets/waterdrop.png'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface Params {
  plant: PlantProps
}

export function PlantSave() {
  const navigation = useNavigation()
  const route = useRoute()
  const { plant } = route.params as Params

  const [selectedDateTime, setSelectedDateTime] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios')

  function handleChangeTime(e: Event, dateTime?: Date) {
    if (Platform.OS === 'android') {
      setShowDatePicker(showDatePicker => !showDatePicker)
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date())
      return Alert.alert("Escolha uma hora no futuro! ⏰")
    } else {
      setSelectedDateTime(dateTime as Date)
    }
  }

  async function handleSave() {
    try {
      await plantSave({
        ...plant,
        dateTimeNotification: selectedDateTime
      })

      navigation.navigate("Confirmation", {
        title: "Tudo certo",
        subtitle: "Fique tranquilo que sempre vamos \n lembrar você de cuidar da sua plantinha \n com bastante amor",
        buttonTitle: "Muito obrigado :D",
        icon: "hug",
        nextScreen: "MyPlants",
      })
    } catch (error) {
      Alert.alert("Não foi possível salvar 😢")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri uri={plant.photo} height={180} />
        <Text style={styles.plantName}>{plant.name}</Text>
        <Text style={styles.plantAbout}>{plant.about}</Text>
      </View>

      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image source={waterdrop} style={styles.tipImage} />
          <Text style={styles.tipText}>{plant.water_tips}</Text>
        </View>

        <Text style={styles.alertLabel}>
          Escolha o melhor horário para ser lembrado:
        </Text>

        {showDatePicker && <DateTimePicker value={selectedDateTime} mode="time" onChange={handleChangeTime} />}

        {Platform.OS === 'android' && (
          <TouchableOpacity style={styles.dateTimePickerButton} onPress={() => setShowDatePicker(!showDatePicker)}>
            <Text style={styles.dateTimePickerText}>
              {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
            </Text>
          </TouchableOpacity>
        )}

        <Button title="Cadastrar planta" onPress={handleSave} />

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.shape,
    flex: 1,
    justifyContent: 'space-between',
  },
  plantInfo: {
    alignItems: 'center',
    backgroundColor: colors.shape,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  plantName: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 24,
    marginTop: 15,
  },
  plantAbout: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 17,
    marginTop: 10,
    textAlign: "center",
  },
  controller: {
    backgroundColor: colors.white,
    paddingBottom: getBottomSpace() || 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  tipContainer: {
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    borderRadius: 20,
    bottom: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    position: "relative",
  },
  tipImage: {
    height: 56,
    width: 56,
  },
  tipText: {
    color: colors.blue,
    flex: 1,
    fontFamily: fonts.text,
    fontSize: 15,
    marginLeft: 20,
    textAlign: "justify",
  },
  alertLabel: {
    color: colors.heading,
    fontFamily: fonts.complement,
    fontSize: 13,
    marginBottom: 5,
    textAlign: "center",
  },
  dateTimePickerButton: {
    alignItems: 'center',
    paddingVertical: 40,
    width: "100%",
  },
  dateTimePickerText: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 24,
  }
})
