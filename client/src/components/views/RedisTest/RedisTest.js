import React, { useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import axios from 'axios'

const RedisTest = () => {

  useEffect(()=>{
    axios.get('/api/redis')
    .then((response)=>{
      console.log(response.data.success);   
    })
  }, [])
  return (
    <>
      <NavBar></NavBar>
      레디스 테스트페이지
    </>
  );
};

export default RedisTest;