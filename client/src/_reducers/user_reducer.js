import {LOGIN_USER, REGISTER_USER} from '../_actions/types'

export default function (state={}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { loginSuccess: action.payload ,...state}
    case REGISTER_USER:
      console.log(action.payload);
      return {Success : action.payload, ...state}
    default: 
      return state;
  }
}