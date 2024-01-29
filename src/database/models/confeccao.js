'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Confeccao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Confeccao.init(
    {
      confeccaoID: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      confeccaoNome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      confeccaoEndereco: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      confeccaoTelefone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      confeccaoObservacao: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Confeccao',
    },
  );
  return Confeccao;
};
