'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Villa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Villa.belongsTo(models.Location, {foreignKey: "LocationId"})
      Villa.belongsToMany(models.User, {through: "UserVilla", foreignKey: "VillaId"})
    }
  }
  Villa.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    img_Url: DataTypes.STRING,
    LocationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Villa',
  });
  return Villa;
};