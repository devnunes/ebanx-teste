import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function eventRoutes(app: FastifyInstance) {
  const postEventSchema = z.object({
    type: z.enum(["withdraw", "deposit", "transfer"]),
    destination: z.string().regex(/^\d+$/).transform(Number).optional(),
    origin: z.string().regex(/^\d+$/).transform(Number).optional(),
    amount: z.string().regex(/^\d+$/).transform(Number),
  });

  app.post("/", (request, reply) => {
    const { success } = postEventSchema.safeParse(request.body);

    return response.status(200);
  });
}
