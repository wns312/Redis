const express = require('express');
const router = express.Router();
const redis = require('redis');
const client = redis.createClient({
  host: process.env.AWS_IP,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PW
});
client.on("error", function (error) {
  console.error(error);
});
// /api/redis : 입장시..나중에 post로 바꾸고 소켓join배워서 바꾸기
router.get('/', (req, res) => {
  //여기서 소켓 접속?
  return res.send({ success: "redis go" })
})
//메시지 전송시
router.post('/message', (req, res) => {
  //client에서 서버로 저장하고 emit하기
  return res.send({ success: "redis go" })
})
//방에서 떠날 시
router.get('/out', (req, res) => {
  //socket에서 퇴장 emit??
  return res.send({ success: "redis go" })
})
module.exports = router;

/*
  client.hmset('friends', 'name', 'zero', 'age', 24);
  client.hgetall('friends', (err, obj) => {
    console.log(obj); // { name: 'zero', age: '24' }
  });
  client.rpush('fruits', 'apple', 'orange', 'apple');
  client.lpush('fruits', 'banana', 'pear');
  client.lrange('fruits', 0, -1, (err, arr) => {
    console.log(arr); // ['pear', 'banana', 'apple', 'orange', 'apple']
  });
  client.del('friends');
  client.del('fruits');
*/