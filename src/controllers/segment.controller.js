const models = require('../database/models/index');

const addNewSegment = async (request, response, next) => {
  try {
    const { name, price } = request.body;

    if (!name || !price) {
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
      message: 'Confecção criada',
      createNewSegment,
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
};