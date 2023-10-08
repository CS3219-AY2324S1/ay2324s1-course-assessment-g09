const Sequelize = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    Storage:":memory:"
});

const checkConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error.message);
    }
};
checkConnection();

exports.sequelize = sequelize;
