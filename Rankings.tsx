import React, { useState, useEffect } from 'react'
import { Text, View, Image, StyleSheet, RefreshControl } from 'react-native'

import { FlatList } from 'react-native-gesture-handler'
import { PlayerData } from './ranking'
import { PlayersAwareComponentProps } from './PlayersAware'
import { randomColor } from './randomColor'
import { patos } from './patitos'

interface ItemProps {
  player: PlayerData
  index: number
}

const styles = StyleSheet.create({
  gradient: {
    width: 88,
    height: 88,
    resizeMode: 'stretch',
    position: 'absolute'
  },
  patoOverlay: {
    width: 132,
    height: 132,
    resizeMode: 'stretch',
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
  }
})

const Item: React.FC<ItemProps> = ({ player, index }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0A1E1F',
        height: 88,
        margin: 8,
        marginBottom: 0,
        borderRadius: 12,
        overflow: 'hidden'
      }}
    >
      <View
        style={{
          width: 88,
          height: 88,
          backgroundColor: randomColor(player.name)
        }}
      >
        <Image
          style={styles.gradient}
          source={require('./assets/gradient.png')}
        />
        <Image
          style={styles.patoOverlay}
          source={patos[((index - 1) % 4) + 1]}
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
              fontSize: 24
            }}
          >
            {player.name}
          </Text>
          <Text
            style={{
              color: '#80cbc4',
              textAlign: 'center',
              fontSize: 24,
              marginEnd: 16
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
        <Item player={item} index={index + 1} key={item.id} />
      )}
      keyExtractor={player => player.id}
    />
  )
}
