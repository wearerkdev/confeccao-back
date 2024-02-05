const models = require('../database/models/index');

const addNewFactory = async (request, response, next) => {
  try {
    const { name, address, phoneNumber } = request.body;

    if (!name || !address || !phoneNumber) {
      return response.status(400).json({
        message: 'Todos os campos devem ser preenchidos',
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
      attributes: ['id', 'factoryID', 'name', 'phoneNumber', 'observation'],
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

const deleteOneFactory = async (request, response, next) => {
  try {
    const { id } = request.params;
    const findFactory = await models.Factories.findByPk(id);

    if (!id) {
      return response.status(400).json({
        message: 'Precisa informar id da confecção.',
      });
    }

    if (!findFactory) {
      return response.status(404).json({
        message: `Confecção com id ${id} não foi encontrada. Tem certeza que é o id correto?`,
      });
    }

    const factoryToDelete = await models.Factories.destroy({
      where: { id },
    });

    return response.status(200).json({
      message: 'Confecção excluída com sucesso',
      factoryToDelete,
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
  updateFactory,
  deleteOneFactory,
};
