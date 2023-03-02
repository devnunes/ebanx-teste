import fastify from "fastify";
import { IAccount } from "./global";
import { eventRoutes } from "./routes/event";
import { balanceRoutes } from "./routes/balance";

export const app = fastify();

export const accounts = [] as IAccount[];

app.register(eventRoutes, { prefix: "event" });
app.register(balanceRoutes, { prefix: "balance" });

app.get("/", async (request, reply) => {
  return reply.status(200).send("bem vindo");
});

// # Reset state before starting tests
// POST /reset
// 200 OK
app.post("/reset", async (request, reply) => {
  try {
    if (accounts.length >= 1) {
      accounts.length = 0;
      return reply.status(200).send("OK");
    }
    return reply.status(200).send("OK");
  } catch (error) {
    console.log(error);
  }
});
