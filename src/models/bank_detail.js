'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bank_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bank_detail.init({
    bank_name: DataTypes.STRING,
    account_holder_name: DataTypes.STRING,
    account_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'bank_detail',
    timestamps: true
  });
  return bank_detail;
};