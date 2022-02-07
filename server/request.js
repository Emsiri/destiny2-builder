import fetch from "node-fetch";
import { openDb, closeDB, queryManifest } from "./manifest.js";
const membershipType = `3`;
const displayName = "Emsiri%230594";
const destinyMembershipId = "4611686018468712969";
const characterId = "2305843009300358704";

const apiKey = process.env.apiKey;
const baseUrl = `https://www.bungie.net/platform`;
const searchDestinyPlayer = `/Destiny2/SearchDestinyPlayer/${membershipType}/${displayName}/`;
const getCharacter = `/Destiny2/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}`;
const getProfile = `/Destiny2/${membershipType}/Profile/${destinyMembershipId}/`;
const queryParams = `?components=`;
const inventory = 205;

const url = `${baseUrl}${getCharacter}${queryParams}${inventory}`;

async function returnData(apiKey, url) {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "X-API-Key": apiKey,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Error with request ${data.message}`);
    }
    return data.Response;
  } catch (err) {
    console.log(err);
  }
}

async function getEquipmentFromChar(characterId) {
  let { equipment } = await returnData(
    apiKey,
    `${baseUrl}${getCharacter}${queryParams}${inventory}`
  );
  equipment = {
    items: equipment.data.items,
  };
  const equipmentedItemsHashes = equipment.items.map((el) => el.itemHash >> 32);
  return equipmentedItemsHashes;
}

export async function getEquippedImages(characterId) {
  const db = await openDb();
  const equippedItemsHashes = await getEquipmentFromChar(characterId);
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

    // console.log(equippedItemsObj);
    return equippedItemsObj;
  });
  closeDB(db);
  return parsedResult;
}

// getEquippedImages(characterId);
