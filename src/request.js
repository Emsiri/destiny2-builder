import fetch from "node-fetch";
import dotenv from 'dotenv';
import { openDB, closeDB, queryManifest } from "./manifest.js";
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
  // console.log(Object.values(equipment.items))
  const equipmentedItemsHashes = equipment.items.map(el => el.itemHash >> 32)
  return equipmentedItemsHashes;
}

// returnData(apiKey, url)
(async function() {
  // const equippedItems = await getEquipmentFromChar(characterId).then((hash) => {
    // console.log(hash);
    // hash.forEach(el => {
    //   queryManifest('DestinyInventoryItemDefinition', el)
    // });
    //(el => queryManifest('DestinyInventoryItemDefinition', el))
    // queryManifest('DestinyInventoryItemDefinition', hash)
  // })
  const db = openDB();
  const equippedItemsHashes = await getEquipmentFromChar(characterId)
  const equippedItemsHashesFirst = equippedItemsHashes[0]
  console.log(equippedItemsHashesFirst)
  const equippedItems = queryManifest(db, 'DestinyInventoryItemDefinition', equippedItemsHashes[0]);
  // console.log(equippedItemsHashes)
  console.log(equippedItems)
  closeDB(db);
  // const equippedItemsImages = await equippedItems.flat().map(el => el)
  // console.log(equippedItemsImages);
})()

// getEquipmentFromChar(characterId)
// .then((hash) => hash.map(hash => queryManifest('DestinyInventoryItemDefinition', hash)))
// .then(el => el.displayProperties)

// .then(data => console.log(data))
// .then(data => console.log(data.Response.profileInventory))
// .then(data => console.log(data.Response.character.data))
// .then(data => console.log(data.Response.profile.data.characterIds))
// .catch(err => console.log(err))
