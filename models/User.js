const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name : { // 이름
        type : String,
        maxlength : 50
    },
    email : { // 유일값으로 설정
        type : String,
        trim : true, // 앞뒤공백제거
        unique : 1 // 유일값
    },
    password : {
        type : String,
        minLength : 5
    },
    role : { // 관리자와 일반사용자 구분을 위해
        type : Number, //0이면 일반, 관리자면 1 처럼 구분
        default : 0 // 따로 정하지 않으면 role을 0을 준다
    },
    image : String, // 프로필이미지
    token : { // 토큰
        type : String,
    },
    tokenExp : { // 토큰 유효시간
        type : Number
    }
})
userSchema.pre('save', function(next){
    let user = this; 

    if(user.isModified('password')) {   
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err); 
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                user.password = hash
                next();
            });
        });
    }else{
        next();
    }
})


userSchema.methods.comparePassword = function(plainPassword, callback){
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if(err) return callback(err); 
        callback(null, isMatch);
    })
}

userSchema.methods.generateToken = function (callback) {
    //jwt을 이용해서 토큰 생성하기
    let user = this; //마찬가지로 입력 정보를 this로 가져온다 
    let token = jwt.sign(user._id, "secrettoken") // 여기서의 id는 고유값인 _id : ObjectId("...") 를 말한다
    //이렇게 sign에 고유값_id와 문장을 넣어주면 이 둘을 더해서 토큰을 만들어준다
    //추후에 jwt 조회를 할 시 ObjectId를 받아와서 문장을 더해 토큰화 해서 둘을 비교하는 방식으로 인증한다

    user.token = token; // 로그인유저의 token정보에 암호화된 token을 넣어준다
}




const User = mongoose.model('User',userSchema ) // (모델의 이름, 스키마)
module.exports = {User}