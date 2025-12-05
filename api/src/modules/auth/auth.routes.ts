import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { loginController, registerUserController } from "./auth.controllers";

export const AuthRoutes = async (app: FastifyInstance) => {
  app.post(
    "/register",
    {
      schema: {
        description: "Register a new user",
        tags: ["Auth"],
        body: z.object({
          name: z
            .string("Name is required")
            .min(3, "Name must be at least 3 characters long"),
          email: z.email("invalid email").min(1, "Email is required"),
          password: z
            .string("Password is required")
            .min(8, "Password must be at least 8 characters long"),
        }),
        response: {
          200: z.object({
            message: z.string().default("User registered successfully"),
            userId: z.string(),
          }),
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) =>
      await registerUserController(request, reply)
  );
  app.post(
    "/login",
    {
      schema: {
        description: "Login a user",
        tags: ["Auth"],
        body: z.object({
          email: z.email("invalid email").min(1, "Email is required"),
          password: z
            .string("Password is required")
            .min(1, "Password is required"),
        }),
        response: {
          200: z.object({
            message: z.string().default("Login successful"),
            token: z.string(),
            user: z.object({
              id: z.number(),
              name: z.string().nullable(),
              email: z.string(),
            }),
          }),
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) =>
      await loginController(request, reply)
  );
};
