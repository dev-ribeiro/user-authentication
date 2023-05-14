'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },

      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },

      lastName: {
        type: Sequelize.STRING,
        allowNull: true
      },

      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },

      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
        allowNull: false
      },

      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
        allowNull: false
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
