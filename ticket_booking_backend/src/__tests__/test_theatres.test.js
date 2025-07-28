const request = require('supertest');
const app = require('../app');
const db = require('../config/db');

describe('/theatres API', () => {
  beforeAll(async () => {
    await db.query('DELETE FROM theatres');
  });
  afterAll(async () => {
    await db.query('DELETE FROM theatres');
    await db.end && db.end();
  });

  describe('GET /theatres', () => {
    it('returns empty array when no theatres', async () => {
      const res = await request(app).get('/theatres');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(0);
    });

    it('returns inserted theatres', async () => {
      await db.query(
        'INSERT INTO theatres (name, location) VALUES (?, ?)',
        ['Test Theatre', 'Test City']
      );
      const res = await request(app).get('/theatres');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0].name).toBe('Test Theatre');
      expect(res.body[0]).toHaveProperty('id');
    });
  });

  describe('POST /theatres', () => {
    it('creates new theatre with valid data', async () => {
      const body = { name: 'Another Theatre', location: 'CityX' };
      const res = await request(app).post('/theatres').send(body);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe(body.name);

      // Ensure it appears in GET /theatres
      const getRes = await request(app).get('/theatres');
      expect(getRes.body.map(t => t.name)).toContain(body.name);
    });

    it('fails with 400 for missing fields', async () => {
      const res = await request(app).post('/theatres').send({ name: 'No Location' });
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/required fields/i);
    });

    it('handles DB/server errors gracefully', async () => {
      // Patch db.query to simulate a failure
      const origQuery = db.query;
      db.query = () => { throw new Error('Simulated DB error'); };
      const body = { name: 'Will Fail', location: 'Err' };
      const res = await request(app).post('/theatres').send(body);
      expect(res.status).toBe(500);
      expect(res.body.message).toMatch(/error/i);
      db.query = origQuery;
    });
  });
});
