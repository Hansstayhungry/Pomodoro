var express = require('express');
var router = express.Router();
const users = require('../db/queries/users');

router.get('/', (req, res) => {
  users.getAllUsers().then(data => {
    console.log(data);
    res.json({users: data});
  })
});
  
module.exports = router;