const path = require('path');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
//express session에 저장되는 곳은 서버의 메모리
//그래서 서버를 다시 시작하면 session내용이 사라짐.
//const session = require('express-session'); 
const flash = require('connect-flash');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

//set은 환경 설정을 위한 부분. use는 미들웨어를 사용하겠다는 부분.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(미들웨어, 미들웨어, 미들웨어, ...) 이런식으로 작성이 가능하다.
//logger을 할거라고 선언.
//res.send가 되었을때 까지
app.use(logger('dev'));

//express static 은 불필요한 next()을 하지 않는다.
//요청한 파일이 없을 경우에만 next()을 실행한다. 그래서 맨 위로 올린다.
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//쿠키를 활성화.
//'secretKey'는 쿠키에 대한 비밀번호
//누군가가 cookie을 바꾸어서 접속하면 해당 비밀번호로 검사하여 변조여부를 확인함.
app.use(cookieParser('secretKey'));
//app.use(session());

//로그인 실패시 1회성 메세지를 위한 미들웨어.
app.use(flash());

//use를 사용하면 미들웨어가 된다.
//(위에서 부터 아래로 실행된다.)
app.use((req, res, next) => {
    console.log("첫번째 미들웨어")
    next(); //이 함수를 붙여줘야 아래로 이동한다.
});

app.use((req, res, next) => {
    console.log("두번째 미들웨어")
    next();
});

// '/'은 라우터에서 선언된 url과 합쳐진다.
app.use("/", indexRouter);

// GET '/user/test'라는 요청이 왔을때 usersRouter에 선언된 요청URL이'test'인 함수가 실행된다.
app.use("/users", usersRouter);

//404 Not Found Error
app.use((req, res, next) => {
    res.status(404).send("NOT FOUND");
});

//500 Error 
app.use((err, req, res, next) => {
    console.log("error : ", err);
    res.status(500).send('Server Error :');
});


//app.post, app.put, app.delete를 사용할 수 있다.
//app.options도 미들웨어.
// app.get("/", (req, res) => {
//     console.log("index ::")
//     res.send("Hello Index");
// });

module.exports = app;

/*
> npm i -g express-generator
> express sample --view=ejs
> npm i

scripts 에 npm 사용정의가 들어가는 부분.
npm run start할 수 있다.
start 메서드는 줄여서 npm start 해도 된다.

만약 package.json 파일 starts 부분에 dev을 추가 하였다면
"dev"": "node ./bin/www"

> npm run dev 와 같이 호출한다.

express에서 set, use

set은 환경을 설정하는 부분.

use는 미들웨어를 설정.

> npm i express-session connect-flash

*/