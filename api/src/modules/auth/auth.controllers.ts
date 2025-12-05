import { FastifyRequest, FastifyReply } from "fastify";
import { registerUser } from "./usecases/register-user";
import { login } from "./usecases/login";

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

export const loginController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { email, password } = request.body as {
    email: string;
    password: string;
  };
  const { token, user } = await login(email, password);
  return reply.status(200).send({
    message: "Login successful",
    token,
    user,
  });
};
