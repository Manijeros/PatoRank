import { combineReducers } from 'redux'
import session from './session'

const reducers = combineReducers({ session })
export type AppState = ReturnType<typeof reducers>
export default reducers
