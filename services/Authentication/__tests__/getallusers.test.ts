import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app/api/app';  
import { describe, it } from 'node:test';

describe('Accounts API (GET /accounts)', () => {
  // Mock data
  const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJtYW5hZ2VyIiwiaWF0IjoxNzM0MzkxMTM3LCJleHAiOjE3MzQzOTQ3Mzd9.b3pHn53YAerbAXR52pxfYYYtv9BzPnRe8DZa4mVw7PE'; 
  const invalidToken = 'invalid-token';
  const nonManagerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJtYW5hZ2VyIiwiaWF0IjoxNzM0MzkxMTM3LCJleHAiOjE3MzQzOTQ3Mzd9.b3pHn';

  it('should retrieve all accounts when authorized as manager', async () => {
    const res = await request(app)
      .get('/accounts')
      .set('Authorization', `Bearer ${validToken}`)
      .set('Content-Type', 'application/json');

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.greaterThan(0);
    expect(res.body[0]).to.have.property('id');
    expect(res.body[0]).to.have.property('username');
  });

  it('should retrieve filtered accounts based on query parameters', async () => {
    const res = await request(app)
      .get('/accounts?firstName=john&lastName=doe')
      .set('Authorization', `Bearer ${validToken}`)
      .set('Content-Type', 'application/json');

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.greaterThan(0);
    expect(res.body[0].first_name).to.equal('john');
    expect(res.body[0].last_name).to.equal('doe');
  });

  it('should return 403 if token is missing', async () => {
    const res = await request(app)
      .get('/accounts')
      .set('Content-Type', 'application/json'); // No Authorization header

    expect(res.status).to.equal(403);
    expect(res.body).to.have.property('error', 'Token is invalid or expired');
  });

  it('should return 403 if token is invalid', async () => {
    const res = await request(app)
      .get('/accounts')
      .set('Authorization', `Bearer ${invalidToken}`)
      .set('Content-Type', 'application/json');

    expect(res.status).to.equal(403);
    expect(res.body).to.have.property('error', 'Token is invalid or expired');
  });

  it('should return 403 if user role is not manager', async () => {
    const res = await request(app)
      .get('/accounts')
      .set('Authorization', `Bearer ${nonManagerToken}`)
      .set('Content-Type', 'application/json');

    expect(res.status).to.equal(403);
    expect(res.body).to.have.property('error', 'Access forbidden: Requires one of the roles: manager');
  });
});

