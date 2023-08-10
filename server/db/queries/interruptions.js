// db/queries/interruptions.js

const db = require('../../configs/db.config');

const getAllInterruptions = () => {
	return db.query("SELECT * FROM interruptions;").then(data => {
		return data.rows;
	})
}

const getInterruptionById = id => {
	return db.query("SELECT * FROM interruptions; WHERE id = $1", [id]).then(data => {
		return data.rows;
	})
}

const addInterruption = (start_time, end_time, pomodoros_id) => {
	return db.query("INSERT INTO interruptions (start_time, end_time, pomodoros_id) VALUES ($1, $2, $3) RETURNING *", [start_time, end_time, pomodoros_id]).then(data => {
		return data.rows;
	})
}

const editInterruption = (id, start_time, end_time) => {
	return db.query("UPDATE interruptions SET start_time = $1, end_time = $2 WHERE id = $3 RETURNING *", [start_time, end_time, id]).then(data => {
		return data.rows;
	})
}

const deleteInterruption = id => {
	return db.query("DELETE FROM interruptions WHERE id = $1 RETURNING *", [id]).then(data => {
		return data.rows;
	})
}

module.exports = {getAllInterruptions, getInterruptionById,addInterruption, editInterruption, deleteInterruption}