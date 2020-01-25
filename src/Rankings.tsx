import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, RefreshControl } from 'react-native'

import { FlatList } from 'react-native-gesture-handler'
import { PlayersAwareComponentProps } from '@src/PlayersAware'
import Pato from '@src/components/Ranking/Pato'

export default function Rankings({
  players,
  setShouldUpdate
}: PlayersAwareComponentProps) {
  const [refreshing, setRefreshing] = useState(false)
  useEffect(() => {
    setRefreshing(false)
  }, [players])
  if (!players) {
    return (
      <View
        style={{
          width: '100%',
          flex: 1,
          backgroundColor: '#000000',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text
          style={{
            color: '#80CBC4'
          }}
        >
          Loading...
        </Text>
      </View>
    )
  }
  return (
    <FlatList
      style={{
        backgroundColor: '#000000',
        width: '100%',
        flex: 1
      }}
      contentInset={{ top: 0, bottom: 85 }}
      refreshControl={
        <RefreshControl
          tintColor="#14B795"
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true)
            setShouldUpdate!(true)
          }}
        />
      }
      data={players}
      renderItem={({ item, index }) => (
        <Pato player={item} position={index + 1} key={item.id} />
      )}
      keyExtractor={player => player.id}
    />
  )
}
