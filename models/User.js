const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    // 이름
    type: String,
    maxlength: 50,
  },
  email: {
    // 유일값으로 설정
    type: String,
    trim: true, // 앞뒤공백제거
    unique: 1, // 유일값
  },
  password: {
    type: String,
    minLength: 5,
  },
  role: {
    // 관리자와 일반사용자 구분을 위해
    type: Number, //0이면 일반, 관리자면 1 처럼 구분
    default: 0, // 따로 정하지 않으면 role을 0을 준다
  },
  image: String, // 프로필이미지
  token: {
    // 토큰
    type: String,
  },
  tokenExp: {
    // 토큰 유효시간
    type: Number,
  },
});
userSchema.pre('save', function(next){
  let user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
})


userSchema.methods.comparePassword = function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return callback(err) 
    callback(null, isMatch);
  });
};

userSchema.methods.generateToken = function (callback) {
  
  let user = this; JSON.stringify()
  let token = jwt.sign(user._id.toHexString(), "secretToken"); 
  user.token = token; 
  user.save(function (err, user) {
    
    if (err) return callback(err);
    callback(null, user); 
  });
};

const User = mongoose.model('User',userSchema ) // (모델의 이름, 스키마)
module.exports = {User}