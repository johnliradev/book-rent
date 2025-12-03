import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "./AppError";

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Se o erro for uma instância de AppError (erro customizado)
  // if it is an instance of AppError (custom error)
  if (error instanceof AppError) {
    reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      error: error.code,
      message: error.message,
    });
    return;
  }
  // Erros genéricos ou erros desconhecidos
  // Generic errors or unknown errors
  reply.status(500).send({
    statusCode: 500,
    error: "INTERNAL_SERVER_ERROR",
    message: "An unexpected error occurred",
  });
}
