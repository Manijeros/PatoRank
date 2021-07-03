import { Action, ActionType } from '@src/actions'
import { Auth } from '@src/db'

export type State = {
  user?: Auth
}

const session = (state: State = {}, action: Action) => {
  switch (action.type) {
    case ActionType.SET_USER:
      console.log(state)
      return {
        ...state,
        user: action.user
      }
    default:
      return state
  }
}
export default session
