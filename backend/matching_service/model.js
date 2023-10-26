const { db, Sequelize } = require("./db");

const userModel = db.define("user", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	difficulty: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	user: {
		type: Sequelize.STRING,
		primaryKey: false,
	},
	videoSocket: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	socketId: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	createdAt: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
		allowNull: false,
	},
});
(async () => {
	await db.sync({ force: true });
	console.log("All models were synchronized successfully.");
})();

exports.userModel = userModel;
