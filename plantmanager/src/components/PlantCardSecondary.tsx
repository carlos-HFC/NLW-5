import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { SvgFromUri } from 'react-native-svg'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface IPlantCardSecondaryProps extends RectButtonProps {
  data: {
    name: string
    photo: string
    hour: string
  }
}

export const PlantCardSecondary = ({ data, ...rest }: IPlantCardSecondaryProps) => {
  return (
    <RectButton style={styles.container} {...rest}>
      <SvgFromUri uri={data.photo} height={50} width={50} />
      <Text style={styles.title}>
        {data.name}
      </Text>

      <View style={styles.details}>
        <Text style={styles.timeLabel}>
          Regar às
        </Text>
        <Text style={styles.time}>
          {data.hour}
        </Text>
      </View>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.shape,
    borderRadius: 20,
    flexDirection: "row",
    marginVertical: 4,
    paddingHorizontal: 26,
    paddingVertical: 20,
    width: "100%",
  },
  title: {
    color: colors.heading,
    flex: 1,
    fontFamily: fonts.heading,
    fontSize: 17,
    marginLeft: 25,
  },
  details: {
    alignItems: 'flex-end',
    marginHorizontal: 20,
    marginRight: 16,
  },
  timeLabel: {
    color: colors.body_light,
    fontFamily: fonts.text,
    fontSize: 16,
  },
  time: {
    color: colors.body_dark,
    fontFamily: fonts.heading,
    fontSize: 16,
  }
})