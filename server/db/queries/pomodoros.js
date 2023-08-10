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

const addPomodoro = (focus_time, break_time, repeat, start_time, estimated_end_time, end_time, task_id, user_id) => {
	return db.query("INSERT INTO pomodoros (focus_time, break_time, repeat, start_time, estimated_end_time, end_time, task_id, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [focus_time, break_time, repeat, start_time, estimated_end_time, end_time, task_id, user_id]).then(data => {
		return data.rows;
	})
}

const editPomodoro = (id, focus_time, break_time, repeat, start_time, estimated_end_time, end_time) => {
	return db.query("UPDATE pomodoros SET focus_time = $1, break_time = $2, repeat = $3, start_time = $4, estimated_end_time = $5, end_time = $6 WHERE id = $7 RETURNING *", [focus_time, break_time, repeat, start_time, estimated_end_time, end_time, id]).then(data => {
		return data.rows;
	})
}

const deletePomodoro = id => {
	return db.query("DELETE FROM pomodoros WHERE id = $1 RETURNING *", [id]).then(data => {
		return data.rows;
	})
}

module.exports = {getAllPomodoros, getPomodoroById, addPomodoro, editPomodoro, deletePomodoro}