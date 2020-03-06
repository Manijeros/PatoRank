import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FloatingAction } from 'react-native-floating-action'
import Rankings from '@src/Rankings'
import PlayersAware, { PlayersAwareComponentProps } from '@src/PlayersAware'
import { NavigationEvents } from 'react-navigation'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { Dispatch } from 'redux'
import { AppState } from '@src/reducers'
import { connect, ConnectedProps } from 'react-redux'
import { setLoggedInUser } from '@src/actions'

function Home({
  players,
  setShouldUpdate,
  isLoggedIn,
  currentUserId,
  onLogout,
  navigation
}: PropsFromRedux & PlayersAwareComponentProps & NavigationStackScreenProps) {
  const actions = isLoggedIn
    ? [
        {
          text: 'Logout',
          name: 'bt_logout',
          color: '#14B795'
        },
        {
          text: 'Match',
          name: 'bt_match',
          color: '#14B795'
        }
      ]
    : [
        {
          text: 'Login',
          name: 'bt_login',
          color: '#14B795'
        }
      ]
  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={() => setShouldUpdate!(true)} />
      <Rankings
        players={players}
        setShouldUpdate={setShouldUpdate}
        currentUserId={currentUserId}
      />
      {players && (
        <FloatingAction
          color="#14B795"
          overlayColor="#00000080"
          actions={actions}
          onPressItem={name => {
            switch (name) {
              case 'bt_login':
                navigation.push('Login')
                break
              case 'bt_match':
                navigation.push('SelectPlayers', { players })
                break
              case 'bt_logout':
                onLogout()
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

const mapStateToProps = (state: AppState) => {
  return {
    isLoggedIn: !!state.session.user,
    currentUserId: state.session.user?.id
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onLogout: () => {
      dispatch(setLoggedInUser())
    }
  }
}
const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(PlayersAware(Home))
