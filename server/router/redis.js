const express = require('express');
const router = express.Router();
const redis = require('redis')
const client = redis.createClient();

// /api/redis
router.get('/', (req, res)=>{

  client.on("error", function(error) {
    console.error(error);
  });
  client.set("key", "value", (err, result)=>{
    console.log(result);
    
  });
  client.get("key", (err, result)=>{
    console.log(result);
    
  });

  return res.send({success : "redis go"})
})
module.exports =router;