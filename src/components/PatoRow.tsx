import React, { PropsWithChildren } from 'react'
import {
  View,
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity
} from 'react-native'

import { PlayerData } from '@src/ranking'
import { randomColor } from '@src/randomColor'
import { patos } from '@src/patitos'
import { playSound } from '@src/sound'

function PatoRow({
  player,
  small = false,
  style,
  patoBackgroundStyle,
  showGradient = true,
  patoIndex,
  children
}: Props) {
  const viewStyle = StyleSheet.flatten<ViewStyle>([
    {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#0A1E1F',
      height: 88,
      margin: 8,
      marginBottom: 0,
      borderWidth: 1,
      borderRadius: 12,
      overflow: 'hidden'
    },
    small && styles.small,
    style
  ])
  return (
    <View
      style={[
        viewStyle,
        {
          borderColor: viewStyle.borderColor || viewStyle.backgroundColor
        }
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => playSound(require('../assets/cuac.mp3'))}
      >
        <View
          style={[
            {
              width: 88,
              height: '100%',
              backgroundColor: randomColor(player.name)
            },
            patoBackgroundStyle
          ]}
        >
          {showGradient && (
            <Image
              style={styles.gradient}
              source={require('../assets/gradient.png')}
            />
          )}
          <Image style={styles.patoOverlay} source={patos[patoIndex]} />
          <Image style={styles.patoOverlay} source={{ uri: player.hat }} />
        </View>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          height: '100%',
          paddingStart: 16,
          justifyContent: 'space-evenly'
        }}
      >
        {children}
      </View>
    </View>
  )
}

type Props = PropsWithChildren<{
  player: PlayerData
  small?: boolean
  style: StyleProp<ViewStyle>
  patoBackgroundStyle?: StyleProp<ViewStyle>
  showGradient?: boolean
  patoIndex: number
}>

export default PatoRow

const styles = StyleSheet.create({
  gradient: {
    width: 88,
    height: 88,
    resizeMode: 'stretch',
    position: 'absolute'
  },
  patoOverlay: {
    width: 132,
    height: '150%',
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 0,
    start: -28
  },
  small: {
    height: 72
  }
})
