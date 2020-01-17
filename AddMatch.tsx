import R from 'ramda'
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { PlayerData, updateRankingWithMatch, NewMatch } from './ranking'
import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native-gesture-handler'
import PlayerBox from './PlayerBox'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Selection {
  [index: string]: number
}

interface SelectPositionProps {
  player: PlayerData
  position: number
  maxPosition: number
  selectedPositions: Selection
  onTap: (item: PlayerData, position: number) => void
}

function SelectPosition({
  player,
  position,
  maxPosition,
  selectedPositions,
  onTap
}: SelectPositionProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
      }}
    >
      <PlayerBox key={player.id} player={player} selected={position} />
      <View
        style={{
          flexDirection: 'row',
          borderRadius: 10,
          backgroundColor: '#EECC22',
          overflow: 'hidden'
        }}
      >
        {R.unfold(
          n => (n > 0 ? [maxPosition - n + 1, n - 1] : false),
          maxPosition
        ).map(n => {
          return (
            <TouchableHighlight
              key={player.id + n}
              onPress={() => onTap(player, n)}
              style={{
                padding: 20,
                backgroundColor:
                  selectedPositions[player.id] == n ? '#CC8800' : undefined
              }}
            >
              <Text
                style={{
                  fontSize: 20
                }}
              >
                {n}
              </Text>
            </TouchableHighlight>
          )
        })}
      </View>
    </View>
  )
}

interface MatchesMessageProps {
  count: number
  onQuit: () => any
}

const MatchesMessage = ({ count, onQuit }: MatchesMessageProps) => {
  const message =
    count === 1
      ? 'No puedes jugar un solo pato!'
      : `No puedes jugar solo ${count} patos!`
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 5
      }}
    >
      <Text style={{ fontSize: 18, flex: 1 }}>{message}</Text>
      <TouchableOpacity
        onPress={onQuit}
        style={{
          backgroundColor: 'lightgreen',
          margin: 10,
          padding: 30,
          width: 120,
          flexDirection: 'column',
          borderRadius: 5
        }}
      >
        <Text
          numberOfLines={2}
          style={{ fontWeight: 'bold', textAlign: 'center' }}
        >
          EL PEOR FINAL
        </Text>
      </TouchableOpacity>
    </View>
  )
}

interface AddMatchProps {
  players: PlayerData[]
}

function AddMatch({
  players,
  navigation
}: AddMatchProps & { navigation: any }) {
  const [selectedPositions, setSelectedPositions] = useState(
    {} as { [index: string]: number }
  )
  const [matchesCount, setMatchesCount] = useState<number>(0)
  const enableSend = checkData(players, selectedPositions)
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{
          flex: 1,
          margin: 0
        }}
      >
        <View
          style={{
            width: '100%'
          }}
        >
          {players.map((item, index) => (
            <SelectPosition
              key={item.id}
              player={item}
              position={index + 1}
              maxPosition={players.length}
              selectedPositions={selectedPositions}
              onTap={(player, position) =>
                setSelectedPositions({
                  ...selectedPositions,
                  [player.id]: position
                })
              }
            />
          ))}
        </View>
      </ScrollView>
      <SafeAreaView style={{ alignContent: 'flex-end', margin: 10 }}>
        {matchesCount > 0 && (
          <MatchesMessage
            count={matchesCount}
            onQuit={() => {
              navigation.navigate('Rankings')
            }}
          />
        )}
        <TouchableHighlight
          underlayColor="#1133AA"
          style={{
            borderRadius: 5,
            backgroundColor: enableSend ? '#2266FF' : '#666666',
            padding: 10
          }}
          onPress={
            enableSend
              ? () => send(selectedPositions, matchesCount, setMatchesCount)
              : undefined
          }
        >
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20
            }}
          >
            Agregar
          </Text>
        </TouchableHighlight>
      </SafeAreaView>
    </View>
  )
}

function checkData(players: PlayerData[], selectedPositions: Selection) {
  if (R.keys(selectedPositions).length != players.length) {
    return false
  }
  let used = R.repeat(0, players.length)
  R.keys(selectedPositions).forEach(
    key => (used[selectedPositions[key] - 1] += 1),
    selectedPositions
  )
  if (used[0] != 1) {
    return false
  }
  if (
    R.reduce((r, n) => (n > 0 && r == 0 ? -1 : n == 0 ? 0 : r), 1, used) == -1
  ) {
    return false
  }
  return true
}
function send(
  selectedPositions: Selection,
  matchesCount: number,
  setMatchesCount: (number) => any
) {
  let match: NewMatch = {
    first: '',
    second: [],
    third: [],
    fourth: []
  }
  ;(R.keys(selectedPositions) as string[]).forEach(key => {
    const position = selectedPositions[key]
    switch (position) {
      case 1:
        match.first = key
        break
      case 2:
        match.second.push(key)
        break
      case 3:
        match.third.push(key)
        break
      case 4:
        match.fourth.push(key)
        break
    }
  })
  updateRankingWithMatch(match)
  setMatchesCount(matchesCount + 1)
}

export default function AddMatchWrapped(props: { navigation: any }) {
  const players = props.navigation.getParam('players')
  return <AddMatch players={players} navigation={props.navigation} />
}
