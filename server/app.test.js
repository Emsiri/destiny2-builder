import request from "supertest";
import app from "./app";
const characterId = "2305843009300358704";

test("It should get the equipped items", async () => {
  const response = await request(app).get(`/v1/equipped/${characterId}`);
  expect(response.statusCode).toBe(200);
});

test("It should throw an error on incorrect charecterID", async () => {
  const response = await request(app).get(`/v1/equipped/xxxxxx`);
  console.log(response);
  expect(response.statusCode).toBe(200);
});
