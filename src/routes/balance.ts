import { FastifyInstance } from "fastify";
import AccountController from "../controllers/account";

export async function balanceRoutes(app: FastifyInstance) {
  app.get("/", AccountController.getBalance);
}
