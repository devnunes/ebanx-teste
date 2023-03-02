import { FastifyInstance } from "fastify";
import { z } from "zod";
import { accounts } from "../app";

export async function balanceRoutes(app: FastifyInstance) {
  const getBalanceSchema = z.object({
    account_id: z.string(),
  });

  app.get("/", (request, reply) => {
    try {
      const { account_id } = getBalanceSchema.parse(request.query);
      const accountBalance = accounts.findIndex(item => item.id === account_id);
      if (accountBalance < 0) return reply.status(404).send(0);
      return reply.status(200).send(accounts[accountBalance].balance);
    } catch (error) {
      return reply.status(404).send(0);
    }
  });
}
