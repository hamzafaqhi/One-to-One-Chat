'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chat_group_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  chat_group_user.init({
        chat_group_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        user: {
            allowNull: false,
            type: DataTypes.INTEGER,
        }
    }, {
        sequelize,
        modelName: 'chat_group_user',
        underscored: true,
        timestamps: true
    });
    return chat_group_user;
};