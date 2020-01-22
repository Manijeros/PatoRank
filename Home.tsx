import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FloatingAction } from 'react-native-floating-action'
import Rankings from './Rankings'
import PlayersAware, { PlayersAwareComponentProps } from './PlayersAware'
import { NavigationEvents } from 'react-navigation'
import { NavigationStackScreenProps } from 'react-navigation-stack'

const actions = [
  {
    text: 'Match',
    name: 'bt_match'
  }
]

function Home({
  players,
  setShouldUpdate,
  navigation
}: PlayersAwareComponentProps & NavigationStackScreenProps) {
  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={() => setShouldUpdate!(true)} />
      <Rankings players={players} setShouldUpdate={setShouldUpdate} />
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
