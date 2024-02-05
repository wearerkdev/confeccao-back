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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      segmentName: {
        type: DataTypes.VIRTUAL,
        get() {
          const getName = this.getDataValue('segmentName');
          return getName;
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
