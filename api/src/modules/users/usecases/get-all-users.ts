import { NotFoundError } from "../../../http/err/AppError";
import { prisma } from "../../../lib/prisma";

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
  if (!users) {
    throw new NotFoundError("Users");
  }
  return users;
};
