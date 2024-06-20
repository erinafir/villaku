'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserVilla extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserVilla.belongsTo(models.Villa, {foreignKey: "VillaId"})
      UserVilla.belongsTo(models.User, {foreignKey: "UserId"})
    }
  }
  UserVilla.init({
    UserId: DataTypes.INTEGER,
    VillaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserVilla',
  });
  return UserVilla;
};