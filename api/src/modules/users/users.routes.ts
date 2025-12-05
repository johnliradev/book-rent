import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import {
  getAllUsersController,
  getUserByIdController,
  getUserByEmailController,
} from "./users.controllers";

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
  app.get(
    "/:id",
    {
      schema: {
        description: "Get user by id",
        tags: ["Users"],
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          200: z.object({
            user: z.object({
              id: z.number(),
              name: z.string().nullable(),
              email: z.string(),
              createdAt: z.coerce.string(),
            }),
          }),
        },
      },
    },
    async (request: FastifyRequest) => {
      return await getUserByIdController(request);
    }
  );

  app.get(
    "/email",
    {
      schema: {
        description: "Get user by email",
        tags: ["Users"],
        querystring: z.object({
          email: z.email("Invalid email"),
        }),
        response: {
          200: z.object({
            user: z.object({
              id: z.number(),
              name: z.string().nullable(),
              email: z.string(),
              createdAt: z.coerce.string(),
            }),
          }),
        },
      },
    },
    async (request: FastifyRequest) => {
      return await getUserByEmailController(request);
    }
  );
};
