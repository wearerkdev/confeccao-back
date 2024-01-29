'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Segmento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Segmento.init(
    {
      segmentoID: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      segmentoNome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      segmentoValor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Segmento',
    },
  );
  return Segmento;
};
