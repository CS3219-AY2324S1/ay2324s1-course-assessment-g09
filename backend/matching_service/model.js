const sequelize = require("./db").sequelize;
const { DataTypes } = require("sequelize");

const roomModel = sequelize.define("room", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    socketID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    difficulty: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const userModel = sequelize.define("user", {
    socketID: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    matchStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});

exports.roomModel = roomModel;
exports.userModel = userModel;
