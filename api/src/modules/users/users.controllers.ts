import { FastifyRequest } from "fastify";
import { getAllUsers } from "./usecases/get-all-users";
import { findUserById } from "./usecases/find-user-by-id";
import { findUserByEmail } from "./usecases/find-user-by-email";

export const getAllUsersController = async (request: FastifyRequest) => {
  const users = await getAllUsers();
  return {
    users,
  };
};
export const getUserByIdController = async (request: FastifyRequest) => {
  const { id } = request.params as { id: string };
  const user = await findUserById(Number(id));
  return {
    user,
  };
};

export const getUserByEmailController = async (request: FastifyRequest) => {
  const { email } = request.query as { email: string };
  const user = await findUserByEmail(email);
  return {
    user,
  };
};
