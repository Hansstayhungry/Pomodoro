// db/queries/users.js
const bcrypt = require('bcrypt');
const db = require('../../configs/db.config');

const getAllUsers = () => {
	return db.query("SELECT * FROM users ORDER BY id;").then(data => {
		return data.rows;
	})
}

const getAllTasks = user_id => {
	return db.query("SELECT * FROM tasks WHERE user_id = $1 ORDER BY id;", [user_id]).then(data => {
		return data.rows;
	})
}

const getUserById = id => {
	return db.query("SELECT * FROM users WHERE id = $1;", [id]).then(data => {
		return data.rows;
	})
}

const getUserByEmail = email => {
	return db.query("SELECT * FROM users WHERE email = $1;", [email]).then(data => {
		return data.rows;
	})
}

const addUser = (first_name, last_name, email, password) => {
	const hashedPassword = bcrypt.hashSync(password, 10);
	return db.query("INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *", [first_name, last_name, email, hashedPassword]).then(data => {
		return data.rows;
	})
}

const editUser = (id, first_name, last_name, email, password) => {
	const hashedPassword = bcrypt.hashSync(password, 10);
	return db.query("UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4 WHERE id = $5 RETURNING *", [first_name, last_name, email, hashedPassword, id]).then(data => {
		return data.rows;
	})
}

const deleteUser = id => {
	return db.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]).then(data => {
		return data.rows;
	})
}

module.exports = {getAllUsers,getAllTasks, getUserById, getUserByEmail, addUser, editUser, deleteUser}