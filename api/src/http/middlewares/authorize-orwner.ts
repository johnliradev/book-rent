import { FastifyReply, FastifyRequest } from "fastify";
import { ForbiddenError } from "../err/AppError";

export const authorizeOwner = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { userId } = request.user as { userId: string };
  const { id } = request.params as { id: string };
  if (userId !== id) {
    throw new ForbiddenError("You are not the owner of this resource");
  }
  return true;
};
