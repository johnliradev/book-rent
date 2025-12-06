import { FastifyReply, FastifyRequest } from "fastify";
import { ForbiddenError } from "../err/AppError";
import { Role as RoleEnum } from "../../../generated/prisma/enums";

export const authorizeOwner = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { userId, role } = request.user as { userId: string; role: RoleEnum };
  const { id } = request.params as { id: string };
  if (userId !== id && role !== "ADMIN") {
    throw new ForbiddenError("You are not authorized to access this resource");
  }
  return true;
};
