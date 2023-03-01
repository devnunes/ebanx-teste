import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../src/app";

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

describe("Reset routes", () => {
  // # Reset state before starting tests
  // - POST 200 /reset
  // OK
  it("Reset state before starting tests", async () => {
    const postReset = await request(app.server).get("/reset").expect(200);
    expect(postReset).toEqual("OK");
  });
});
