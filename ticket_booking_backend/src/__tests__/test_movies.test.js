const request = require('supertest');
const app = require('../app');
const db = require('../config/db');

describe('/movies API', () => {
  // Clean up movies before and after tests for isolation
  beforeAll(async () => {
    // Connect and truncate movies table (for test isolation)
    await db.query('DELETE FROM movies');
  });
  afterAll(async () => {
    await db.query('DELETE FROM movies');
    await db.end && db.end(); // cleanup pool if needed
  });

  describe('GET /movies', () => {
    it('returns empty array when no movies', async () => {
      const res = await request(app).get('/movies');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(0);
    });
    it('returns inserted movies', async () => {
      // Insert test movie directly via DB for control
      await db.query(
        'INSERT INTO movies (title, description, release_date, duration) VALUES (?, ?, ?, ?)',
        ['Test Movie', 'A test description.', '2024-01-01', 120]
      );
      const res = await request(app).get('/movies');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0].title).toBe('Test Movie');
      expect(res.body[0]).toHaveProperty('id');
    });
  });

  describe('POST /movies', () => {
    it('creates a new movie with valid data', async () => {
      const body = {
        title: 'Another Movie',
        description: 'Desc',
        release_date: '2024-07-01',
        duration: 130
      };
      const res = await request(app).post('/movies').send(body);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.title).toBe(body.title);

      // Ensure it appears in GET /movies
      const getRes = await request(app).get('/movies');
      expect(getRes.body.map(m => m.title)).toContain(body.title);
    });

    it('fails with 400 for missing required fields', async () => {
      const res = await request(app).post('/movies').send({ title: 'No Date or Duration' });
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/required fields/i);
    });

    it('handles DB/server errors gracefully', async () => {
      // Patch db.query to simulate a failure just for this test
      const origQuery = db.query;
      db.query = () => { throw new Error('Simulated DB error'); };
      const body = {
        title: 'Will Fail',
        description: 'Desc',
        release_date: '2025-01-01',
        duration: 115
      };
      const res = await request(app).post('/movies').send(body);
      expect(res.status).toBe(500);
      expect(res.body.message).toMatch(/error/i);
      db.query = origQuery; // Restore
    });
  });
});
