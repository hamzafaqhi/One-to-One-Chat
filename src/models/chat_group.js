'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chat_group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        this.hasMany(models.chat_message, { foreignKey:'chat_group_id',as: 'chat_messages' });
        this.belongsToMany(models.user, { through: 'chat_group_users', foreignKey: 'chat_group_id', otherKey: 'user_id'});
    }
  }
  chat_group.init({
    name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    started: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: false
    },
    closed: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'chat_group',
    underscored: true,
    timestamps: true
  });
  return chat_group;
};