import request from 'supertest';  
import app from '../src/app/api/app'; 
import { describe, test } from 'node:test';
import { expect } from 'chai';

describe("POST /signIn", () => {
    describe("given valid username and password", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(app).post("/signIn").send({
                username: "user1",
                password: "password",
            });
            expect(response.statusCode).toBe(200);
        });

        test("should specify json in the content type header", async () => {
            const response = await request(app).post("/signIn").send({
                username: "user1",
                password: "password",
            });
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        });

        test("should return a token in the response body", async () => {
            const response = await request(app).post("/signIn").send({
                username: "user1",
                password: "password",
            });
            expect(response.body).toHaveProperty("token");
            expect(typeof response.body.token).toBe("string");
        });
    });

    describe("when the username or password is missing", () => {
        test("should respond with a status code of 400", async () => {
            const response = await request(app).post("/signIn").send({
                username: "user1",
            });
            expect(response.statusCode).toBe(400);
        });
    });

    describe("when the username or password is invalid", () => {
        test("should respond with a status code of 401", async () => {
            const response = await request(app).post("/signIn").send({
                username: "user1",
                password: "wrongPassword",
            });
            expect(response.statusCode).toBe(401);
        });

        test("should include an error message in the response", async () => {
            const response = await request(app).post("/signIn").send({
                username: "user1",
                password: "wrongPassword",
            });
            expect(response.body).toHaveProperty("error");
            expect(response.body.error).toBe("Invalid email or password");
        });
    });
});
