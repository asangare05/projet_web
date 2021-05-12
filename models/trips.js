'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trips extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.trips.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
      /*
      ,
            models.trips.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
      */
    }
  };
  trips.init({
    //isUSERS: DataTypes.INTEGER,
    departure_city: DataTypes.STRING,
    departure_date: DataTypes.DATE,
    arrival_city: DataTypes.STRING,
    arrival_date: DataTypes.DATE,
    transport_type: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'trips',
  });
  return trips;
};