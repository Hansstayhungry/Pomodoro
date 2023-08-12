var express = require('express');
var router = express.Router();
const users = require('../db/queries/users');

router.get('/', (req, res) => {
  users.getAllUsers().then(data => {
    console.log(data);
    res.json({users: data});
  })
});

router.post('/', (req, res) => {
  users.addUser(req.body.first_name, req.body.last_name, req.body.email, req.body.password).then(data => {
    console.log(data);
    res.json({users: data});
  })
});
router.post('/:id/edit', (req, res) => {
  users.editUser(req.params.id, req.body.first_name, req.body.last_name, req.body.email, req.body.password).then(data => {
    console.log(data);
    res.json({users: data});
  })
});
router.post('/:id/delete', (req, res) => {
  users.deleteUser(req.params.id).then(data => {
    console.log(data);
    res.json({users: data});
  })
});
  
module.exports = router;