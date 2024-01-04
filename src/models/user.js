'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    user.init({
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        status: DataTypes.STRING,
        verify_token: DataTypes.STRING,
        is_verified: DataTypes.BOOLEAN,
        salt: DataTypes.STRING,
        deleted_at: DataTypes.DATE
    }, 
    {
        sequelize,
        modelName: 'user',
        underscored: true,
        paranoid: true,
        timestamps:true
    });
    return user;
};