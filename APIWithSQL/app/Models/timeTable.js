const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config.js');
const User = sequelize.define('./user.js');

class TimeTable extends Model {}

TimeTable.init(
  {
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: 'id',
      },
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'TimeTable',
    tableName: 'TimeTables',
    // Opções adicionais do modelo
  }
);

TimeTable.hasMany(User)

module.exports = TimeTable;
