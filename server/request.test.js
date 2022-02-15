import {
  returnData,
  getEquipmentFromChar,
  getEquippedImages,
} from "./request.js";
// const returnData = require("./request");
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

test("Check request", async () => {
  const res = await returnData(
    apiKey,
    `${baseUrl}${getCharacter}${queryParams}${inventory}`
  );
  console.log(res);
  // expect(res.equipment.data.items.length).toBe(17);
});
