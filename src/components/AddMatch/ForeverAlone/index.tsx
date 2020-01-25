import React from 'react'
import { Text, View, Image } from 'react-native'

import styles from './styles'

function ForeverAlone() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('@src/assets/error.png')} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Forever alone</Text>
        <Text style={styles.text}>Elegí 2 o más pateres para continuar</Text>
      </View>
    </View>
  )
}

export default ForeverAlone
