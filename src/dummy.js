import { getEquippedImages } from "./request.js";

const characterId = "2305843009300358704";
(async function () {
  const equippedItems = await getEquippedImages(characterId);
  let imageUrls = [];
  for (let el of equippedItems) {
    const fullUrl = `https://www.bungie.net/${el.imageUrl}`;
    imageUrls.push(fullUrl);
  }
  console.log(imageUrls);
})();
