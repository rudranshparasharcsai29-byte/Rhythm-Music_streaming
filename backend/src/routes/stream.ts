import { FastifyInstance } from "fastify";
import path from "path";
import { createRequire } from "module";

// CommonJS package ko ESM me safely load karne ke liye
const require = createRequire(import.meta.url);

const ytDlpWrapModule = require("yt-dlp-wrap");

const YTDlpWrap =
  ytDlpWrapModule.default ||
  ytDlpWrapModule;

const ytDlpPath = path.join(
  process.cwd(),
  "bin",
  "yt-dlp.exe"
);

const ytDlp = new YTDlpWrap(ytDlpPath);

export async function streamRoutes(
  fastify: FastifyInstance
) {
  fastify.get(
    "/stream/:id",
    async (request: any, reply) => {
      try {
        const { id } = request.params;

        const url = `https://www.youtube.com/watch?v=${id}`;

        const metadata =
          await ytDlp.getVideoInfo(url);

        // Stable audio-only formats
        const audioFormats =
          metadata.formats.filter(
            (f: any) =>
              f.acodec !== "none" &&
              f.vcodec === "none" &&
              f.url
          );

        if (!audioFormats.length) {
          return reply.status(404).send({
            success: false,
            message:
              "No audio-only formats found",
          });
        }

        // Prefer m4a for stable playback
        const bestAudio =
          audioFormats.find(
            (f: any) => f.ext === "m4a"
          ) ||
          audioFormats[audioFormats.length - 1];

        return reply.send({
          success: true,
          title: metadata.title,
          thumbnail: metadata.thumbnail,
          streamUrl: bestAudio.url,
        });
      } catch (error: any) {
        console.error(
          "STREAM ERROR:",
          error
        );

        return reply.status(500).send({
          success: false,
          message: "Failed to get stream",
          error:
            error?.message ||
            String(error),
        });
      }
    }
  );
}