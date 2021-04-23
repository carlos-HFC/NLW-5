import React, { useEffect, useState } from 'react'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Alert, FlatList, Image, StyleSheet, Text, View } from 'react-native'

import { Header } from '../components/Header'
import { Loader } from '../components/Loader'
import { PlantCardSecondary } from '../components/PlantCardSecondary'
import { plantLoad, PlantProps, plantRemove } from '../libs/storage'
import waterdrop from '../assets/waterdrop.png'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([])
  const [loading, setLoading] = useState(true)
  const [nextWaterd, setNextWaterd] = useState('')

  useEffect(() => {
    loadStorageData()
  }, [])

  async function loadStorageData() {
    const plantsStoraged = await plantLoad()

    if (!plantsStoraged.length) {
      setNextWaterd("Você não tem plantas para regar")
      return setLoading(false)
    }

    const nextTime = formatDistance(
      new Date(plantsStoraged[0].dateTimeNotification).getTime(),
      new Date().getTime(),
      { locale: ptBR }
    )

    setNextWaterd(`Regue sua ${plantsStoraged[0].name} em ${nextTime}.`)

    setMyPlants(plantsStoraged)
    setLoading(false)
  }

  function handleRemove(plant: PlantProps) {
    Alert.alert(
      "Deletar",
      `Deseja mesmo deletar sua ${plant.name}?`,
      [
        {
          text: "Cancelar",
          style: 'cancel',
        },
        {
          text: "Deletar",
          onPress: async () => {
            try {
              await plantRemove(plant.id)
              setMyPlants(myPlants => myPlants.filter(itens => itens.id !== plant.id))
            } catch (error) {
              Alert.alert("Não foi possível remover!")
            }
          }
        },
      ],
    )
  }

  if (loading) return <Loader />

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image source={waterdrop} style={styles.spotlightImage} />
        <Text style={styles.spotlightText}>
          {nextWaterd}
        </Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>
        <FlatList data={myPlants}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecondary data={item} handleRemove={() => handleRemove(item)} />
          )} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingTop: 32,
  },
  spotlight: {
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    borderRadius: 20,
    flexDirection: 'row',
    height: 90,
    justifyContent: 'space-between',
    marginVertical: 40,
    paddingHorizontal: 20,
  },
  spotlightImage: {
    height: 56,
    width: 56,
  },
  spotlightText: {
    color: colors.blue,
    flex: 1,
    paddingHorizontal: 20,
    textAlign: "justify"
  },
  plants: {
    flex: 1,
    width: "100%"
  },
  plantsTitle: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 24,
    marginBottom: 16,
  },
})
