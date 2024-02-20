const models = require('../database/models/index');
const { Op, Sequelize } = require('sequelize');

const findDone = async (request, response, next) => {
  const done = await models.Orders.findAll({
    where: { isDone: true },
  });

  console.log('done', done);
};

module.exports = {
  findDone,
};
