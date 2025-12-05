import { FastifyRequest, FastifyReply } from "fastify";
import { registerUser } from "./usecases/register-user";

export const registerUserController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, email, password } = request.body as {
    name: string;
    email: string;
    password: string;
  };
  const userId = await registerUser(name, email, password);
  return reply.status(201).send({
    message: "User registered successfully",
    userId,
  });
};
