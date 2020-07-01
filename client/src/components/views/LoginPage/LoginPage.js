import React, { useState } from 'react';
import './LoginPage.css'
import Axios from 'axios'

const LoginPage = () => {
  const [ Email, setEmail ] = useState("");
  const [ Password, setPassword ] = useState("");

  function onEmailHandler(event) {
    setEmail(event.target.value)
  }
  function onPasswordHandler(event) {
    setPassword(event.target.value)
  }
  function onSubmitHandler(event) {
    event.preventDefault();

    Axios.post('/api/users/login', {})
    .then((response)=>{})
    .catch(()=>{})
  }
  return (
    <div id ='div'>
      <form id='form' onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler}/>
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler}/>
        <br/>
        <button>로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;