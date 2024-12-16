import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('ReservationController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /reservation', () => {
    it('should create a reservation and respond with 201 status code', async () => {
      const response = await request(app.getHttpServer())
        .post('/reservation')
        .send({
          mediaId: '1',
          accountId: '1',
          branchId: '1',
        })
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJtYW5hZ2VyIiwiaWF0IjoxNzM0MzA5NTMyLCJleHAiOjE3MzQzMTMxMzJ9.CaFEXGW-9dEcqfThE0xM2z-1yde5obdqOuUCpxdF2E4'); 
      expect(response.status).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          mediaId: '1',
          accountId: '1',
          branchId: '1',
          notificationSent: null,
          reservedAt: expect.any(String),
          collectedAt: null,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      );
    });

    it('should respond with 401 status code for invalid or expired token', async () => {
      const response = await request(app.getHttpServer())
        .post('/reservation')
        .send({
          mediaId: '1',
          accountId: '1',
          branchId: '1',
        })
        .set('Authorization', 'Bearer invalid_token');

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: 'Invalid or expired token',
        error: 'Unauthorized',
        statusCode: 401,
      });
    });

    it('should respond with 400 status code when required fields are missing', async () => {
      const response = await request(app.getHttpServer())
        .post('/reservation')
        .send({
          mediaId: '1',
          accountId: '1',
        })
        .set('Authorization', 'Bearer valid_token');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message'); // Check for validation error message
    });

    it('should respond with 400 status code for invalid input', async () => {
      const response = await request(app.getHttpServer())
        .post('/reservation')
        .send({
          mediaId: 'invalid',
          accountId: '1',
          branchId: '1',
        })
        .set('Authorization', 'Bearer valid_token');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message'); // Check for validation error message
    });
  });
});
