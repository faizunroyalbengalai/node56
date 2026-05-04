const { sequelize } = require('../models/db');
const logger = require('../utils/logger');

const getInfo = async (req, res, next) => {
  let dbStatus = 'disconnected';

  try {
    await sequelize.authenticate();
    dbStatus = 'connected';
  } catch (error) {
    logger.warn('Database health check failed:', error.message);
    dbStatus = 'disconnected';
  }

  try {
    return res.status(200).json({
      name: process.env.APP_NAME || 'node56',
      version: process.env.APP_VERSION || '1.0.0',
      db: {
        status: dbStatus,
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getInfo };