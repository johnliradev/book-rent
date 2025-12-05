import { NotFoundError } from "../../../http/err/AppError";
import { prisma } from "../../../lib/prisma";

export const findUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new NotFoundError("User");
  }
  return user;
};
