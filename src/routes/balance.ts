import { FastifyInstance } from "fastify";
import { z } from "zod";
import { balance } from "../server";

export async function balanceRoutes(app: FastifyInstance) {
  const getBalanceSchema = z.object({
    account_id: z.number(),
  });
  // # Get balance for non-existing account
  // GET /balance?account_id=1234
  // 404 0
  app.get("/", (request, reply) => {
    const { success } = getBalanceSchema.safeParse(request.body);
    console.log(request.query);
    if (success) {
      console.error("❗ Parametros inválidos");
      return reply.status(404).send(0);
    }
    const { account_id } = getBalanceSchema.parse(request.body);
    balance.find(item => item.account_id === account_id);
    return reply.status(200).send(balance);
  });

  // # Get balance for existing account
  // GET /balance?account_id=100
  // 200 20
  app.get("/balance", (request, reply) => {
    return reply.status(200).send(balance);
  });
}
