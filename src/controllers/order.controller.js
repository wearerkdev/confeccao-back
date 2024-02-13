const models = require('../database/models/index');
const { Op, Sequelize, and } = require('sequelize');
const Segments = require('../database/models/segment.models');

const addNewOrder = async (request, response, next) => {
  try {
    const {
      segmentName,
      factoryName,
      status,
      saidaParaCostura,
      quantidadeDeSaida,
      retiradaDaCostura,
      quantidadeDeRetorno,
    } = request.body;

    if (
      !segmentName ||
      !factoryName ||
      !status ||
      !saidaParaCostura ||
      !quantidadeDeSaida ||
      !retiradaDaCostura ||
      !quantidadeDeRetorno
    ) {
      return response.status(400).json({
        message: 'Todos os campos devem ser preenchidos',
      });
    }

    const findSegmentName = await models.Segments.findOne({
      where: { segmentName: segmentName },
    });

    if (!findSegmentName) {
      return response.status(400).json({
        message: `O segmento ${segmentName} não foi encontrado.`,
      });
    }

    const findSegmentIDbyName = async function (segmentName) {
      const findName = await models.Segments.findOne({
        where: { segmentName: segmentName },
      });
      return findName.id;
    };

    if (!findSegmentName || !findSegmentIDbyName) {
      return response.status(400).json({
        message: `O segmento ${segmentName} não foi encontrado.`,
      });
    }

    const segmentID = await findSegmentIDbyName(segmentName);

    const findFactoryIDByName = async function (factoryName) {
      const findName = await models.Factories.findOne({
        where: { factoryName: factoryName },
      });
      return findName.id;
    };

    const findFactoryName = await models.Factories.findOne({
      where: { factoryName: factoryName },
    });

    if (!findFactoryName || !findFactoryIDByName) {
      return response.status(400).json({
        message: `A confecção ${factoryName} não foi encontrada.`,
      });
    }

    const factoryID = await findFactoryIDByName(factoryName);

    const progress = Object.freeze({
      DONE: 'costurado',
      PENDING: 'costurando',
    });

    if (!Object.values(progress).includes(status)) {
      return response.status(400).json({
        message: 'Status inválido',
      });
    }

    const data = {
      segmentName: request.body.segmentName,
      factoryName: request.body.factoryName,
      status: request.body.status,
      saidaParaCostura: request.body.saidaParaCostura,
      quantidadeDeSaida: request.body.quantidadeDeSaida,
      retiradaDaCostura: request.body.retiradaDaCostura,
      quantidadeDeRetorno: request.body.quantidadeDeRetorno,
      segmentID: segmentID,
      factoryID: factoryID,
    };

    const createNewOrder = await models.Orders.create(data);

    return response.status(201).json({
      message: 'Pedido criado',
      createNewOrder,
    });
  } catch (error) {
    next(error);
    return response.status(500).json({
      error: error.message,
    });
  }
};

const findPerStatus = async (request, response, next) => {
  try {
    const { status, segmento } = request.query;

    if (status === 'todos') {
      return response.json({
        status: await models.Orders.findAndCountAll(),
      });
    }

    if (!status || !segmento) {
      return response.status(400).json({
        message: 'Todos os campos devem ser preenchidos',
      });
    }

    const progress = Object.freeze({
      DONE: 'costurado',
      PENDING: 'costurando',
    });

    if (!Object.values(progress).includes(status)) {
      return response.status(400).json({
        message: `Status ${status} é inválido.`,
      });
    }

    const findSegmentName = await models.Segments.findOne({
      where: { segmentName: segmento },
    });

    if (!findSegmentName) {
      return response.status(400).json({
        message: `O segmento ${segmento} não foi encontrado.`,
      });
    }

    if (!findSegmentName) {
      return response.status(400).json({
        message: `O segmento ${segmento} não foi encontrado.`,
      });
    }

    const findAllOrdersPerStatusAndSegment =
      await models.Orders.findAndCountAll({
        where: Sequelize.and([{ status: status, segmentName: segmento }]),
      });

    if (!findAllOrdersPerStatusAndSegment) {
      return response.json({
        message: `Não existem pedidos com o status ${status} e segmento ${findSegmentName}`,
      });
    }

    return response.json({
      status,
      findAllOrdersPerStatusAndSegment,
    });
  } catch (error) {
    next(error);
    return response.status(500).json({
      error: error.message,
    });
  }
};

const findAllOrders = async (request, response, next) => {
  try {
    const findAll = await models.Orders.findAndCountAll({
      order: [['id', 'DESC']],
    });

    return response.json({
      message: 'Listagem de todos os pedidos',
      findAll,
    });
  } catch (error) {
    next(error);
    return response.status(500).json({
      error: error.message,
    });
  }
};

const findAllPendingOrders = async (request, response, next) => {
  try {
    const findAll = await models.Orders.findAndCountAll({
      order: [['id', 'DESC']],
      where: { status: 'costurando' },
    });

    return response.json({
      message: 'Listagem de todos os pedidos',
      findAll,
    });
  } catch (error) {
    next(error);
    return response.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  addNewOrder,
  findPerStatus,
  findAllOrders,
  findAllPendingOrders,
};
