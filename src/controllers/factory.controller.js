const models = require('../database/models/index');

const addNewFactory = async (request, response, next) => {
  try {
    const { name, address, phoneNumber, status } = request.body;

    if (!name || !address || !phoneNumber) {
      return response.status(400).json({
        message: 'Todos os campos devem ser preenchidos',
      });
    }

    const progress = Object.freeze({
      DONE: 'done',
      PENDING: 'pending',
      ONGOING: 'ongoing',
    });

    if (!Object.values(progress).includes(status)) {
      return response.status(400).json({
        message: 'Status inválido',
      });
    }

    if (phoneNumber.length > 11) {
      return response.status(400).json({
        message: 'Número de telefone não pode possuir mais que 11 dígitos',
      });
    }

    const createNewFactory = await models.Factories.create(request.body);

    return response.status(201).json({
      message: 'Confecção criada',
      createNewFactory,
    });
  } catch (error) {
    next(error);
    return response.status(500).json({
      error: error.message,
    });
  }
};

const findFactoryByID = async (request, response, next) => {
  try {
    const { id } = request.params;
    const factory = await models.Factories.findOne({ where: { id } });

    if (!id) {
      return response.json({
        message: `Confecção com id ${id} não foi encontrada.`,
      });
    }

    return response.json({
      factory,
    });
  } catch (error) {
    next(error);
    return response.status(500).json({
      error: error.message,
    });
  }
};

const findAllFactories = async (request, response, next) => {
  try {
    const listAllFactories = await models.Factories.findAndCountAll({
      attributes: [
        'id',
        'factoryID',
        'name',
        'phoneNumber',
        'observation',
        'status',
      ],
    });

    return response.json({
      message: 'List da todas as confecções',
      listAllFactories,
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
    const { status } = request.query;

    const findFactoriesPerStatus = await models.Factories.findAll({
      where: { status },
    });
    return response.json({
      status,
      findFactoriesPerStatus,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addNewFactory,
  findFactoryByID,
  findAllFactories,
  findPerStatus,
};
