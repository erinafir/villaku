'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Villa, { through: "UserVillas", foreignKey: "UserId" })
      User.hasOne(models.UserProfile)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "username cannot be null"
        },
        notEmpty: {
          msg: "username cannot be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "email cannot be null"
        },
        notEmpty: {
          msg: "email cannot be empty"
        },
        isEmail: {
          msg: "email is not valid"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password cannot be null"
        },
        notEmpty: {
          msg: "password cannot be empty"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
      allowNull: false,
      validate: {
        notNull: {
          msg: "role cannot be null"
        },
        notEmpty: {
          msg: "role cannot be empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};