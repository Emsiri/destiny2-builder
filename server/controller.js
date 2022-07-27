import { convertHashes } from "./utils/utilities.js";

export function parseEquippedItems(data) {
  let { equipment } = data;
  equipment = {
    items: equipment.data.items,
  };
  const equipmentedItemsHashes = equipment.items.map((el) =>
    convertHashes(el.itemHash)
  );
  return equipmentedItemsHashes;
}
