const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config.js')
const TimeTable = sequelize.define('./timeTable.js')

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'User',
  }
);

User.hasMany(TimeTable)

module.exports = User;
