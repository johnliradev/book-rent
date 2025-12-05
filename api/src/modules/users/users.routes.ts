import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { getAllUsersController } from "./users.controllers";

export const UsersRoutes = async (app: FastifyInstance) => {
  app.get(
    "/",
    {
      schema: {
        description: "Get all users",
        tags: ["Users"],
        response: {
          200: z.object({
            users: z.array(
              z.object({
                id: z.number(),
                name: z.string().nullable(),
                email: z.string(),
                createdAt: z.coerce.string(),
              })
            ),
          }),
        },
      },
    },
    async (request: FastifyRequest) => await getAllUsersController(request)
  );
};
