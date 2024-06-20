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

    static async getAllVilla(){
      try {
        let data = await Villa.findAll()
        return data
        
      } catch (error) {
        throw error
      }
    }

    static async findVillaById(id){
      try {
        let data = await Villa.findOne({
          where: {
            id: id,
          }
        })
        return data
      } catch (error) {
        throw error
      }
    }
  }

  Villa.init({
    name: {type: DataTypes.STRING,
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
    description: {type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "description cannot be null"
        },
        notEmpty: {
          msg: "description cannot be empty"
        }
      }
    },
    price: {type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "price cannot be null"
        },
        notEmpty: {
          msg: "price cannot be empty"
        }
      }
    },
    img_Url: {type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "villa image cannot be null"
        },
        notEmpty: {
          msg: "villa image cannot be empty"
        }
      }
    },
    LocationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Villa',
  });
  return Villa;
};