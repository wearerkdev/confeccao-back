const { Sequelize } = require('sequelize');
const models = require('../database/models/index');

const addNewFactory = async (request, response, next) => {
  try {
    const { factoryName, address, phoneNumber } = request.body;

    if (!factoryName || !address || !phoneNumber) {
      return response.status(400).json({
        message: 'Todos os campos devem ser preenchidos',
      });
    }

    if (phoneNumber.length > 11) {
      return response.status(400).json({
        message: 'Número de telefone não pode possuir mais que 11 dígitos',
      });
    }

    const phoneNumberAlreadyExists = await models.Factories.findOne({
      where: { phoneNumber },
    });

    if (phoneNumberAlreadyExists) {
      return response.status(400).json({
        message: 'Este número de telefone já está cadastrado.',
      });
    }

    const createNewFactory = await models.Factories.create(request.body);

    return response.status(201).json({
      message: 'Confecção criada com sucesso.',
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

    if (!id || isNaN(id)) {
      return response.status(400).json({
        message: `É necessário informar um id.`,
      });
    }

    if (!factory) {
      return response.status(404).json({
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
        'factoryName',
        'address',
        'phoneNumber',
        'isNumberWhatsapp',
        'observation',
      ],
    });

    if (listAllFactories.count === 0) {
      return response.status(404).json({
        message: 'Não tem nenhuma confecção cadastrada.',
      });
    }

    return response.status(200).json({
      message: 'Listagem de todas as confecções',
      listAllFactories,
    });
  } catch (error) {
    next(error);
    return response.status(500).json({
      error: error.message,
    });
  }
};

const updateOneFactory = async (request, response, next) => {
  try {
    const { id } = request.params;
    const factory = await models.Factories.findByPk(id);
    const fieldsFromBody = request.body;

    if (!id || isNaN(id)) {
      return response.status(400).json({
        message: `É necessário informar um id.`,
      });
    }

    if (!factory) {
      return response.status(404).json({
        message: `Confecção com id ${id} não foi encontrada.`,
      });
    }

    if (fieldsFromBody?.phoneNumber && fieldsFromBody.phoneNumber.length > 11) {
      return response.status(400).json({
        message: 'Número de telefone não pode possuir mais que 11 dígitos',
      });
    }

    if (
      !Boolean(
        fieldsFromBody?.isNumberWhatsapp &&
          fieldsFromBody.isNumberWhatsapp !== typeof 'boolean',
      )
    ) {
      return response.status(400).json({
        message:
          "O valor para 'Número é Whatsapp?' deve ser apenas 'sim' ou 'não'.",
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
      updateData,
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

    if (!id || isNaN(id)) {
      return response.status(400).json({
        message: `É necessário informar um id.`,
      });
    }

    if (!findFactory) {
      return response.status(404).json({
        message: `Confecção com id ${id} não foi encontrada. Tem certeza que é o id correto?`,
      });
    }

    const existOrders = await models.Orders.findAndCountAll({
      where: Sequelize.and([{ factoryID: id, status: 'costurando' }]),
    });

    const findOrdersID = await models.Orders.findAll({
      where: Sequelize.and([{ factoryID: id, status: 'costurando' }]),
    });

    const listOrdersID = findOrdersID.map(item => item.id).join(', ');

    if (existOrders) {
      return response.status(400).json({
        message: `Existe(m) ${existOrders.count} pedido(s) abertos com esta confecção. Finalize estes pedidos antes de deletar esta confecção. Os IDs do(s) pedido(s) são ${listOrdersID}`,
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
  updateOneFactory,
  deleteOneFactory,
};
