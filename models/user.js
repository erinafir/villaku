'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    greetRole() {
      let greet = `${this.role} ${this.username}`
      return greet
    }

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
        },
        isPassword(value) {
          if (value.length < 8) {
            throw new Error("password must contain at least 8 characters")
          }
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
    hooks: {
      beforeCreate(instance, option) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(instance.password, salt);
        instance.password = hash
      }
    },
    modelName: 'User',
  });
  return User;
};