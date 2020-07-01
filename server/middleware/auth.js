const {User} = require('../models/User');

let auth = (req, res, next)=>{
  // 인증 처리 담당
  //쿠키에서 토큰 가져오기
  let token = req.cookies.x_auth; // x_auth라는 이름으로 저장한 쿠키를 가져옴 (=token)
  //토큰 복호화하기
  //복호화된 토큰으로 유저 찾기
  User.findByToken(token, (err, user)=>{
    //유저가 있으면 인증 OK, 없으면 인증 NO
    if(err) throw err;
    if(!user) return res.json({isAuth : false, error : true});
    //유저가 있는 경우
    req.token = token; // req에 넣어주므로 인해서 req로 바로 사용하기 편해지기 때문이다
    req.user = user;
    next(); // 다 작성하고 나서 다시 요청으로 보내주기 위해 호출
  });
}
module.exports = {auth}