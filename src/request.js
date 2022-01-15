import fetch from "node-fetch";
import dotenv from 'dotenv';
import { openDb, closeDB, queryManifest } from "./manifest.js";
dotenv.config();
const membershipType = `3`
const displayName = 'Emsiri%230594'
const destinyMembershipId = '4611686018468712969'
const characterId = '2305843009300358704'


const apiKey = process.env.apiKey
const baseUrl = `https://www.bungie.net/platform`
const searchDestinyPlayer = `/Destiny2/SearchDestinyPlayer/${membershipType}/${displayName}/`
const getCharacter = `/Destiny2/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}`
const getProfile = `/Destiny2/${membershipType}/Profile/${destinyMembershipId}/`
const queryParams = `?components=`
const inventory = 205

const url = `${baseUrl}${getCharacter}${queryParams}${inventory}`

async function returnData(apiKey, url) {
  try {
    const res = await fetch(url, {method: 'GET', headers: {
      "X-API-Key": apiKey
    }})
    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(`Error with request ${data.message}`)
    }
    return data.Response
  } catch (err){
    console.log(err)
  }
  
}

async function getEquipmentFromChar (characterId) {
  let {equipment} = await returnData(apiKey, `${baseUrl}${getCharacter}${queryParams}${inventory}`)
  equipment = {
    items: equipment.data.items
  }
  const equipmentedItemsHashes = equipment.items.map(el => el.itemHash >> 32)
  return equipmentedItemsHashes;
}

// (async function() {
//   const db = await openDb();
//   const equippedItemsHashes = await getEquipmentFromChar(characterId)
//   const resultArray = await Promise.all(equippedItemsHashes.map(async (hash) => queryManifest(db, 'DestinyInventoryItemDefinition', hash)));
//   const parsedResult = resultArray.map(el => {
//     const parsedData = JSON.parse(el.json);
//     const imageUrl = parsedData.displayProperties.icon
//     return imageUrl;
//   })
//   const fullImageUrls = parsedResult.map(el => `https://www.bungie.net/${el}`)
//   console.log(fullImageUrls)
//   closeDB(db);
// })()

export async function getEquppedImages(characterId) {
  const db = await openDb();
  const equippedItemsHashes = await getEquipmentFromChar(characterId)
  const resultArray = await Promise.all(equippedItemsHashes.map(async (hash) => queryManifest(db, 'DestinyInventoryItemDefinition', hash)));
  const parsedResult = resultArray.map(el => {
    const parsedData = JSON.parse(el.json);
    const imageUrl = parsedData.displayProperties.icon
    return imageUrl;
  })
  const fullImageUrls = parsedResult.map(el => `https://www.bungie.net/${el}`)
  console.log(fullImageUrls)
  closeDB(db);
}
