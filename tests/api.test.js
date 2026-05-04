const request = require('supertest');
const app = require('../src/app');

// Mock the database module
jest.mock('../src/models/db', () => ({
  sequelize: {
    authenticate: jest.fn().mockResolvedValue(true),
    close: jest.fn().mockResolvedValue(true),
  },
  Sequelize: jest.fn(),
}));

describe('GET /api/info', () => {
  beforeEach(() => {
    process.env.APP_NAME = 'node56';
    process.env.APP_VERSION = '1.0.0';
  });

  it('should return 200 with app name, version and db status', async () => {
    const response = await request(app).get('/api/info');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'node56');
    expect(response.body).toHaveProperty('version', '1.0.0');
    expect(response.body).toHaveProperty('db');
    expect(response.body.db).toHaveProperty('status', 'connected');
  });

  it('should return JSON content type', async () => {
    const response = await request(app).get('/api/info');
    expect(response.headers['content-type']).toMatch(/application\/json/);
  });

  it('should return db status disconnected when DB is unavailable', async () => {
    const { sequelize } = require('../src/models/db');
    sequelize.authenticate.mockRejectedValueOnce(new Error('Connection refused'));

    const response = await request(app).get('/api/info');
    expect(response.status).toBe(200);
    expect(response.body.db.status).toBe('disconnected');
  });
});

describe('GET /api/unknown', () => {
  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/api/unknown');
    expect(response.status).toBe(404);
    expect(response.body.error).toBeDefined();
  });
});