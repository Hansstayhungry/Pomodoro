// db/queries/tasks.js

const db = require('../../configs/db.config');

const getAllTasks = () => {
	return db.query("SELECT * FROM tasks ORDER BY id;").then(data => {
		return data.rows;
	})
}

const getAllPomodoros = task_id => {
	return db.query("SELECT * FROM pomodoros WHERE task_id = $1 ORDER BY id;", [task_id]).then(data => {
		return data.rows;
	})
}

const getTaskById = id => {
	return db.query("SELECT * FROM tasks; WHERE id = $1", [id]).then(data => {
		return data.rows;
	})
}

const getTaskByUserId = user_id => {
	return db.query("SELECT * FROM tasks WHERE user_id = $1 ORDER BY id;", [user_id]).then(data => {
		return data.rows;
	})
}

const addTask = (title, description, status, user_id) => {
	return db.query("INSERT INTO tasks (title, description, status, user_id) VALUES ($1, $2, $3, $4) RETURNING *", [title, description, status, user_id]).then(data => {
		return data.rows;
	})
}

const editTask = (id, title, description, status) => {
	return db.query("UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4 RETURNING *", [title, description, status, id]).then(data => {
		return data.rows;
	})
}

const deleteTask = id => {
	return db.query("DELETE FROM tasks WHERE id = $1 RETURNING *", [id]).then(data => {
		return data.rows;
	})
}
module.exports = {getAllTasks, getAllPomodoros, getTaskById, getTaskByUserId, addTask, editTask, deleteTask}