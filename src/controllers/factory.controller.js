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
      DONE: 'costurado',
      PENDING: 'costurando',
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
    const factory = await models.Factories.findByPk(id);

    if (!factory) {
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

    if (status === 'todos') {
      return response.json({
        status: await models.Factories.findAll(),
      });
    }

    const findFactoriesPerStatus = await models.Factories.findAll({
      where: { status },
    });
    return response.json({
      status,
      findFactoriesPerStatus,
    });
  } catch (error) {
    next(error);
    return response.status(500).json({
      error: error.message,
    });
  }
};

const updateFactory = async (request, response, next) => {
  try {
    const { id } = request.params;
    const factory = await models.Factories.findByPk(id);

    if (!factory) {
      return response.json({
        message: `Confecção com id ${id} não foi encontrada.`,
      });
    }

    const updateData = await models.Factories.update(
      { ...request.body },
      {
        where: {
          id,
        },
      },
    );

    return response.status(200).json({
      message: 'Dados da confecção foram atualizados',
    });
  } catch (error) {
    next(error);
    return response.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  addNewFactory,
  findFactoryByID,
  findAllFactories,
  findPerStatus,
  updateFactory,
};
