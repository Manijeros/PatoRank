import React from 'react'
import R from 'ramda'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native'

import { PlayerData } from '../../ranking'
import PatoRow from '../PatoRow'

function SelectPosition({
  player,
  position,
  maxPosition,
  selectedPositions,
  enabled,
  onTap
}: Props) {
  const selectedPosition = selectedPositions[player.id] || 0
  const isSelected = selectedPosition > 0
  const isInPodium = isSelected && selectedPosition <= 3
  const fontSize = 24

  return (
    <PatoRow
      style={[
        isInPodium && styles.podium,
        isSelected && {
          borderColor: podiumColors[selectedPosition - 1]
        }
      ]}
      player={player}
      showGradient={!isSelected}
      patoIndex={((position - 1) % 4) + 1}
      patoBackgroundStyle={
        isSelected && {
          backgroundColor: podiumColors[selectedPosition - 1]
        }
      }
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
      </View>
      <View
        style={{
          flexDirection: 'row'
        }}
      >
        {R.range(1, maxPosition + 1).map(n => {
          const selected = selectedPositions[player.id] === n
          return (
            <TouchableHighlight
              key={n}
              onPress={enabled ? () => onTap(player, n) : undefined}
              underlayColor="#AA5500"
              style={badgeStyle(n, selected, n == maxPosition)}
            >
              <Text style={badgeTextStyle(n, selected)}>
                {positionIcons[n - 1] + ' ' + n}
              </Text>
            </TouchableHighlight>
          )
        })}
      </View>
    </PatoRow>
  )
}

export interface Selection {
  [index: string]: number | undefined
}

interface Props {
  player: PlayerData
  position: number
  maxPosition: number
  selectedPositions: Selection
  enabled: boolean
  onTap: (item: PlayerData, position: number) => void
}

export default SelectPosition

const podiumColors = ['#FFC107', '#80D4FA', '#FF7043', '#14B795']
const positionIcons = ['🏆', '🥈', '🥉', '💩']

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
    flex: 1,
    backgroundColor: 'black',
    height: 32,
    borderRadius: 5,
    marginEnd: 4,
    paddingStart: 9,
    paddingEnd: 9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeText: {
    fontSize: 16,
    fontFamily: 'saira-bold'
  },
  podium: {
    height: 88,
    borderStyle: 'solid'
  }
})
function badgeStyle(n: number, selected: boolean, last: boolean) {
  return [
    styles.badge,
    { backgroundColor: selected ? podiumColors[n - 1] : 'black' },
    last && { marginEnd: 19 }
  ]
}
function badgeTextStyle(n: number, selected: boolean) {
  return [styles.badgeText, { color: selected ? 'black' : podiumColors[n - 1] }]
}
