'use strict';
const { DEFAULT_USER_STATUS } = require('../constants/index.js');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        first_name: {
            allowNull: false,
            type: Sequelize.STRING
        },
        last_name: {
            allowNull: false,
            type: Sequelize.STRING
        },
        email: {
            allowNull: false,
            type: Sequelize.STRING
        },
        password: {
            allowNull: false,
            type: Sequelize.STRING
        },
        status: {
            defaultValue: DEFAULT_USER_STATUS,
            type: Sequelize.STRING
        },
        verify_token: {
            type: Sequelize.STRING
        },
        is_verified: {
            type: Sequelize.BOOLEAN
        },
        deleted_at: {
            type: Sequelize.DATE
        },
        created_at: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updated_at: {
            allowNull: false,
            type: Sequelize.DATE
        },
        salt: {
            allowNull: false,
            type: Sequelize.STRING
        }
    }, {
        underscored: true,
        paranoid: true,
        timestamps:true
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};