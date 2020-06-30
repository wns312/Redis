const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
//{User}로 가져오는 이유는 export를 {User}로 해주었기 때문이다.
const {User} = require('./models/User');
const {mongoURI} = require('./config/key') 

//application/x-www-form-urlencoded 타입 데이터를 분석해서 가져올 수 있게 해준다.
app.use(bodyParser.urlencoded({extended : true}));
//application/json 타입 데이터를 분석해 가져올 수 있게 해준다.
app.use(bodyParser.json());

mongoose.connect(mongoURI, {
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
})
.then(()=>{ console.log("connected")}) 
.catch((err)=>{console.log(err)}) 

app.get('/', (req,res)=>{
    res.send('Hello world')
})

app.post('/register', (req, res)=>{
    //회원가입 정보를 client에서 가져오면,
    // 그것들을 데이터베이스에 넣어준다
    const user = new User(req.body); // 데이터를 객체에 넣어준 것(JSON)
    //save하면 객체에 넣은 데이터를 DB에 업데이트한다. save에는 콜백 function이 인수로 들어간다.
    user.save((err, doc)=>{ // 인수는 err과 doc 두가지 (여기서 doc은 유저정보)
        if(err) {return res.json({ success : false, err})} // 에러시 success변수와 에러를 보냄
        
        //200은 성공했다는 의미를 담고 있는 상태번호이다 성공했다는 신호를 보내고 json파일로
        // success 변수를 보낸다 (res.json() 은 json타입 데이터를 리턴시키는 함수이다) 
        return res.status(200).json({
            success : true
        })
    });
})

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
})