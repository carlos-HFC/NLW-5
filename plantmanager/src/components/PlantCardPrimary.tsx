import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { SvgFromUri } from 'react-native-svg'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface IPlantCardPrimaryProps extends RectButtonProps {
  data: {
    name: string
    photo: string
  }
}

export const PlantCardPrimary = ({ data, ...rest }: IPlantCardPrimaryProps) => {
  return (
    <RectButton style={styles.container} {...rest}>
      <SvgFromUri uri={data.photo} height={90} />
      <Text style={styles.text}>{data.name}</Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.shape,
    borderRadius: 20,
    flex: 1,
    margin: 10,
    maxWidth: '45%',
    paddingVertical: 10,
  },
  text: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
    marginVertical: 16
  }
})