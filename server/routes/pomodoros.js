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
  pomodoros.addPomodoro(req.params.focus_time, req.params.break_time, req.params.repeat, req.params.start_time, req.params.estimated_end_time, req.params.end_time, req.params.task_id, req.params.user_id).then(data => {
    console.log(data);
    res.json({pomodoros: data});
  })
});
router.post('/:id/edit', (req, res) => {
  pomodoros.editPomodoro(req.params.id, req.params.focus_time, req.params.break_time, req.params.repeat, req.params.start_time, req.params.estimated_end_time, req.params.end_time).then(data => {
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