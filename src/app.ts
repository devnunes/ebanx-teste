import fastify from "fastify";
import { Account } from "./global";
import { eventRoutes } from "./routes/event";
import { balanceRoutes } from "./routes/balance";

export const app = fastify();

export const accounts = [] as Account[];

app.register(eventRoutes, { prefix: "event" });
app.register(balanceRoutes, { prefix: "balance" });

// # Reset state before starting tests
// POST /reset
// 200 OK
app.post("/reset", async (request, reply) => {
  try {
    if (accounts.length >= 1) {
      accounts.length = 0;
      return reply.status(200).send();
    }
    return reply.status(404).send();
  } catch (error) {
    console.log(error);
  }
});
