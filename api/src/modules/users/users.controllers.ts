import { FastifyRequest, FastifyReply } from "fastify";
import { getAllUsers } from "./usecases/get-all-users";
import { findUserById } from "./usecases/find-user-by-id";
import { findUserByEmail } from "./usecases/find-user-by-email";
import { deleteUser } from "./usecases/delete-user";
import { updateUser } from "./usecases/update-user";

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

export const deleteUserController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  await deleteUser(Number(id));
  return reply.status(204).send();
};

export const updateUserController = async (request: FastifyRequest) => {
  const { id } = request.params as { id: string };
  const { name, email } = request.body as { name?: string; email?: string };
  const user = await updateUser(Number(id), { name, email });
  return {
    user,
  };
};
