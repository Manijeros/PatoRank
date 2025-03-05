import React, { useEffect } from 'react'
import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as Font from 'expo-font'

import Home from '@src/screens/Home'
import SelectPlayers from '@src/screens/SelectPlayers'
import AddMatch from '@src/screens/AddMatch'
import NotReady from '@src/screens/NotReady'

import db from '@src/db'
import { PatoRoutesParams } from './types/routes'

const Stack = createStackNavigator<PatoRoutesParams>()

function MainNavigator() {
  return <Stack.Navigator initialRouteName="Rankings">
    <Stack.Screen name="Rankings" component={Home} />
    <Stack.Screen name="SelectPlayers" component={SelectPlayers} />
    <Stack.Screen name="AddMatch" component={AddMatch} />
  </Stack.Navigator>
}

const isConfigured = process.env.EXPO_PUBLIC_CONFIGURED !== undefined

const theme: ReactNavigation.Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#121212',
    text: '#14B795',
  }
}
function Main() {
  return <NavigationContainer theme={theme}>
    {isConfigured ? <MainNavigator /> : <NotReady />}
  </NavigationContainer>
}

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
  db.setup(process.env.EXPO_PUBLIC_BASE_ID!, process.env.EXPO_PUBLIC_BASE_APIKEY!)
}

export default App;
