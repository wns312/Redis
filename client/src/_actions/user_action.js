import axios from "axios";
import {LOGIN_USER} from './types'

export function loginUser(dataToSubmit) {
  const request = axios.post('/api/users/login', dataToSubmit)
  .then(response=>response.data)

  return {
    type : LOGIN_USER,
    payload : request // 요청해서 받아온 데이터 라우터를 보면 확인가능{userId : kasjdfklsad, loginSuccess : boolean }
  }
}