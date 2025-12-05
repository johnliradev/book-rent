import { AppError, NotFoundError } from "../../../http/err/AppError";
import { prisma } from "../../../lib/prisma";

interface UpdateUserData {
  name?: string;
  email?: string;
}

export const updateUser = async (id: number, data: UpdateUserData) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new NotFoundError("User");
  }
  const updatedUser = await prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      // Não retornar o campo senha
    },
  });
  if (!updatedUser) {
    throw new AppError("Failed to update user", 500, "USER_NOT_UPDATED");
  }
  return updatedUser;
};
