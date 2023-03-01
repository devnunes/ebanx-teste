import { afterAll, beforeAll, expect, describe, it } from "vitest";
import request from "supertest";
import { app } from "../src/app";

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

describe("Balance routes", () => {
  // # Get balance for non-existing account
  // - GET 404 /balance?account_id=1234
  // 0
  it.only("Get balance for non-existing account", async () => {
    const getBalance = await request(app.server)
      .get("/balance?account_id=1234")
      .expect(404);
    expect(getBalance).toEqual(0);
  });

  // # Get balance for existing account
  // - [ ] GET 200 /balance?account_id=100
  // 20
  it("Get balance for existing account", async () => {
    const getBalance = await request(app.server)
      .get("/balance?account_id=1234")
      .expect(200);
    expect(getBalance).toEqual(20);
  });
});
