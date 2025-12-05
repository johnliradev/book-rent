import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AuthRoutes } from "../../modules/auth/auth.routes";
<<<<<<< HEAD
import { UsersRoutes } from "../../modules/users/users.routes";

export const Router = async (app: FastifyInstance) => {
  await app.register(AuthRoutes, { prefix: "/auth" });
  await app.register(UsersRoutes, { prefix: "/users" });
=======

export const Router = async (app: FastifyInstance) => {
  await app.register(AuthRoutes, { prefix: "/auth" });
>>>>>>> 2b79af3c0fab79d84447479b0c2990fb62fa184f
  app.get(
    "/health",
    {
      schema: {
        description: "Health check endpoint",
        tags: ["Health"],
        response: {
          200: z.object({
            status: z.string(),
            timestamp: z.string(),
          }),
        },
      },
    },
    (request: FastifyRequest, reply: FastifyReply) =>
      reply.send({
        status: "OK",
        timestamp: new Date().toISOString(),
      })
  );
};
