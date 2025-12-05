import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AuthRoutes } from "../../modules/auth/auth.routes";

export const Router = async (app: FastifyInstance) => {
  await app.register(AuthRoutes, { prefix: "/auth" });
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
