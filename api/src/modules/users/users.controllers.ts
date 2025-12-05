import { FastifyRequest } from "fastify";
import { getAllUsers } from "./usecases/get-all-users";

export const getAllUsersController = async (request: FastifyRequest) => {
  const users = await getAllUsers();
  return {
    users,
  };
};
