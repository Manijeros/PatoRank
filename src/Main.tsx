import React, { useEffect } from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import * as Font from 'expo-font'

import Home from '@src/screens/Home'
import SelectPlayers from '@src/screens/SelectPlayers'
import AddMatch from '@src/screens/AddMatch'
import NotReady from '@src/screens/NotReady'

import db from '@src/db'

const MainNavigator = createStackNavigator(
  {
    Rankings: { screen: Home },
    SelectPlayers,
    AddMatch
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#121212'
      },
      headerTintColor: '#14B795'
    }
  }
)

const isConfigured = process.env.CONFIGURED !== undefined

const RootNavigator = createSwitchNavigator(
  {
    NotReady,
    MainNavigator
  },
  {
    initialRouteName: isConfigured ? 'MainNavigator' : 'NotReady'
  }
)

const Main = createAppContainer(RootNavigator)

function App() {
  useEffect(() => {
    Font.loadAsync({
      saira: require('@src/assets/fonts/Saira-Regular.ttf'),
      'saira-bold': require('@src/assets/fonts/Saira-Bold.ttf')
    })
  }, [])

  return <Main />
}

if (isConfigured) {
  db.setup(process.env.BASE_ID!, process.env.BASE_APIKEY!)
}

export default App
