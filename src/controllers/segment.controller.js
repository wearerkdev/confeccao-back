const models = require('../database/models/index');
const { Op, Sequelize } = require('sequelize');

const addNewSegment = async (request, response, next) => {
  try {
    const { segmentName, price } = request.body;

    if (!segmentName || !price) {
      return response.status(400).json({
        message: 'Todos os campos devem ser preenchidos',
      });
    }

    if (isNaN(price)) {
      return response.status(400).json({
        message: 'Preço deve ser apenas números',
      });
    }

    const createNewSegment = await models.Segments.create(request.body);

    return response.status(201).json({
      message: 'Segmento criado',
      createNewSegment,
    });
  } catch (error) {
    next(error);
    return response.status(500).json({
      error: error.message,
    });
  }
};

const findSegmentByID = async (request, response, next) => {
  try {
    const { id } = request.params;
    const segment = await models.Segments.findByPk(id);

    if (!segment) {
      return response.json({
        message: `Segmento com id ${id} não foi encontrada.`,
      });
    }

    return response.json({
      segment,
    });
  } catch (error) {
    next(error);
    return response.status(500).json({
      error: error.message,
    });
  }
};

const findAllSegments = async (request, response, next) => {
  try {
    const listAllSegments = await models.Segments.findAndCountAll();

    return response.json({
      message: 'Listagem de todos os segmentos',
      listAllSegments,
    });
  } catch (error) {
    next(error);
    return response.status(500).json({
      error: error.message,
    });
  }
};

const updateSegment = async (request, response, next) => {
  try {
    const { id } = request.params;
    const segment = await models.Segments.findByPk(id);

    if (!segment) {
      return response.json({
        message: `Segmento com id ${id} não foi encontrado.`,
      });
    }

    const updateData = await models.Segments.update(
      { ...request.body },
      {
        where: {
          id,
        },
      },
    );

    return response.status(200).json({
      message: 'Dados do segmento foram atualizados',
    });
  } catch (error) {
    next(error);
    return response.status(500).json({
      message: 'Alguma coisa deu erro',
      error: error.message,
    });
  }
};

const deleteSegment = async (request, response, next) => {
  try {
    const { id } = request.params;
    const findSegment = await models.Segments.findByPk(id);

    if (!id) {
      return response.status(400).json({
        message: 'Precisa informar id do segment.',
      });
    }

    if (!findSegment) {
      return response.status(404).json({
        message: `Segmento com id ${id} não foi encontrado. Tem certeza que é o id correto?`,
      });
    }

    const segmentToDelete = await models.Segments.destroy({
      where: { id },
    });

    return response.status(200).json({
      message: 'Segmento excluído com sucesso',
      segmentToDelete,
    });
  } catch (error) {
    next(error);
    return response.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  addNewSegment,
  findSegmentByID,
  findAllSegments,
  updateSegment,
  deleteSegment,
};
