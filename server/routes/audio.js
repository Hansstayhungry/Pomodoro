const express = require('express');
const router = express.Router();
const audioData = require('../src/data/audioData')

router.get('/api', (req, res) => {
  res.json(audioData)
})

module.exports = router;
 