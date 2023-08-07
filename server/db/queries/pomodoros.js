// db/queries/pomodoros.js

const db = require('../../configs/db.config');

const getAllPomodoros = () => {
	return db.query("SELECT * FROM pomodoros;").then(data => {
		return data.rows;
	})
}

const getPomodoroById = id => {
	return db.query("SELECT * FROM pomodoros; WHERE id = $1", [id]).then(data => {
		return data.rows;
	})
}

module.exports = {getAllPomodoros, getPomodoroById}