import { AppError, ConflictError } from "../../../http/err/AppError";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import { findUserByEmail } from "../../users/usecases/find-user-by-email";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const userExists = await findUserByEmail(email);
  if (userExists) {
    throw new ConflictError("User");
  }
  const passwordHash = await bcrypt.hashSync(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password_hash: passwordHash },
  });
  if (!user) {
    throw new AppError("Failed to register user", 500, "USER_NOT_CREATED");
  }
  return user.id;
};
