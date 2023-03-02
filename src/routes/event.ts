import { FastifyInstance } from "fastify";
import { z } from "zod";
import { accounts } from "../app";

export async function eventRoutes(app: FastifyInstance) {
  const postEventSchema = z.object({
    type: z.enum(["withdraw", "deposit", "transfer"]),
    destination: z.string().optional(),
    origin: z.string().optional(),
    amount: z.number(),
  });

  const transaction = {
    withdraw: (accountIndexToBeupdated: number, amount: number) => {
      accounts[accountIndexToBeupdated].balance =
        accounts[accountIndexToBeupdated].balance - amount;
    },
    deposit: (accountIndexToBeupdated: number, amount: number) => {
      accounts[accountIndexToBeupdated].balance =
        accounts[accountIndexToBeupdated].balance + amount;
    },
  };

  app.post("/", async (request, reply) => {
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
  });
}
