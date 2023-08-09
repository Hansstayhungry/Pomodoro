const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Doro - Your Personal Productivity Booster' });
});

module.exports = router;
 