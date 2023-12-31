var express = require('express');
var router = express.Router();
const users = require('../db/queries/users');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
  users.getAllUsers().then(data => {
    console.log(data);
    res.json({ users: data });
  })
});

router.get('/:id', (req, res) => {
  users.getUserById(req.params.id).then(data => {
    console.log(data);
    res.json({ users: data });
  })
});

router.get('/:id/tasks', (req, res) => {
  users.getAllTasks(req.params.id).then(data => {
    console.log(data);
    res.json({ tasks: data });
  })
});

router.post('/:id/edit', (req, res) => {
  users.editUser(req.params.id, req.body.first_name, req.body.last_name, req.body.email, req.body.password).then(data => {
    console.log(data);
    res.json({ users: data });
  })
});

router.post('/:id/delete', (req, res) => {
  users.deleteUser(req.params.id).then(data => {
    console.log(data);
    res.json({ users: data });
  })
});

router.post('/register', (req, res) => {
  users.getUserByEmail(req.body.email).then((user) => {
    if (req.body.first_name === "" || req.body.last_name === "" || req.body.email === "" || req.body.password === "") {
      res.status(400).send('Invalid input');
    } else if (user[0]) {
      res.status(400).send('Email is already registered');
    } else {
      users.addUser(req.body.first_name, req.body.last_name, req.body.email, req.body.password).then(data => {
        console.log(data);
        res.cookie('user_id', data[0]['id']);
        res.json({ users: data });
      })
    }
  });
});

router.post('/login', (req, res) => {
  users.getUserByEmail(req.body.email).then((user) => {
    if (req.body.email === "" || req.body.password === "") {
      res.status(200).send('Log in is successful');
    } else if (user.length > 0 && bcrypt.compareSync(req.body.password, user[0]['password'])) {
      console.log(user);
      res.cookie('user_id', user[0]['id']);
      res.json({ users: user });
    } else {
      res.status(403).send('Email or password is incorrect');
    }
  });

});

router.post('/logout', (req, res) => {
  console.log('logging out 2');
  res.clearCookie('user_id');
  return res.status(200).send('Log out is successful');
});

module.exports = router;