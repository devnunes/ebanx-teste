import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../src/app";

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

describe("Event routes", () => {
  // # Create account with initial balance
  // - POST 201 /event {"type":"deposit", "destination":"100", "amount":10}
  // {"destination": {"id":"100", "balance":10}}
  it("Create account with initial balance", async () => {
    const postEventCreate = await request(app.server)
      .post("/event")
      .send({ type: "deposit", destination: "100", amount: 10 })
      .expect(201);
    expect(postEventCreate).toEqual({
      destination: { id: "100", balance: 10 },
    });
  });

  // # Deposit into existing account
  // - POST 201 /event {"type":"deposit", "destination":"100", "amount":10}
  // {"destination": {"id":"100", "balance":20}}
  it("Deposit into existing account", async () => {
    const postEventDeposit = await request(app.server)
      .post("/event")
      .send({ type: "deposit", destination: "100", amount: 10 })
      .expect(201);
    expect(postEventDeposit).toEqual({
      destination: { id: "100", balance: 20 },
    });
  });

  // # Withdraw from non-existing account
  // - POST 404 /event {"type":"withdraw", "origin":"200", "amount":10}
  // 0
  it("Withdraw from non-existing account", async () => {
    const postEventWithdraw = await request(app.server)
      .post("/event")
      .send({ type: "withdraw", origin: "200", amount: 10 })
      .expect(404);
    expect(postEventWithdraw).toEqual(0);
  });

  // # Withdraw from existing account
  // - POST 201 /event {"type":"withdraw", "origin":"100", "amount":5}
  // {"origin": {"id":"100", "balance":15}}
  it("Withdraw from existing account", async () => {
    const postEventWithdraw = await request(app.server)
      .post("/event")
      .send({ type: "withdraw", origin: "100", amount: 5 })
      .expect(201);
    expect(postEventWithdraw).toEqual({ origin: { id: "100", balance: 15 } });
  });

  // # Transfer from existing account
  // - POST 201 /event {"type":"transfer", "origin":"100", "amount":15, "destination":"300"}
  // {"origin": {"id":"100", "balance":0}, "destination": {"id":"300", "balance":15}}
  it("Transfer from existing account", async () => {
    const postEventTransfer = await request(app.server)
      .post("/event")
      .send({ type: "transfer", origin: "100", amount: 15, destination: "300" })
      .expect(201);
    expect(postEventTransfer).toEqual({
      origin: { id: "100", balance: 0 },
      destination: { id: "300", balance: 15 },
    });
  });

  // # Transfer from non-existing account
  // - POST 404 /event {"type":"transfer", "origin":"200", "amount":15, "destination":"300"}
  // 0
  it("Transfer from non-existing account", async () => {
    const postEventTransfer = await request(app.server)
      .post("/event")
      .send({ type: "transfer", origin: "200", amount: 15, destination: "300" })
      .expect(404);

    expect(postEventTransfer).toEqual(0);
  });
});
