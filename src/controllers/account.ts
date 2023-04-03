import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import AccountService from "../services/accountService";
import TransactionService from "../services/transactionService";
class AccountController {
  async getBalance(request: FastifyRequest, reply: FastifyReply) {
    try {
      const getBalanceSchema = z.object({
        account_id: z.string(),
      });
      const { account_id } = await getBalanceSchema.parse(request.query);
      const account = AccountService.findOne(account_id);
      if (!account) return reply.status(404).send(0);
      return reply.status(200).send(account.balance);
    } catch (error) {
      return reply.status(404).send(0);
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const postEventSchema = z.object({
      type: z.enum(["withdraw", "deposit", "transfer"]),
      destination: z.string().optional(),
      origin: z.string().optional(),
      amount: z.number(),
    });
    try {
      const { type, destination, amount, origin } = await postEventSchema.parse(
        request.body
      );

      if (type === "deposit") {
        if (destination === undefined) return reply.status(404).send();
        if (!AccountService.findOne(destination)) {
          AccountService.createAccount(destination);
        }
        const accountUpdated = TransactionService.deposit(destination, amount);

        return reply.status(201).send({ destination: accountUpdated });
      }

      if (type === "withdraw") {
        if (origin === undefined) return reply.status(404).send();

        if (!AccountService.findOne(origin)) return reply.status(404).send(0);

        TransactionService.withdraw(origin, amount);
        const accountUpdated = AccountService.findOne(origin);

        return reply.status(201).send({ origin: accountUpdated });
      }

      if (type === "transfer") {
        if (origin === undefined) return reply.status(404).send();
        if (!AccountService.findOne(origin)) return reply.status(404).send(0);
        if (destination === undefined) return reply.status(404).send();
        if (!AccountService.findOne(destination)) {
          AccountService.createAccount(destination);
        }
        TransactionService.deposit(destination, amount);
        TransactionService.withdraw(origin, amount);
        const accountDestination = AccountService.findOne(destination);
        const accountOrigin = AccountService.findOne(origin);

        return reply.status(201).send({
          origin: accountOrigin,
          destination: accountDestination,
        });
      }
    } catch (error) {
      console.error(error);
      return reply.status(404).send(0);
    }
  }
}

export default new AccountController();
