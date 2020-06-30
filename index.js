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
    
    const user = new User(req.body); 
    user.save((err, doc)=>{ 
        if(err) {return res.json({ success : false, err})} 
        
        return res.status(200).json({
            success : true
        })
    });
})

app.post('./login', (req, res)=>{
    User.findOne({email : req.body.email}, function (err, user) {
        if(!err) return res.json({ loginSuccess : false, err })
        if(!user) return res.json({ loginSuccess : false, message : "이메일에 해당하는 유저가 없습니다"})

        user.comparePassword(req.body.comparePassword, (err, isMatch)=>{
            if(!err) return res.json({loginSuccess : false, err});
            if(!isMatch) {
                return res.json({
                    loginSuccess : false,
                    message : "비밀번호가 일치하지 않습니다"
                })
            }
    //3. 일치시 유저를 위한 토큰을 생성한다
    // 다시 스키마에 generateToken함수를 만들어준다.
            user.generateToken((err, user)=>{

            });
        })
    }) 
})

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
})