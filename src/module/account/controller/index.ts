import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { accounts } from "../../../app";

export default class AccountController {
  public async findOne(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<Response> {
    const getBalanceSchema = z.object({
      account_id: z.string(),
    });
    try {
      const { account_id } = getBalanceSchema.parse(request.query);
      const accountBalance = accounts.findIndex(item => item.id === account_id);
      if (accountBalance < 0) return reply.status(404).send(0);
      return reply.status(200).send(accounts[accountBalance].balance);
    } catch (error) {
      return reply.status(404).send(0);
    }
  }

  public async update(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<Response> {
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
        const accountFounded = accounts.findIndex(
          account => account.id === destination
        );
        if (accountFounded >= 0) {
          transaction.deposit(accountFounded, amount);
          return reply
            .status(201)
            .send({ destination: accounts[accountFounded] });
        }
        accounts.push({ id: destination, balance: amount });
        const amountDeposited = accounts.findIndex(item => item.id);

        return reply
          .status(201)
          .send({ destination: accounts[amountDeposited] });
      }

      if (type === "withdraw") {
        const accountFounded = accounts.findIndex(
          account => account.id === origin
        );
        if (accountFounded < 0) return reply.status(404).send(0);
        transaction.withdraw(accountFounded, amount);
        return reply.status(201).send({ origin: accounts[accountFounded] });
      }

      if (type === "transfer") {
        const accountOrigin = accounts.findIndex(
          account => account.id === origin
        );
        if (accountOrigin < 0) return reply.status(404).send(0);
        if (destination === undefined) return reply.status(404).send();

        const accountDestination = accounts.findIndex(
          account => account.id === destination
        );
        if (accountDestination < 0) {
          transaction.withdraw(accountOrigin, amount);
          accounts.push({ id: destination, balance: amount });

          const amountDeposited = accounts.findIndex(
            item => item.id === destination
          );

          return reply.status(201).send({
            origin: accounts[accountOrigin],
            destination: accounts[amountDeposited],
          });
        }

        transaction.withdraw(accountOrigin, amount);
        transaction.deposit(accountDestination, amount);

        return reply.status(201).send({
          origin: accounts[accountOrigin],
          destination: accounts[accountDestination],
        });
      }
    } catch (error) {
      console.error(error);
      return reply.status(404).send(error);
    }
  }
}
