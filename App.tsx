import React, { useEffect } from 'react'
import { AsyncStorage } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Main from '@src/Main'
import patoApp from '@src/reducers'
import session from '@src/reducers/session'
import { setLoggedInUser } from '@src/actions'

const store = createStore(
  patoApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default function App() {
  useEffect(() => {
    AsyncStorage.getItem('SESSION', (error, result) => {
      if (result) {
        const value = JSON.parse(result)
        store.dispatch(setLoggedInUser(value))
      }
    })
  }, [])
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}
