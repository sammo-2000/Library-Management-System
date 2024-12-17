import request from 'supertest'; 
import app from '../src/app/api/app'; 
import { describe, test } from 'node:test';
import { expect } from 'chai';

describe("POST /register", () => {
    describe("given a list of required sign-up credentials", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(app).post("/register").send({
                username: "user1",
                password: "password",
                first_name: "john",
                last_name: "doe",  
                email: "manager@gmail.com"
            });
            expect(response.statusCode).toBe(200);
        });
        test("should specify json in the content type header", async () => {
            const response = await request(app).post("/register").send({
                username: "user1",
                password: "password",
                first_name: "john",
                last_name: "doe",  
                email: "manager@gmail.com"
            });
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    });
    describe("when part or all required info isn't provided", () => {
        test("should respond with a status code of 400", async () => {
            const response = await request(app).post("/register").send(
                {
                    last_name: "doe",  
                    email: "manager@gmail.com"
                }
            )
            expect(response.statusCode).toBe(400)
        })
    })
});
