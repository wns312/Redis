import {LOGIN_USER, REGISTER_USER, AUTH_USER} from '../_actions/types'

export default function (state={}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { login: action.payload ,...state}

    case REGISTER_USER:
      return {register : action.payload, ...state}

    case AUTH_USER:
      return {userData : action.payload,...state}

    default: 
      return state;
  }
}