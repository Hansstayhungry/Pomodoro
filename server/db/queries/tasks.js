// db/queries/tasks.js

const db = require('../../configs/db.config');

const getAllTasks = () => {
	return db.query("SELECT * FROM tasks;").then(data => {
		return data.rows;
	})
}

const getTaskById = id => {
	return db.query("SELECT * FROM tasks; WHERE id = $1", [id]).then(data => {
		return data.rows;
	})
}

module.exports = {getAllTasks, getTaskById}