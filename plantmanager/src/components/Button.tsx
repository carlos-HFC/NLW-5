import React from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native"

import colors from "../styles/colors"

interface IButtonProps extends TouchableOpacityProps {
  title: string
}

export const Button = ({ title, ...rest }: IButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={.7} {...rest}>
      <Text style={styles.buttonText}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green,
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },
  buttonText: {
    color: colors.white
  }
})