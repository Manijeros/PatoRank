import React from 'react'
import R from 'ramda'
import { Text, View, StyleSheet } from 'react-native'

import { PlayerData } from '@src/ranking'
import PatoRow from '@src/components/PatoRow'

function Pato({ player, position }: Props) {
  const isInPodium = position <= 3
  const fontSize = isInPodium ? 24 : 18

  return (
    <PatoRow
      style={[
        isInPodium && styles.podium,
        isInPodium && {
          borderColor: podiumColors[position - 1]
        }
      ]}
      player={player}
      small={!isInPodium}
      patoBackgroundStyle={
        isInPodium && {
          backgroundColor: podiumColors[position - 1]
        }
      }
      showGradient={!isInPodium}
      patoIndex={((position - 1) % 4) + 1}
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
        {R.range(0, 3).map(i => {
          return (
            player.matchesCount[i] > 0 && (
              <View style={styles.badge} key={i}>
                <Text style={[styles.badgeText, { color: '#ffc107' }]}>
                  {thropies[i]} {player.matchesCount[i]}
                </Text>
              </View>
            )
          )
        })}
      </View>
    </PatoRow>
  )
}

interface Props {
  player: PlayerData
  position: number
}

export default Pato

const podiumColors = ['#FFC107', '#80D4FA', '#FF7043']
const thropies = ['🏆', '🥈', '🥉']

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
    borderWidth: 0.5,
    borderStyle: 'solid'
  }
})
