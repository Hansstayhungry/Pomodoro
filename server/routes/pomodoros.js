var express = require('express');
var router = express.Router();
const pomodoros = require('../db/queries/pomodoros');

router.get('/', (req, res) => {
  pomodoros.getAllPomodoros().then(data => {
    console.log(data);
    res.json({pomodoros: data});
  })
});

router.post('/', (req, res) => {
  pomodoros.addPomodoro(req.body.focus_time, req.body.break_time, req.body.repeat, req.body.start_time, req.body.estimated_end_time, req.body.end_time, req.body.task_id, req.body.user_id).then(data => {
    console.log(data);
    res.json({pomodoros: data});
  })
});
router.post('/:id/edit', (req, res) => {
  pomodoros.editPomodoro(req.params.id, req.body.end_time).then(data => {
    console.log(data);
    res.json({pomodoros: data});
  })
});
router.post('/:id/delete', (req, res) => {
  pomodoros.deletePomodoro(req.params.id).then(data => {
    console.log(data);
    res.json({pomodoros: data});
  })
});

module.exports = router;