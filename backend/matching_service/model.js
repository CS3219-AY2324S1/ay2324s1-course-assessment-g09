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
(async () => {
  await sequelize.sync({ force: true });
  console.log("All models were synchronized successfully.");
})();
exports.roomModel = roomModel;
