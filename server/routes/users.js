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
  users.addUser(req.params.first_name, req.params.last_name, req.params.email, md5(req.params.password), now(), now()).then(data => {
    console.log(data);
    res.json({users: data});
  })
});
router.post('/:id/edit', (req, res) => {
  users.editUser(req.params.id, req.params.first_name, req.params.last_name, req.params.email, md5(req.params.password), now()).then(data => {
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