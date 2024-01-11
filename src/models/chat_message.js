'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chat_message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        this.belongsTo(models.user,{ foreignKey: "user_id", as:"user_messages" });
        this.belongsTo(models.chat_group,{ foreignKey: "chat_group_id", as:"chat_groups" });
    }
  }
    chat_message.init({
        chat_group_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        is_read: {
            type: DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull:false
        }
    }, {
        sequelize,
        modelName: 'chat_message',
        underscored: true,
        timestamps:true
    });
    return chat_message;
};