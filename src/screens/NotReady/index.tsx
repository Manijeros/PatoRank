import React from 'react'
import { View, Text } from 'react-native'

import styles from './styles'

export default function NotReady() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sabés lo que tenías que hacer ahí?</Text>
      <View>
        <Text style={styles.item}>{'\u2022'} Copiá el .env.example a .env</Text>
        <Text style={styles.item}>
          {'\u2022'} Modificá los valores según tu configuración local
        </Text>
        <Text style={styles.item}>
          {'\u2022'} Volve a arrancar la app desde cero con yarn start --clear
        </Text>
      </View>
    </View>
  )
}
