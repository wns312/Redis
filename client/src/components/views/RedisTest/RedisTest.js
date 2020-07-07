import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import axios from 'axios'
const RedisTest = () => { //이 페이지 자체를 하나의 방으로 가정하기
  useEffect(() => {
    //원래대로라면 이 요청이 post이고 방이름을 담아 보낼 것
    axios.get('/api/redis')
      .then((response) => {
        console.log(response.data.success);
        //이부분은 fireMessage인지뭔지 그거쓰면 될듯
      })
      return ()=>{axios.get('/api/redis/out')}
  }, [])

  const [Message, setMessage] = useState("");
  function onSubmit(event) {
    event.preventDefault();
    axios.post('/api/redis/message', {message : Message})
  }
  function handleInput(event) {
    setMessage(event.target.value);
  }
  return (
    <>
      <NavBar></NavBar>
      레디스 테스트페이지
      <form onSubmit={onSubmit}>
        <input type="text" value={Message} onChange={handleInput}/>
        <button>전송</button>
        </form>
    </>
  );
};
export default RedisTest;