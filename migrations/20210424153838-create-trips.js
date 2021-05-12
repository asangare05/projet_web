'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('trips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', 
          key: 'id'
        }
      },
      departure_city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      departure_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      arrival_city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      arrival_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      transport_type: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'transporttypes', 
          key: 'id'
        }
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('trips');
  }
};