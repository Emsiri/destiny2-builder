import { openDb, closeDB, queryManifest } from "./db/manifest.js";
import { parseEquippedItems } from "./controller.js";
import { getEquipmentFromChar } from "./request/request.js";

export async function getEquippedImages(httpClient, characterId) {
  try {
    const db = await openDb();
    const { data } = await getEquipmentFromChar(httpClient, characterId);
    // console.log("Data is: ", data);
    const equippedItemsHashes = parseEquippedItems(data.Response);
    const resultArray = await Promise.all(
      equippedItemsHashes.map(async (hash) =>
        queryManifest(db, "DestinyInventoryItemDefinition", hash)
      )
    );
    const parsedResult = resultArray.map((el) => {
      const parsedData = JSON.parse(el.json);
      const equippedItemsObj = {
        name: parsedData.displayProperties.name,
        imageUrl: parsedData.displayProperties.icon,
        itemTypeDisplayName: parsedData.itemTypeDisplayName,
        sockets: parsedData?.sockets,
        socketEntries: parsedData?.sockets?.socketEntries,
        perks: parsedData.perks,
        traitIds: parsedData.traitIds,
        traitHashes: parsedData.traitHashes,
        hash: parsedData.hash,
        tierTypeName: parsedData.inventory.tierTypeName,
        stats: parsedData.stats.stats,
      };
      return equippedItemsObj;
      // console.log(`Equipped Items Object is: `, equippedItemsObj);
    });
    // const writeableData = JSON.stringify(parsedResult);
    // console.log(`WriteableData is: `, writeableData);
    closeDB(db);
    // fs.writeFile(`output/equippedItemsObj.json`, writeableData, (err) => {
    //   if (err) throw err;
    //   console.log("The file has been saved");
    // });
    return parsedResult;
  } catch (err) {
    throw new Error(`Error with getEquippedImages: ${err.message}`);
  }
}
