const models = require('../database/models/index');
const { Op, Sequelize, and } = require('sequelize');
const Segments = require('../database/models/segment.models');

const addNewOrder = async (request, response, next) => {
  try {
    const {
      segmentID,
      factoryID,
      status,
      saidaParaCostura,
      quantidadeDeSaida,
      retiradaDaCostura,
      quantidadeDeRetorno,
    } = request.body;

    if (
      !segmentID ||
      !factoryID ||
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

    const findSegmentID = await models.Segments.findByPk(segmentID);

    if (!findSegmentID) {
      return response.status(400).json({
        message: `O segmento ${segmentID} não foi encontrado.`,
      });
    }
    const findFactoryID = await models.Segments.findByPk(factoryID);
    if (!findFactoryID) {
      return response.status(400).json({
        message: `A confecção ${factoryID} não foi encontrada.`,
      });
    }

    const progress = Object.freeze({
      DONE: 'costurado',
      PENDING: 'costurando',
    });

    if (!Object.values(progress).includes(status)) {
      return response.status(400).json({
        message: 'Status inválido',
      });
    }

    const createNewOrder = await models.Orders.create(request.body);

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

// TODO
// Fix search thru segment and status altogheter
// const findPerStatus = async (request, response, next) => {
//   try {
//     const { status, segmento } = request.query;

//     if (status === 'todos') {
//       return response.json({
//         status: await models.Orders.findAndCountAll(),
//       });
//     }

//     if (!status || !segmento) {
//       return response.json({
//         message: 'Todos os campos devem ser preenchidos',
//       });
//     }

//     const findSegmentName = await models.Segments.findOne({
//       include: { model: sequelize.models.Segments, as: 'segmentNameInOrders' },
//       where: { name: segmento },
//     });

//     if (!findSegmentName.name) {
//       return response.json({
//         message: 'Não existem pedidos com este segmento 2',
//       });
//     }

//     const findAllOrdersPerStatusAndSegment = await models.Orders.findAll({
//       include: { model: Segments.name },
//       where: Sequelize.and([
//         { status: status, segmento: Sequelize.col('Segments.name') },
//       ]),
//     });

//     if (!findAllOrdersPerStatusAndSegment) {
//       return response.json({
//         message: `Não existem pedidos com o status ${status} e segmento ${findSegmentName}`,
//       });
//     }

//     return response.json({
//       status,
//       findAllOrdersPerStatusAndSegment,
//     });
//   } catch (error) {
//     next(error);
//     return response.status(500).json({
//       error: error.message,
//     });
//   }
// };

const findAllOrders = async (request, response, next) => {
  try {
    const findAll = await models.Orders.findAll();

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
};
