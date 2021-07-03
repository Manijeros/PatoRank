import { Auth } from '@src/db'

export enum ActionType {
  SET_USER = 'SET_USER'
}

export type Action = {
  type: ActionType.SET_USER
  user?: Auth
}

export const setLoggedInUser = (user?: Auth) => ({
  type: ActionType.SET_USER,
  user
})
