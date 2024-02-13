'use strict';
const models = require('../models/index');
const Factories = require('../models/factory.models');
const Segments = require('../models/segment.models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      orderID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      factoryID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Factories',
          key: 'id',
        },
      },
      factoryName: {
        type: Sequelize.STRING,
      },
      segmentID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Segments',
          key: 'id',
        },
      },
      segmentName: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['costurando', 'costurado'],
        defaultValue: 'costurando',
        allowNull: true,
      },
      saidaParaCostura: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      quantidadeDeSaida: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      retiradaDaCostura: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      quantidadeDeRetorno: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  },
};
