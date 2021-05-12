'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Profils', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      isUSERS: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // A mettre au pluriel
          key: 'id'
        }
      },
      firstname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gender: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      street: {
        allowNull: false,
        type: Sequelize.STRING
      },
      number: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      appartment_number: {
        allowNull: true,
        type: Sequelize.STRING
      },
      country_code: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone_number: {
        allowNull: false,
        type: Sequelize.STRING
      },
      info: {
        allowNull: true,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Profils');
  }
};