import { FastifyReply, FastifyRequest } from "fastify";
import { ForbiddenError } from "../err/AppError";
import { Role as RoleEnum } from "../../../generated/prisma/enums";

export const authorizeAdmin = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { role } = request.user as { role: RoleEnum };
  if (role !== "ADMIN") {
    throw new ForbiddenError("You are not authorized to access this resource");
  }
  return true;
};
