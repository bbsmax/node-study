var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log("users 라우터 실행");
  res.send('user라우터');
});

// => GET /users/test가 요청되었을 때 실행됨.
router.get('/test', function (req, res, next) {
  console.log("users/test 라우터 실행");
  res.send('user/test라우터');
});

module.exports = router;
