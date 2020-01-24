import React from 'react'
import { Text, View, Image, StyleSheet, RefreshControl } from 'react-native'

import { PlayerData } from '../../ranking'
import { randomColor } from '../../randomColor'
import { patos } from '../../patitos'

function Pato({ player, position }: Props) {
  const isInPodium = position <= 3
  const fontSize = isInPodium ? 24 : 18

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0A1E1F',
        height: 72,
        margin: 8,
        marginBottom: 0,
        borderRadius: 12,
        overflow: 'hidden',
        ...(isInPodium && styles.podium),
        ...(position === 1 && styles.firstPlace),
        ...(position === 2 && styles.secondPlace),
        ...(position === 3 && styles.thirdPlace)
      }}
    >
      <View
        style={{
          width: 88,
          height: '100%',
          backgroundColor:
            position === 1
              ? FIRST_PLACE_COLOR
              : position === 2
              ? SECOND_PLACE_COLOR
              : position === 3
              ? THIRD_PLACE_COLOR
              : randomColor(player.name)
        }}
      >
        {position > 3 && (
          <Image
            style={styles.gradient}
            source={require('../../assets/gradient.png')}
          />
        )}
        <Image
          style={styles.patoOverlay}
          source={patos[((position - 1) % 4) + 1]}
        />
        <Image style={styles.patoOverlay} source={{ uri: player.hat }} />
      </View>
      <View
        style={{
          flex: 1,
          height: '100%',
          paddingStart: 16,
          justifyContent: 'space-evenly'
        }}
      >
        <View
          style={{
            flexDirection: 'row'
          }}
        >
          <Text
            style={{
              flexGrow: 1,
              color: 'white',
              fontWeight: 'bold',
              fontSize,
              fontFamily: 'saira-bold'
            }}
          >
            {player.name}
          </Text>
          <Text
            style={{
              color: '#80cbc4',
              textAlign: 'center',
              fontSize,
              marginEnd: 16,
              fontFamily: 'saira'
            }}
          >
            {Number(player.rating).toFixed(0)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row'
          }}
        >
          <View style={styles.badge}>
            <Text style={[styles.badgeText, { color: '#ffc107' }]}>🏆 ###</Text>
          </View>
          <View style={styles.badge}>
            <Text style={[styles.badgeText, { color: '#81d4fa' }]}>🥈 ###</Text>
          </View>
          <View style={styles.badge}>
            <Text style={[styles.badgeText, { color: '#ff7043' }]}>🥉 ###</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

interface Props {
  player: PlayerData
  position: number
}

export default Pato

const FIRST_PLACE_COLOR = '#FFC107'
const SECOND_PLACE_COLOR = '#80D4FA'
const THIRD_PLACE_COLOR = '#FF7043'

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
  badge: {
    backgroundColor: 'black',
    height: 24,
    borderRadius: 5,
    marginEnd: 4,
    paddingStart: 9,
    paddingEnd: 9,
    justifyContent: 'center'
  },
  badgeText: {
    fontSize: 12
  },
  podium: {
    height: 88,
    borderWidth: 1,
    borderStyle: 'solid'
  },
  firstPlace: {
    borderColor: FIRST_PLACE_COLOR
  },
  secondPlace: {
    borderColor: SECOND_PLACE_COLOR
  },
  thirdPlace: {
    borderColor: THIRD_PLACE_COLOR
  }
})
