const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const audioRouter = require('./routes/audio');
const usersRouter = require('./routes/users');
const tasksRouter = require('./routes/tasks');
const pomodorosRouter = require('./routes/pomodoros');
const interruptionsRouter = require('./routes/interruptions');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/audio', audioRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
app.use('/pomodoros', pomodorosRouter);
app.use('/interruptions', interruptionsRouter);

module.exports = app;
