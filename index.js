const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser= require('cookie-parser');
const app = express();
const port = 3000;
//{User}로 가져오는 이유는 export를 {User}로 해주었기 때문이다.
const {User} = require('./models/User');
const {mongoURI} = require('./config/key') 
const {auth} = require('./middleware/auth') 

//application/x-www-form-urlencoded 타입 데이터를 분석해서 가져올 수 있게 해준다.
app.use(bodyParser.urlencoded({extended : true}));
//application/json 타입 데이터를 분석해 가져올 수 있게 해준다.
app.use(bodyParser.json());
//쿠키파서 사용설정
app.use(cookieParser());


mongoose.connect(mongoURI, {
  useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
})
.then(()=>{ console.log("connected")}) 
.catch((err)=>{console.log(err)}) 

app.get('/', (req,res)=>{
  res.send('Hello world')
})

app.post('/api/users/register', (req, res)=>{ 
  const user = new User(req.body); 
  user.save((err, doc)=>{ 
    if(err) {return res.json({ success : false, err})} 
    
    return res.status(200).json({
      success : true
    })
  });
})

app.post("/api/users/login", (req, res) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "이메일에 해당하는 유저가 없습니다",
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 일치하지 않습니다",
        });
      }
      //3. 일치시 유저를 위한 토큰을 생성한다
      // 다시 스키마에 generateToken함수를 만들어준다.
      user.generateToken((err, user) => {
        //이제 여기에는 유저 정보가 담겨있다
        if (err) return res.status(400).send(err); //400은 에러가 있다는 뜻
        //토큰을 저장한다 어디에?? 1) 쿠키에 2) 로컬스토리지.. 우리는 쿠키에 저장할 것
        res.cookie("x_auth", user.token) // x_auth라는 이름으로 쿠키가 들어감
        .status(200)  //성공 신호보내주고
        .json({ loginSuccess : true, userId : user._id }) // JSON으로 로그인 성공 변수와 ObjectID를 userId라는 이름으로 보내줌
      });
    });
  });
});

app.get('/api/users/auth', auth,  (req, res)=>{ // auth는 ()를 적지 않는다
  //여기까지 왔다는것은, Auth가 true라는 뜻이다
  res.status(200).json({
    //원하는것만 전달해주면 된다
    userId : req.user._id,
    isAdmin : req.user.role === 0 ? false : true, // 0이 아니면 관리자인 것
    isAuth : true,
    email : req.user.email,
    name : req.user.name,
    lastname : req.user.lastname,
    image : req.user.image
  })
})



app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
})