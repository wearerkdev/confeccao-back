'use strict';
const models = require('../models/index');
const sequelize = require('../config');
const { Model, UUIDV4, DataTypes } = require('sequelize');
const Factories = require('./factory.models');
const Segments = require('./segment.models');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.hasOne(models.Factories, {
        sourceKey: 'id',
        foreignKey: 'factoryID',
      });
      Order.hasOne(models.Segments, {
        sourceKey: 'id',
        foreignKey: 'segmentID',
        as: 'segment',
      });
    }
  }
  Order.init(
    {
      orderID: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        validate: {
          isUUID: 4,
        },
      },
      factoryID: {
        type: DataTypes.INTEGER,
        references: {
          model: Factories,
          key: 'id',
        },
      },
      factoryName: {
        type: DataTypes.STRING,
        values: [],
      },
      segmentID: {
        type: DataTypes.INTEGER,
        references: {
          model: Segments,
          key: 'id',
        },
      },
      segmentName: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM,
        values: ['costurando', 'costurado'],
        defaultValue: 'costurando',
        allowNull: false,
        validate: {
          isIn: ['costurando', 'costurado'],
        },
      },
      saidaParaCostura: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      quantidadeDeSaida: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          isNumeric: true,
          isInt: true,
          notNull: true,
          notEmpty: true,
        },
        defaultValue: 0,
      },
      retiradaDaCostura: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      quantidadeDeRetorno: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
          isNumeric: true,
          isInt: true,
          notNull: true,
          notEmpty: true,
        },
      },
      aFazer: {
        type: DataTypes.VIRTUAL,
        get() {
          const total =
            this.getDataValue('quantidadeDeSaida') -
            this.getDataValue('quantidadeDeRetorno');

          return total;
        },
      },

      orderPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      isDone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Orders',
      tableName: 'Orders',
      timestamps: true,
    },
  );

  return Order;
};
