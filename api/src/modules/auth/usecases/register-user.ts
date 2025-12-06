import { AppError, ConflictError } from "../../../http/err/AppError";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import { Role as RoleEnum } from "../../../../generated/prisma/enums";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: RoleEnum
): Promise<number> => {
  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    throw new ConflictError("User");
  }
  const passwordHash = await bcrypt.hashSync(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password_hash: passwordHash, role },
  });
  if (!user) {
    throw new AppError("Failed to register user", 500, "USER_NOT_CREATED");
  }
  return user.id;
};
