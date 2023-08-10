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
  tasks.addTask(req.params.title, req.params.description, req.params.status, req.params.user_id).then(data => {
    console.log(data);
    res.json({tasks: data});
  })
});
router.post('/:id/edit', (req, res) => {
  tasks.editTask(req.params.id, req.params.title, req.params.description, req.params.status).then(data => {
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