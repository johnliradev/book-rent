import { ValidationError } from "../../../http/err/AppError";
import bcrypt from "bcryptjs";
import { server } from "../../../lib/fastify";
import { prisma } from "../../../lib/prisma";

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new ValidationError("Invalid email or password");
  }
  const passwordMatch = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatch) {
    throw new ValidationError("Invalid email or password");
  }
  const token = await server.jwt.sign({ userId: user.id, role: user.role });
  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
};
