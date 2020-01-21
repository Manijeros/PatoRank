import R from 'ramda'
import React, { useState } from 'react'
import { View, Text, ActivityIndicator, Alert } from 'react-native'
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  PlayerData,
  updateRankingWithMatch,
  NewMatch,
  addMatch
} from './ranking'
import PlayerBox from './PlayerBox'
import RoundedButton from './RoundedButton'

interface Selection {
  [index: string]: number
}

interface SelectPositionProps {
  player: PlayerData
  position: number
  maxPosition: number
  selectedPositions: Selection
  enabled: boolean
  onTap: (item: PlayerData, position: number) => void
}

function SelectPosition({
  player,
  position,
  maxPosition,
  selectedPositions,
  enabled,
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
        {R.range(1, maxPosition + 1).map(n => {
          return (
            <TouchableHighlight
              key={player.id + n}
              onPress={enabled ? () => onTap(player, n) : undefined}
              underlayColor="#AA5500"
              style={{
                padding: 20,
                backgroundColor:
                  selectedPositions[player.id] === n ? '#CC8800' : undefined
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
  enabled: boolean
  onQuit: () => any
}

const MatchesMessage = ({ count, enabled, onQuit }: MatchesMessageProps) => {
  const message =
    count === 1
      ? 'No puedes jugar un solo pato!'
      : `No puedes jugar solo ${count} patos!`
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        marginTop: 0
      }}
    >
      <Text style={{ fontSize: 18, flex: 1 }}>{message}</Text>
      <RoundedButton
        onPress={onQuit}
        enabled={enabled}
        underlayColor="#116600"
        style={{
          backgroundColor: '#22AA00',
          padding: 20,
          width: 120
        }}
      >
        <Text
          numberOfLines={2}
          style={{ fontWeight: 'bold', textAlign: 'center', color: 'white' }}
        >
          EL PEOR FINAL
        </Text>
      </RoundedButton>
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
  const [saving, setSaving] = useState(false)
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
              enabled={!saving}
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
      <SafeAreaView style={{ paddingTop: 0 }}>
        {matchesCount > 0 && (
          <MatchesMessage
            count={matchesCount}
            enabled={!enableSend && !saving}
            onQuit={() => {
              navigation.navigate('Rankings')
            }}
          />
        )}
        <RoundedButton
          underlayColor="#1133AA"
          style={{
            backgroundColor: '#2266FF'
          }}
          enabled={enableSend}
          useSaving={[saving, setSaving]}
          onPress={() =>
            send(selectedPositions)
              .then(() => {
                setMatchesCount(matchesCount + 1)
                setSelectedPositions({})
              })
              .catch(e => Alert.alert('Error guardando partida', String(e)))
          }
        >
          <View style={{ height: 30, justifyContent: 'space-around' }}>
            {!saving && (
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
            )}
            {saving && <ActivityIndicator color="white" />}
          </View>
        </RoundedButton>
      </SafeAreaView>
    </View>
  )
}

function checkData(players: PlayerData[], selectedPositions: Selection) {
  if (R.keys(selectedPositions).length !== players.length) {
    return false
  }
  let used = R.repeat(0, players.length)
  R.keys(selectedPositions).forEach(
    key => (used[selectedPositions[key] - 1] += 1),
    selectedPositions
  )
  if (used[0] !== 1) {
    return false
  }
  if (
    R.reduce((r, n) => (n > 0 && r === 0 ? -1 : n === 0 ? 0 : r), 1, used) ===
    -1
  ) {
    return false
  }
  return true
}
async function send(selectedPositions: Selection) {
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
  await addMatch(match)
  await updateRankingWithMatch(match)
}

export default function AddMatchWrapped(props: { navigation: any }) {
  const players = props.navigation.getParam('players')
  return <AddMatch players={players} navigation={props.navigation} />
}
