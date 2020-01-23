import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Home from './Home'
import SelectPlayers from './SelectPlayers'
import AddMatch from './AddMatch'
import NotReady from './screens/NotReady'

import db from './db'

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

if (isConfigured) {
  db.setup(process.env.BASE_ID!, process.env.BASE_APIKEY!)
}

export default Main
