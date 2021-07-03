import React, { useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import {
  KeyboardAvoidingView,
  View,
  Text,
  ActivityIndicator,
  Alert,
  AsyncStorage
} from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import RoundedButton from '@src/RoundedButton'
import { authenticate } from '@src/ranking'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { Auth } from '@src/db'
import { setLoggedInUser } from '@src/actions'
import { Dispatch } from 'redux'
import { AppState } from '@src/reducers'

function FieldBox({
  title,
  value,
  onValueChange,
  secure
}: {
  title: string
  value: string
  onValueChange: (value: string) => void
  secure: boolean
}) {
  return (
    <View
      style={{
        margin: 10,
        marginTop: 0,
        padding: 10,
        paddingTop: 5,
        borderRadius: 5,
        borderWidth: 0.5,
        backgroundColor: 'white'
      }}
    >
      <Text>{title}</Text>
      <TextInput
        secureTextEntry={secure}
        value={value}
        onChangeText={onValueChange}
        style={{
          fontSize: 17,
          marginTop: 5
        }}
      />
    </View>
  )
}

function LoginView({
  onLogin,
  loggingIn
}: {
  onLogin: (username: string, password: string) => void
  loggingIn: boolean
}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const enableLogin = username !== '' && password != ''
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        flex: 1
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#121212'
        }}
      >
        <View
          style={{
            flex: 1,
            paddingTop: 10
          }}
        >
          <Text
            style={{
              color: 'white',
              margin: 20
            }}
          >
            Inicia sesión para cargar resultados:
          </Text>
          <FieldBox
            title="username"
            value={username}
            onValueChange={setUsername}
            secure={false}
          />
          <FieldBox
            title="password"
            value={password}
            onValueChange={setPassword}
            secure={true}
          />
          <RoundedButton
            onPress={() => onLogin(username, password)}
            style={{
              backgroundColor: '#14B795'
            }}
          >
            <View style={{ height: 30, justifyContent: 'space-around' }}>
              {loggingIn ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text
                  style={{
                    color: enableLogin ? 'white' : '#ffffff80',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 20
                  }}
                >
                  Login
                </Text>
              )}
            </View>
          </RoundedButton>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

function Login({
  onLoginSuccess,
  navigation
}: PropsFromRedux & NavigationStackScreenProps) {
  const [loggingIn, setLoggingIn] = useState(false)
  return (
    <LoginView
      onLogin={(username, password) => {
        setLoggingIn(true)
        authenticate(username, password)
          .then(auth => {
            onLoginSuccess(auth)
            navigation.popToTop()
          })
          .catch(error => {
            Alert.alert('Login error', String(error))
          })
          .finally(() => setLoggingIn(false))
      }}
      loggingIn={loggingIn}
    />
  )
}
const mapStateToProps = (state: AppState) => {
  return {}
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onLoginSuccess: (user: Auth) => {
      dispatch(setLoggedInUser(user))
      AsyncStorage.setItem('SESSION', JSON.stringify(user))
    }
  }
}
const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Login)
