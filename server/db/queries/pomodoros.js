// db/queries/pomodoros.js

const db = require('../../configs/db.config');

const getAllPomodoros = () => {
	return db.query("SELECT * FROM pomodoros ORDER BY id;").then(data => {
		return data.rows;
	})
}
const getAllInterruptions = pomodoros_id => {
	return db.query("SELECT * FROM interruptions WHERE pomodoros_id = $1 ORDER BY id;", [pomodoros_id]).then(data => {
		return data.rows;
	})
}

const getPomodoroById = id => {
	return db.query("SELECT * FROM pomodoros WHERE id = $1 ORDER BY id;", [id]).then(data => {
		return data.rows;
	})
}

const getPomodoroByUserId = user_id => {
	return db.query("SELECT * FROM pomodoros WHERE user_id = $1 ORDER BY id;", [user_id]).then(data => {
		return data.rows;
	})
}

const getPomodoroByTaskId = task_id => {
	return db.query("SELECT * FROM pomodoros WHERE task_id = $1 ORDER BY id;", [task_id]).then(data => {
		return data.rows;
	})
}

const addPomodoro = (focus_time, break_time, repeat, start_time, estimated_end_time, end_time, task_id, user_id) => {
	return db.query("INSERT INTO pomodoros (focus_time, break_time, repeat, start_time, estimated_end_time, end_time, task_id, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [focus_time, break_time, repeat, start_time, estimated_end_time, end_time, task_id, user_id]).then(data => {
		return data.rows;
	})
}

const editPomodoro = (id, end_time) => {
	return db.query("UPDATE pomodoros SET end_time = $1 WHERE id = $2 RETURNING *", [end_time, id]).then(data => {
		return data.rows;
	})
}

const deletePomodoro = id => {
	return db.query("DELETE FROM pomodoros WHERE id = $1 RETURNING *", [id]).then(data => {
		return data.rows;
	})
}

module.exports = {getAllPomodoros, getAllInterruptions, getPomodoroById, getPomodoroByUserId, getPomodoroByTaskId, addPomodoro, editPomodoro, deletePomodoro}