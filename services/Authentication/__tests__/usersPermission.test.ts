import request from 'supertest';  
import app from '../src/app/api/app'; 
import { describe, test } from 'node:test';

describe("POST /users-permission", () => {

    describe("given a valid service name and token", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(app).post("/users-permission").send({
                service: "authentication",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJtYW5hZ2VyIiwiaWF0IjoxNzM0MzA1MjUxLCJleHAiOjE3MzQzMDg4NTF9.ViW__S8cKkrOoUmuJG3VZYs_3a-fcjLh-1U2IurOpdk"
            });
            expect(response.statusCode).toBe(200);
        });

        test("should return the correct user permissions in the response body", async () => {
            const response = await request(app).post("/users-permission").send({
                service: "authentication",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJtYW5hZ2VyIiwiaWF0IjoxNzM0MzA1MjUxLCJleHAiOjE3MzQzMDg4NTF9.ViW__S8cKkrOoUmuJG3VZYs_3a-fcjLh-1U2IurOpdk"
            });

            expect(response.body).toEqual({
                userId: 1,
                permission: {
                    forMe: {
                        create: false,
                        read: true,
                        update: true,
                        delete: true
                    },
                    forOthers: {
                        create: true,
                        read: true,
                        update: true,
                        delete: true
                    }
                }
            });
        });

        test("should specify json in the content type header", async () => {
            const response = await request(app).post("/users-permission").send({
                service: "authentication",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJtYW5hZ2VyIiwiaWF0IjoxNzM0MzA1MjUxLCJleHAiOjE3MzQzMDg4NTF9.ViW__S8cKkrOoUmuJG3VZYs_3a-fcjLh-1U2IurOpdk"
            });

            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        });
    });

    describe("when the token or service name is missing", () => {
        test("should respond with a 400 status code", async () => {
            const response = await request(app).post("/users-permission").send({
                service: "authentication"
            });
            expect(response.statusCode).toBe(400);
        });
    });

    describe("when the token is invalid", () => {
        test("should respond with a 403 status code and an error message", async () => {
            const response = await request(app).post("/users-permission").send({
                service: "authentication",
                token: "invalidToken"
            });

            expect(response.statusCode).toBe(403);
            expect(response.body).toHaveProperty("error", "Token is invalid or expired");
        });
    });
});
