import { afterAll, beforeAll, beforeEach, describe, it } from "vitest";
import request from "supertest";
import { app, accounts } from "../src/app";

describe("Reset routes", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  beforeEach(async () => {
    accounts.length = 0;
  });
  // # Reset state before starting tests
  // - POST 200 /reset
  // OK
  it("Reset state before starting tests", async () => {
    await request(app.server)
      .post("/event")
      .send({ type: "deposit", destination: "100", amount: 15 })
      .expect(201);
    await request(app.server).post("/reset").expect(200);
  });
});
