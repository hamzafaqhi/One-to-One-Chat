'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('chat_messages', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        chat_group_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: "chat_groups",
              key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        user_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: "users",
              key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        message: {
            type: Sequelize.STRING
        },
        is_read: {
            type: Sequelize.BOOLEAN
        },
        created_at: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updated_at: {
            allowNull: false,
            type: Sequelize.DATE
        }
    },{
        timestamps:true
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('chat_messages');
  }
};