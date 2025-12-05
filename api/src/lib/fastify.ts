import { fastify, FastifyInstance } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import scalarApiReference from "@scalar/fastify-api-reference";
import { Router } from "../http/routes";
import { errorHandler } from "../http/err/error-handler";
import fastifyJwt from "@fastify/jwt";
import { env } from "../config/env";

export const server = fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

async function registerPlugins(server: FastifyInstance) {
  await server.register(fastifyCors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });
  await server.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Book Rent",
        description: "API for book rent",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });
  await server.register(Router, { prefix: "/api" });
  await server.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {
      expiresIn: "1h",
    },
  });
  await server.register(scalarApiReference, { routePrefix: "/api/docs" });
}

export const buildServer = async () => {
  try {
    server.log.info(`Server is starting on port 300`);
    await server.setErrorHandler(errorHandler);
    await registerPlugins(server);
    await server.ready();

    return server;
  } catch (error) {
    server.log.error(error, "Error building Fastify app");
    throw error;
  }
};
