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
    fullName: {
      type: DataTypes.STRING,
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
    img_Url: {
      type: DataTypes.STRING,
      defaultValue: "https://placehold.co/800?text=Hello+World&font=roboto",
      allowNull: false,
      validate: {
        notNull: {
          msg: "image profile cannot be null"
        },
        notEmpty: {
          msg: "image profile cannot be empty"
        },
        isUrl: {
          msg: "image must be in url template"
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "phone number cannot be null"
        },
        notEmpty: {
          msg: "phone number cannot be empty"
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};