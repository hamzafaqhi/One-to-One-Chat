'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('chat_groups', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
        started: {
            type: Sequelize.BOOLEAN,
            allowNull:false,
            defaultValue: false
        },
        closed: {
            type: Sequelize.BOOLEAN,
            allowNull:false,
            defaultValue: false
        },
        created_at: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updated_at: {
            allowNull: false,
            type: Sequelize.DATE
        }
    }, {
        timestamps: true
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('chat_groups');
  }
};