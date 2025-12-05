import { NotFoundError } from "../../../http/err/AppError";
import { prisma } from "../../../lib/prisma";

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new NotFoundError("User");
  }
  return user;
};
