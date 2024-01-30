'use strict';
const { Model } = require('sequelize');
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
      name: {
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
      },
      observation: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM,
        values: ['pending', 'done', 'ongoing'],
        defaultValue: 'pending',
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
