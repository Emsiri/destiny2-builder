import { getEquippedImages } from "./getEquippedImages.js";
import fetch from "node-fetch";

test("should respond with an array of image URLs when provided an array of hashes", async () => {
  // const hashes = [-226702489, -1699469560, 1967303408];
  const characterId = "2305843009300358704";
  const images = await getEquippedImages(fetch, characterId);
  expect(images.length).toBe(17);
  expect(images[0].imageUrl).toBeDefined();
});
