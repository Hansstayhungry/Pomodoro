var express = require('express');
var router = express.Router();
const tasks = require('../db/queries/tasks');

router.get('/', (req, res) => {
  tasks.getAllTasks().then(data => {
    console.log(data);
    res.json({tasks: data});
  })
});
  
module.exports = router;