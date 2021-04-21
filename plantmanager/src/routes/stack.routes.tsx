import React, { FC } from 'react'
import { createStackNavigator } from "@react-navigation/stack";

import colors from '../styles/colors'
import { Confirmation } from '../pages/Confirmation';
import { PlantSelect } from '../pages/PlantSelect';
import { UserIdentification } from '../pages/UserIdentification';
import { Welcome } from '../pages/Welcome';

const { Navigator, Screen } = createStackNavigator()

const AppRoutes: FC = () => (
  <Navigator headerMode="none" screenOptions={{ cardStyle: { backgroundColor: colors.white } }}>
    <Screen name="Confirmation" component={Confirmation} />
    <Screen name="PlantSelect" component={PlantSelect} />
    <Screen name="UserIdentification" component={UserIdentification} />
    <Screen name="Welcome" component={Welcome} />
  </Navigator>
)

export default AppRoutes