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
      });
      Order.hasOne(models.Segments, {
        targetKey: 'segmentName',
        as: 'segmentNameInOrders',
        foreignKey: 'segmentName',
      });
    }
  }
  Order.init(
    {
      orderID: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
      },
      factoryID: {
        type: DataTypes.INTEGER,
        references: {
          model: Factories,
          key: 'id',
        },
      },
      segmentID: {
        type: DataTypes.INTEGER,
        references: {
          model: Segments,
          key: 'id',
        },
      },
      segmentName: {
        type: DataTypes.VIRTUAL,
        references: {
          model: 'Segments',
          key: 'segmentName',
        },
      },
      status: {
        type: DataTypes.ENUM,
        values: ['costurando', 'costurado'],
        defaultValue: 'costurando',
        allowNull: false,
      },
      saidaParaCostura: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      quantidadeDeSaida: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      retiradaDaCostura: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      quantidadeDeRetorno: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
