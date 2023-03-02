import { FastifyInstance } from "fastify";
import AccountController from "../controllers/account";

export async function eventRoutes(app: FastifyInstance) {
  app.post("/", AccountController.update);
}
