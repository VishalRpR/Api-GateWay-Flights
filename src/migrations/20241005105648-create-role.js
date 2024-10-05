'use strict';

const { Enums } = require('../utils/common');

/** @type {import('sequelize-cli').Migration} */
const {CUSTOMER,FLIGHT_COMPANY,ADMIN}=Enums.USER_ROLES_ENUMS;
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.ENUM,
        values:[ADMIN,CUSTOMER,FLIGHT_COMPANY],
        allowNull:false,
        defaultValue:CUSTOMER
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Roles');
  }
};