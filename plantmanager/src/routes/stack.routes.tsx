import React, { FC, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from "@react-navigation/stack";

import AuthRoutes from './tab.routes'
import { Confirmation } from '../pages/Confirmation';
import { PlantSave } from '../pages/PlantSave';
import { UserIdentification } from '../pages/UserIdentification';
import { Welcome } from '../pages/Welcome';
import colors from '../styles/colors'

const { Navigator, Screen } = createStackNavigator()

const AppRoutes: FC = () => {
  const [user, setUser] = useState('')

  useEffect(() => {
    AsyncStorage.getItem("@plantmanager:user")
      .then(data => setUser(data || ''))
  }, [])

  return (
    <Navigator headerMode="none" screenOptions={{ cardStyle: { backgroundColor: colors.white } }}>
      {user === '' || !user
        ? (
          <>
            <Screen name="Welcome" component={Welcome} />
            <Screen name="UserIdentification" component={UserIdentification} />
            <Screen name="Confirmation" component={Confirmation} />
            <Screen name="PlantSelect" component={AuthRoutes} />
            <Screen name="PlantSave" component={PlantSave} />
            <Screen name="MyPlants" component={AuthRoutes} />
          </>
        ) : (
          <>
            <Screen name="PlantSelect" component={AuthRoutes} />
            <Screen name="PlantSave" component={PlantSave} />
            <Screen name="MyPlants" component={AuthRoutes} />
          </>
        )}
    </Navigator>
  )

}
export default AppRoutes