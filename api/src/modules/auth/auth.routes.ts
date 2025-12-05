import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
<<<<<<< HEAD
import { registerUserController } from "./auth.controllers";
=======
import { registerUserController } from "./auth.controller";
>>>>>>> 2b79af3c0fab79d84447479b0c2990fb62fa184f

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
<<<<<<< HEAD
    async (request: FastifyRequest, reply: FastifyReply) =>
      await registerUserController(request, reply)
=======
    (request: FastifyRequest, reply: FastifyReply) =>
      registerUserController(request, reply)
>>>>>>> 2b79af3c0fab79d84447479b0c2990fb62fa184f
  );
};
