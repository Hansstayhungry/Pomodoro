var express = require('express');
var router = express.Router();
const pomodoros = require('../db/queries/pomodoros');

router.get('/', (req, res) => {
  pomodoros.getAllPomodoros().then(data => {
    console.log(data);
    res.json({pomodoros: data});
  })
});
  
module.exports = router;