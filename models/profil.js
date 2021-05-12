'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profil extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      /*
      models.Profil.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })    
      */  
    }
  };
  Profil.init({
    isUSERS: DataTypes.INTEGER,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    street: DataTypes.STRING,
    number: DataTypes.INTEGER,
    appartment_number: DataTypes.STRING,
    country_code: DataTypes.INTEGER,
    city: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    info: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profil',
  });
  return Profil;
};