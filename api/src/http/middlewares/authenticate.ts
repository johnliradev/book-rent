import { FastifyRequest } from "fastify";
import { FastifyReply } from "fastify";
import { UnauthorizedError } from "../err/AppError";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await request.jwtVerify();
  } catch (err) {
    throw new UnauthorizedError("Invalid or expired token");
  }
}
