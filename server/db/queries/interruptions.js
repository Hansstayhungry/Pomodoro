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

module.exports = {getAllInterruptions, getInterruptionById}