'use strict';
const { Model } = require('sequelize');
const Segments = require('./segment.models');
module.exports = (sequelize, DataTypes) => {
  class Factory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Factory.init(
    {
      factoryID: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      factoryName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING(11),
        allowNull: true,
        unique: true,
        validate: {
          is: ['[0-9]', 'i'],
        },
      },
      isNumberWhatsapp: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      observation: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '',
      },
    },
    {
      sequelize,
      modelName: 'Factories',
      tableName: 'Factories',
    },
  );
  return Factory;
};
