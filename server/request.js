import fetch from "node-fetch";
import { openDb, closeDB, queryManifest } from "./manifest.js";
const membershipType = `3`;
const displayName = "Emsiri%230594";
const membershipId = "4611686018468712969";
// const characterId = "2305843009300358704";

const apiKey = process.env.apiKey;
const baseUrl = `https://www.bungie.net/platform`;
const queryParams = `?components=`;
const inventory = 205;
const profiles = 100;
const ProfileInventories = 102;

// const url = `${baseUrl}${getCharacter}${queryParams}${inventory}`;

export async function returnData(apiKey, url) {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "X-API-Key": apiKey,
      },
    });
    const { Response } = await res.json();

    if (!res.ok) {
      throw new Error(`Error with request ${data.message}`);
    }
    Response.status = "ok";
    return Response;
  } catch (err) {
    throw new Error(`Error with request`, err);
  }
}

export async function getEquipmentFromChar(characterId) {
  const getCharacter = `/Destiny2/${membershipType}/Profile/${membershipId}/Character/${characterId}`;
  try {
    let { equipment } = await returnData(
      apiKey,
      `${baseUrl}${getCharacter}${queryParams}${inventory}`
    );
    equipment = {
      items: equipment.data.items,
    };
    const equipmentedItemsHashes = equipment.items.map(
      (el) => el.itemHash >> 32
    );
    return equipmentedItemsHashes;
  } catch (err) {
    throw new Error(`Error with request`, err);
  }
}

export async function getEquippedImages(characterId) {
  try {
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
  } catch (err) {
    throw new Error(`Error with request`, err);
  }
}

export async function getCharacterIDs(membershipId) {
  const getProfileUrl = `/Destiny2/${membershipType}/Profile/${membershipId}/`;
  let res = await returnData(
    apiKey,
    `${baseUrl}${getProfileUrl}${queryParams}${profiles}`
  );
  // return Response.profile.data.characterIds;
  return res;
}

export async function getmembershipId(displayName) {
  const getmembershipIdUrl = `/Destiny2/SearchDestinyPlayer/${membershipType}/${displayName}/`;
  let res = await returnData(apiKey, `${baseUrl}${getmembershipIdUrl}`);
  // console.log(res);
  return res;
}

export async function getVaultItems() {
  const getProfileUrl = `/Destiny2/${membershipType}/Profile/${membershipId}/`;
  let res = await returnData(
    apiKey,
    `${baseUrl}${getProfileUrl}${queryParams}${ProfileInventories}`
  );
  console.log(res.profileInventory.data.items.length);
  return res;
}
