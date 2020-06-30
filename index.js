const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

//이 부분은 기존에 따로 mongoose.set한 것과 같지만 connect에 하나로 처리한 것이라서 줄이 줄어듬
mongoose.connect('mongodb+srv://wns312:wns312@cluster0-ptxu3.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
})
.then(()=>{ console.log("connected")}) // 제대로 연결되었다면 then 실행
.catch((err)=>{console.log(err)}) // 연결에 실패했다면 catch 실행

app.get('/', (req,res)=>{
    res.send('Hello world')
})

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
})