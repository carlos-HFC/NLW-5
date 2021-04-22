import React from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native"

import colors from "../styles/colors"
import fonts from "../styles/fonts"

interface IButtonProps extends TouchableOpacityProps {
  title: string
}

export const Button = ({ title, ...rest }: IButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, rest.disabled && { opacity: .5 }]} activeOpacity={.7} {...rest}>
      <Text style={styles.buttonText}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.green,
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.heading,
    fontSize: 16,
  }
})