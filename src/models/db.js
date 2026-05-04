const { Sequelize } = require('sequelize');
const logger = require('../utils/logger');

const {
  DB_HOST = 'localhost',
  DB_PORT = 5432,
  DB_NAME = 'node56_db',
  DB_USER = 'postgres',
  DB_PASSWORD = '',
  DB_SSL = 'false',
  DB_POOL_MAX = 10,
  DB_POOL_MIN = 2,
  DB_POOL_ACQUIRE = 30000,
  DB_POOL_IDLE = 10000,
} = process.env;

const sslConfig = DB_SSL === 'true'
  ? { ssl: { require: true, rejectUnauthorized: false } }
  : {};

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  dialect: 'postgres',
  dialectOptions: {
    ...sslConfig,
  },
  pool: {
    max: parseInt(DB_POOL_MAX, 10),
    min: parseInt(DB_POOL_MIN, 10),
    acquire: parseInt(DB_POOL_ACQUIRE, 10),
    idle: parseInt(DB_POOL_IDLE, 10),
  },
  logging: (msg) => logger.debug(msg),
});

module.exports = { sequelize, Sequelize };