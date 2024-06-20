'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User)
    }
  }
  UserProfile.init({
    fullName: {type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "name cannot be null"
        },
        notEmpty: {
          msg: "name cannot be empty"
        }
      }
    },
    img_Url: {type: DataTypes.STRING,
      defaultValue: "https://placehold.co/800?text=Hello+World&font=roboto",
      allowNull: false
    },
    phoneNumber: {type: DataTypes.STRING,

    }
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};