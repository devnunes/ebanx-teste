import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function eventRoutes(app: FastifyInstance) {
  const postEventSchema = z.object({
    type: z.enum(["withdraw", "deposit", "transfer"]),
    destination: z.string().regex(/^\d+$/).transform(Number).optional(),
    origin: z.string().regex(/^\d+$/).transform(Number).optional(),
    amount: z.string().regex(/^\d+$/).transform(Number),
  });
  // # Create account with initial balance
  // POST /event {"type":"deposit", "destination":"100", "amount":10}
  // 201 {"destination": {"id":"100", "balance":10}}
  app.post("/", (request, reply) => {
    const { success } = postEventSchema.safeParse(request.body);

    return response.status(200);
  });

  // # Deposit into existing account
  // POST /event {"type":"deposit", "destination":"100", "amount":10}
  // 201 {"destination": {"id":"100", "balance":20}}

  // # Withdraw from non-existing account
  // POST /event {"type":"withdraw", "origin":"200", "amount":10}
  // 404 0

  // --
  // # Withdraw from existing account
  // POST /event {"type":"withdraw", "origin":"100", "amount":5}
  // 201 {"origin": {"id":"100", "balance":15}}

  // --
  // # Transfer from existing account
  // POST /event {"type":"transfer", "origin":"100", "amount":15, "destination":"300"}
  // 201 {"origin": {"id":"100", "balance":0}, "destination": {"id":"300", "balance":15}}

  // --
  // # Transfer from non-existing account
  // POST /event {"type":"transfer", "origin":"200", "amount":15, "destination":"300"}
  // 404 0
}
