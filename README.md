# aws에 올려 테스트하기 위한 용도입니다

변경점 : bcrypt 대신 bcryptjs설치, 레디스 설치, dotenv설치

# 세팅
1. npm install을 client와 server에서 한번씩
2. .env파일을 생성후 vim으로 내용 작성
3. pm2설치 및 세팅
4. nodemon을 개발단계에서만 사용하므로 package.json파일을 수정(node로)

# aws에서 에러 발생시
1. node_modules삭제 후 npm install
2. 알아서 원인 찾기
