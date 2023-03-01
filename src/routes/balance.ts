import { FastifyInstance } from "fastify";
import { z } from "zod";
import { balance } from "../app";

export async function balanceRoutes(app: FastifyInstance) {
  const getBalanceSchema = z.object({
    account_id: z.number(),
  });

  app.get("/", (request, reply) => {
    const { success } = getBalanceSchema.safeParse(request.body);
    console.log(request.query);
    if (success) {
      return reply.status(404).send(0);
    }
    const { account_id } = getBalanceSchema.parse(request.body);
    balance.find(item => item.account_id === account_id);
    return reply.status(200).send(balance);
  });
}
