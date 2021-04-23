import React from 'react'
import { Feather } from '@expo/vector-icons'
import { Animated, StyleSheet, Text, View } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { SvgFromUri } from 'react-native-svg'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface IPlantCardSecondaryProps extends RectButtonProps {
  data: {
    name: string
    photo: string
    hour: string
  }
  handleRemove: () => void
}

export const PlantCardSecondary = ({ data, handleRemove, ...rest }: IPlantCardSecondaryProps) => {
  return (
    <Swipeable overshootRight={false} containerStyle={{}} renderRightActions={() => (
      <Animated.View style={{ position: "relative", left: 80, width: 70 }}>
        <View>
          <RectButton style={styles.buttonRemove} onPress={handleRemove}>
            <Feather name="trash" size={24} color={colors.white} />
          </RectButton>
        </View>
      </Animated.View>
    )}>
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
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.shape,
    borderRadius: 20,
    flexDirection: "row",
    height: 80,
    marginVertical: 4,
    padding: 28,
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
  },
  buttonRemove: {
    alignItems: 'flex-end',
    backgroundColor: colors.red,
    borderRadius: 20,
    height: 80,
    justifyContent: 'center',
    marginVertical: 4,
    paddingRight: 26,
    width: 150,
  }
})