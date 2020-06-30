const mongoose = require('mongoose');

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

const User = mongoose.model('User',userSchema ) // (모델의 이름, 스키마)
module.exports = {User}