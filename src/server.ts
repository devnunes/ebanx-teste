import fastify from "fastify";
import { Account } from "./global";
import { balanceRoutes } from "./routes/balance";
import { eventRoutes } from "./routes/event";

const app = fastify();

export const balance = [] as Account[];

app.register(eventRoutes, { prefix: "event" });
app.register(balanceRoutes, { prefix: "balance" });

// # Reset state before starting tests
// POST /reset
// 200 OK
app.post("/reset", (request, response) => {
  return response.status(200).send("OK");
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log(`HTTP Server running on: http://localhost:3333`);
  });

// //GET /balance
// //POST /event
