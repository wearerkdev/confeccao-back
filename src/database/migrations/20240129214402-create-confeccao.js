'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Confeccao', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      confeccaoID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      confeccaoNome: {
        type: Sequelize.STRING,
      },
      confeccaoEndereco: {
        type: Sequelize.STRING,
      },
      confeccaoTelefone: {
        type: Sequelize.STRING,
      },
      confeccaoObservacao: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Confeccao');
  },
};
