import React, { useState, useEffect } from 'react'
import { Text, View, Image, StyleSheet, RefreshControl } from 'react-native'

import { FlatList } from 'react-native-gesture-handler'
import { PlayerData } from './ranking'
import { PlayersAwareComponentProps } from './PlayersAware'

interface ItemProps {
  player: PlayerData
  index: number
}

const styles = StyleSheet.create({
  stretch: {
    width: 70,
    height: 70,
    resizeMode: 'stretch'
  }
})

const Item: React.FC<ItemProps> = ({ player, index }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 0.33
      }}
    >
      <Text
        style={{
          padding: 10,
          fontSize: 20 + 10 / index,
          width: 50,
          textAlign: 'center'
        }}
      >
        {index}
      </Text>
      <Text
        style={{
          flexGrow: 1,
          fontWeight: 'bold'
        }}
      >
        {player.name}
      </Text>
      <Image style={styles.stretch} source={{ uri: player.hat }} />
      <Text
        style={{
          width: 60,
          textAlign: 'center'
        }}
      >
        {Number(player.rating).toFixed(0)}
      </Text>
    </View>
  )
}

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
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }
  return (
    <FlatList
      style={{
        width: '100%',
        flex: 1
      }}
      contentInset={{ top: 0, bottom: 85 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true)
            setShouldUpdate!(true)
          }}
        />
      }
      data={players}
      renderItem={({ item, index }) => (
        <Item player={item} index={index + 1} key={item.id} />
      )}
      keyExtractor={player => player.id}
      ListHeaderComponent={
        <Image
          style={{ height: 150, width: '100%', resizeMode: 'cover' }}
          source={{
            uri:
              'https://steamcdn-a.akamaihd.net/steam/apps/312530/capsule_616x353.jpg?t=1493313040'
          }}
        />
      }
    />
  )
}
