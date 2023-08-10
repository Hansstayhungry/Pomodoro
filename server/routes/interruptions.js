var express = require('express');
var router = express.Router();
const interruptions = require('../db/queries/interruptions');

router.get('/', (req, res) => {
  interruptions.getAllInterruptions().then(data => {
    console.log(data);
    res.json({interruptions: data});
  })
});
  
module.exports = router;