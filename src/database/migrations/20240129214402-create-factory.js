'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Factories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      factoryID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING(11),
      },
      isNumberWhatsapp: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      observation: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['costurando', 'costurado', 'todos'],
        defaultValue: 'costurando',
        allowNull: true,
      },
      saidaParaCostura: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      saidaParaCostura: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      quantidadeSaida: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      retiradaDaCostura: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      quantidadeRetorno: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Factories');
  },
};
