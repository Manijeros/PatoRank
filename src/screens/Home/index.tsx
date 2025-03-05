import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { FloatingAction } from 'react-native-floating-action'
import Rankings from '@src/Rankings'
import createPlayersAware, { PlayersAwareComponentProps } from '@src/PlayersAware'
import { useFocusEffect } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { PatoRoutesParams } from '@src/types/routes'
import { rebuildRanking } from '@src/ranking'

const actions = [
  {
    text: 'Match',
    name: 'bt_match',
    color: '#14B795'
  },
  {
    text: 'Rebuild ranking',
    name: 'bt_rebuild',
    color: '#804040'
  }
]

function Home({
  players,
  setShouldUpdate,
  navigation
}: PlayersAwareComponentProps & StackScreenProps<PatoRoutesParams, "Rankings">) {
  useFocusEffect(useCallback(() => {
    setShouldUpdate?.(true)
  }, [setShouldUpdate]))
  return (
    <View style={styles.container}>
      <Rankings players={players} setShouldUpdate={setShouldUpdate} />
      {players && (
        <FloatingAction
          color="#14B795"
          overlayColor="#00000080"
          actions={actions}
          onPressItem={name => {
            switch (name) {
              case 'bt_match':
                navigation.push('SelectPlayers', { players })
                break
              case 'bt_rebuild':
                rebuildRanking().then(()=>setShouldUpdate?.(true))
                break
            }
          }}
        />
      )}
    </View>
  )
}

Home.navigationOptions = {
  title: '#aca-se-duck-game-pato Ranking'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default createPlayersAware(Home)
