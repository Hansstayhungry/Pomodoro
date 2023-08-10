var express = require('express');
var router = express.Router();
const interruptions = require('../db/queries/interruptions');

router.get('/', (req, res) => {
  interruptions.getAllInterruptions().then(data => {
    console.log(data);
    res.json({interruptions: data});
  })
});

router.post('/', (req, res) => {
  interruptions.addInterruption(req.params.start_time, req.params.end_time, req.params.pomodoros_id).then(data => {
    console.log(data);
    res.json({interruptions: data});
  })
});
router.post('/:id/edit', (req, res) => {
  interruptions.editInterruption(req.params.id, req.params.start_time, req.params.end_time).then(data => {
    console.log(data);
    res.json({interruptions: data});
  })
});
router.post('/:id/delete', (req, res) => {
  interruptions.deleteInterruption(req.params.id).then(data => {
    console.log(data);
    res.json({interruptions: data});
  })
});
module.exports = router;