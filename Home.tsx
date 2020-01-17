import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FloatingAction } from 'react-native-floating-action'
import Rankings from './Rankings'
import PlayersAware, { PlayersAwareComponentProps } from './PlayersAware'

const actions = [
  {
    text: 'Match',
    name: 'bt_match'
  }
]

function Home({
  players,
  navigation
}: PlayersAwareComponentProps & { navigation: any }) {
  return (
    <View style={styles.container}>
      <Rankings players={players} />
      {players && (
        <FloatingAction
          actions={actions}
          onPressItem={name => {
            switch (name) {
              case 'bt_match':
                navigation.push('SelectPlayers', { players })
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

export default PlayersAware(Home)
