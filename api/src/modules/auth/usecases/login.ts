import { ValidationError } from "../../../http/err/AppError";
import { findUserByEmail } from "../../users/usecases/find-user-by-email";
import bcrypt from "bcryptjs";
import { server } from "../../../lib/fastify";

export const login = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new ValidationError("Invalid email or password");
  }
  const passwordMatch = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatch) {
    throw new ValidationError("Invalid email or password");
  }
  const token = await server.jwt.sign({ userId: user.id });
  return { token, user: { id: user.id, name: user.name, email: user.email } };
};
