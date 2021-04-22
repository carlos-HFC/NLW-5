import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'

import { EnvButton } from '../components/EnvButton'
import { Header } from '../components/Header'
import { Loader } from '../components/Loader'
import { PlantCardPrimary } from '../components/PlantCardPrimary'
import { PlantProps } from '../libs/storage'
import api from '../services/api'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface EnvironmentsProps {
  key: string
  title: string
}

export function PlantSelect() {
  const navigation = useNavigation()

  const [plants, setPlants] = useState<PlantProps[]>([])
  const [environments, setEnvironments] = useState<EnvironmentsProps[]>([])
  const [environmentSelected, setEnvironmentSelected] = useState("")
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    api.get("/plants_environments")
      .then(response => {
        setEnvironments([{ key: "all", title: "Todos" }, ...response.data])
        setEnvironmentSelected("all")
      })
  }, [])

  useEffect(() => {
    fetchPlants()
  }, [])

  async function fetchPlants() {
    const response = await api.get(`/plants?_page=${page}&_limit=8`)

    if (!response.data) return setLoading(false)

    if (page > 1) {
      setPlants(plants => [...plants, ...response.data])
      setFilteredPlants(filteredPlants => [...filteredPlants, ...response.data])
    } else {
      setPlants(response.data)
      setFilteredPlants(response.data)
    }

    setLoading(false)
    setLoadingMore(false)
  }

  function handleFetchMore(distance: number) {
    if (distance < 1) return

    setLoadingMore(true)
    setPage(page => page + 1)

    fetchPlants()
  }

  function handleEnvironmentSelected(environment: string) {
    setEnvironmentSelected(environment)

    if (environment === "all") return setFilteredPlants(plants)

    const filtered = plants.filter(plant => plant.environments.includes(environment))

    setFilteredPlants(filtered)
  }

  function handlePlantSelect(plant: PlantProps) {
    navigation.navigate("PlantSave", { plant })
  }

  if (loading) return <Loader />

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList data={environments} keyExtractor={item => item.key} horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.envList}
          renderItem={({ item }) => (
            <EnvButton title={item.title} key={item.key} active={item.key === environmentSelected}
              onPress={() => handleEnvironmentSelected(item.key)} />
          )}
        />
      </View>

      <View style={styles.plants}>
        <FlatList data={filteredPlants} keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
          renderItem={({ item }) => (
            <PlantCardPrimary data={item} onPress={() => handlePlantSelect(item)} />
          )}
          ListFooterComponent={loadingMore ? <ActivityIndicator color={colors.green} /> : <></>}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  header: {
    padding: 32
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 17,
    lineHeight: 23,
    marginTop: 40,
  },
  subtitle: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 23,
  },
  envList: {
    height: 40,
    justifyContent: 'center',
    margin: 32,
    paddingBottom: 5,
  },
  plants: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 22,
  }
})