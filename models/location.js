'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Location.hasMany(models.Villa)
    }
  }
  Location.init({
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "location cannot be null"
        },
        notEmpty: {
          msg: "location cannot be empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};