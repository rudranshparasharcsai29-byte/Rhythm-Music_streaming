import { FastifyInstance } from "fastify";
import { getYoutube } from "../services/youtube";

export async function searchRoutes(fastify: FastifyInstance) {
  fastify.get("/search", async (request: any, reply) => {
    try {
      const query = request.query.q;

      if (!query) {
        return reply.status(400).send({
          success: false,
          message: "Query required",
        });
      }

      const yt = await getYoutube();

      const results = await yt.search(query, {
        type: "video",
      });

      const songs = results.videos.slice(0, 10).map((video: any) => ({
        id: video.id,
        title: video.title?.text || "Unknown",
        artist: video.author?.name || "Unknown",
        duration: video.duration?.text || "0:00",
        thumbnail: video.thumbnails?.[0]?.url || null,
      }));

      return reply.send({
        success: true,
        results: songs,
      });
    } catch (error) {
      console.error(error);

      return reply.status(500).send({
        success: false,
        message: "Search failed",
      });
    }
  });
}