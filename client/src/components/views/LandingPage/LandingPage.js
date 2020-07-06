import React from 'react';
import NavBar from '../NavBar/NavBar';
import './LandingPage.css'
import Axios from 'axios';

const LandingPage = (props) => {
  function onClickHandler(event) {
    Axios.get(`api/users/logout`)
    .then(response=>{
      if(response.data.success){
        props.history.push('/login')
      }else{
        alert("로그아웃 실패")
      }  
    })  
  }
  return (
    <>
    <NavBar></NavBar>
    <div id='div'>
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
    </>
  );
};

export default LandingPage;