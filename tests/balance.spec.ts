import { afterAll, beforeAll, expect, describe, it, beforeEach } from "vitest";
import request from "supertest";
import { accounts, app } from "../src/app";

describe("Balance routes", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    accounts.length = 0;
  });

  // # Get balance for non-existing account
  // - GET 404 /balance?account_id=1234
  // 0
  it("Get balance for non-existing account", async () => {
    const getBalance = await request(app.server)
      .get("/balance?account_id=1234")
      .expect(404);
    expect(getBalance.body).toEqual(0);
  });

  // # Get balance for existing account
  // - [ ] GET 200 /balance?account_id=100
  // 20
  it("Get balance for existing account", async () => {
    await request(app.server)
      .post("/event")
      .send({ type: "deposit", destination: "100", amount: 20 })
      .expect(201);

    const getBalance = await request(app.server)
      .get("/balance?account_id=100")
      .expect(200);
    expect(getBalance.body).toEqual(20);
  });
});
