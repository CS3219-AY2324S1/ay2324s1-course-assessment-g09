const Sequelize = require("sequelize");

const db = new Sequelize({
	dialect: "sqlite",
	Storage: ":memory:",
	logging: false,
});

const checkConnection = async () => {
	try {
		await db.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error.message);
	}
};
checkConnection();

exports.db = db;
exports.Sequelize = Sequelize;
