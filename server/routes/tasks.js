var express = require('express');
var router = express.Router();
const tasks = require('../db/queries/tasks');

router.get('/', (req, res) => {
  tasks.getAllTasks().then(data => {
    console.log(data);
    res.json({tasks: data});
  })
});

router.post('/', (req, res) => {
  tasks.addTask(req.body.title, req.body.description, req.body.status, req.body.user_id).then(data => {
    console.log(data);
    res.json({tasks: data});
  })
});
router.post('/:id/edit', (req, res) => {
  tasks.editTask(req.params.id, req.body.title, req.body.description, req.body.status).then(data => {
    console.log(data);
    res.json({tasks: data});
  })
});
router.post('/:id/delete', (req, res) => {
  tasks.deleteTask(req.params.id).then(data => {
    console.log(data);
    res.json({tasks: data});
  })
});

module.exports = router;