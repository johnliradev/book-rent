import { env } from "./config/env";
import { buildServer } from "./lib/fastify";

const start = async () => {
  let server;
  try {
    server = await buildServer();
    await server.listen({ host: env.HOST, port: env.PORT });
    server.log.info(`🔥 Server is running on port ${env.PORT}`);
    server.log.info(
      `🔍 API documentation is available at http://${env.HOST}:${env.PORT}/api/docs`
    );
  } catch (error) {
    // Se app foi criado, use server.log, senão use console
    if (server) {
      server.log.error(error, "Error starting server");
    } else {
      console.error("Error building server:", error);
    }
    process.exit(1);
  }
};

start();
