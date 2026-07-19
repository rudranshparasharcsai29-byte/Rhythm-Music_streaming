import Fastify from "fastify";
import { healthRoute } from "./routes/health";
import { searchRoutes } from "./routes/search";
import { streamRoutes } from "./routes/stream";
import { authRoutes } from "./routes/auth";
import databasePlugin from "./plugins/database";

const app = Fastify();

async function start() {
  try {
    await app.register(databasePlugin);

    await healthRoute(app);
    await searchRoutes(app);
    await streamRoutes(app);
    await authRoutes(app);

    await app.listen({
      port: 3000,
      host: "0.0.0.0",
    });

    console.log("🎵 Server running at http://localhost:3000");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

start();