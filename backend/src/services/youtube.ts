import { Innertube } from "youtubei.js";

let youtube: Innertube;

export async function getYoutube() {
  if (!youtube) {
    youtube = await Innertube.create();
  }

  return youtube;
}