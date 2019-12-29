const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log("index router :::")
    res.render('index', { title: 'Hello node js' });

    // try {
    //     throw new Error("서버에러 발생");
    // } catch (error) {
    //     //에러가 발생하면 app.js에 사용된 미들웨어(500 Server Error)가 실행됨.
    //     next(error);
    // }
});

module.exports = router;