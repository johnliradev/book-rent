import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import {
  getAllUsersController,
  getUserByIdController,
  getUserByEmailController,
  deleteUserController,
  updateUserController,
} from "./users.controllers";
import { authenticate } from "../../http/middlewares/authenticate";
import { authorizeOwner } from "../../http/middlewares/authorize-orwner";

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

  app.delete(
    "/:id",
    {
      schema: {
        description: "Delete user by id",
        tags: ["Users"],
        params: z.object({
          id: z.coerce.number(),
        }),
        headers: z.object({
          authorization: z.string().min(1, "Token is required"),
        }),
        response: {
          204: z.null(),
        },
      },
      preHandler: [authenticate, authorizeOwner],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return await deleteUserController(request, reply);
    }
  );

  app.put(
    "/:id",
    {
      schema: {
        description: "Update user by id",
        tags: ["Users"],
        params: z.object({
          id: z.coerce.number(),
        }),
        body: z.object({
          name: z.string().min(3).optional(),
          email: z.email().optional(),
        }),
        headers: z.object({
          authorization: z.string().min(1, "Token is required"),
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
      preHandler: [authenticate, authorizeOwner],
    },
    async (request: FastifyRequest) => {
      return await updateUserController(request);
    }
  );
};
