'use strict';
const { Model } = require('sequelize');
const Factories = require('./factory.models');
module.exports = (sequelize, DataTypes) => {
  class Segment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Segment.init(
    {
      segmentID: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      segmentName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isDecimal: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Segments',
      tableName: 'Segments',
    },
  );
  return Segment;
};
