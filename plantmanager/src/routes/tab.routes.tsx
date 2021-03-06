import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Platform } from 'react-native'

import { MyPlants } from '../pages/MyPlants'
import { PlantSelect } from '../pages/PlantSelect'
import colors from '../styles/colors'

const { Navigator, Screen } = createBottomTabNavigator()

const AuthRoutes = () => {
  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: "beside-icon",
        style: {
          height: 88,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0
        }
      }}>
      <Screen name="Nova Planta" component={PlantSelect}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="add-circle-outline" size={size} color={color} />
          )
        }} />
      <Screen name="Minhas Plantas" component={MyPlants}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="format-list-bulleted" size={size} color={color} />
          )
        }} />
    </Navigator>
  )
}

export default AuthRoutes