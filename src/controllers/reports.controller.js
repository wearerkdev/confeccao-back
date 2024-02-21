const models = require('../database/models/index');
const { Op, Sequelize, literal } = require('sequelize');
const { gt } = Sequelize.Op;

const findDone = async (request, response, next) => {
  try {
    const totalOrdersPrice = await models.Orders.sum('orderPrice', {
      where: { isDone: true },
    });

    const finishedOrders = await models.Orders.findAll({
      where: { isDone: true },
    });

    const ordersWith_pecasFaltantes = await models.Orders.findAndCountAll({
      where: Sequelize.and([
        {
          pecasFaltantes: {
            [gt]: 1,
          },
          isDone: false,
        },
      ]),
    });

    if (!totalOrdersPrice) {
      return response.status(400).json({
        message:
          'Erro ao somar os  valores das ordens em aberto. Favor entrar em contato com o suporte.',
      });
    }

    if (!finishedOrders) {
      return response.status(400).json({
        message:
          'Erro ao recuperar ordens em aberto. Favor entrar em contato  com o suporte.',
      });
    }
    if (!ordersWith_pecasFaltantes) {
      return response.status(400).json({
        message:
          'Erro ao pesquisar por peças a serem entregues. Favor entrar em contato com o suporte.',
      });
    }

    return response.json({
      totalOrdersPrice,
      ordersWith_pecasFaltantes,
      finishedOrders,
    });
  } catch (error) {
    next(error);
    return response.status(500).json({
      message: 'Alguma coisa deu erro',
      errorMessage: error.message,
      errorStack: error.stack,
      errorStatus: error.status,
    });
  }
};

module.exports = {
  findDone,
};
