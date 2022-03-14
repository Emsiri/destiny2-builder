import {
  returnData,
  getEquipmentFromChar,
  getEquippedImages,
  getCharacterIDs,
  getmembershipId,
  getVaultItems,
} from "./request.js";

const membershipType = `3`;
const displayName = "Emsiri%230594";
const membershipId = "4611686018468712969";
const characterId = "2305843009300358704";

const apiKey = process.env.apiKey;
const baseUrl = `https://www.bungie.net/platform`;
const searchDestinyPlayer = `/Destiny2/SearchDestinyPlayer/${membershipType}/${displayName}/`;
const getProfile = `/Destiny2/${membershipType}/Profile/${membershipId}/`;
const queryParams = `?components=`;
const inventory = 205;

test("Check returnData", async () => {
  const getCharacter = `/Destiny2/${membershipType}/Profile/${membershipId}/Character/${characterId}`;
  const res = await returnData(
    apiKey,
    `${baseUrl}${getCharacter}${queryParams}${inventory}`
  );
  expect(res.status).toBe("ok");
  expect(res.equipment.data.items.length).toBe(17);
});

test("Check returnData throws an error", async () => {
  const characterId = "xxxxx";
  const getCharacter = `/Destiny2/${membershipType}/Profile/${membershipId}/Character/${characterId}`;
  try {
    const res = await returnData(
      apiKey,
      `${baseUrl}${getCharacter}${queryParams}${inventory}`
    );
  } catch (err) {
    expect(err.toString()).toMatch("Error: Error with request");
  }
});

test("Check getEquipmentFromChar throws an error", async () => {
  const characterId = "xxxxx";
  const getCharacter = `/Destiny2/${membershipType}/Profile/${membershipId}/Character/${characterId}`;
  try {
    const res = await getEquipmentFromChar(characterId);
  } catch (err) {
    expect(err.toString()).toMatch("Error: Error with request");
  }
});

test("Check getEquippedImages throws an error", async () => {
  const characterId = "xxxxx";
  try {
    const res = await getEquippedImages(characterId);
  } catch (err) {
    expect(err.toString()).toMatch("Error: Error with request");
  }
});

test("Check getEquipmentFromChar returns the equipped items", async () => {
  const res = await getEquipmentFromChar(characterId);
  expect(res.length).toBe(17);
});

test("Check getEquippedImages returns the equipped image urls", async () => {
  const res = await getEquippedImages(characterId);
  expect(res.length).toBe(17);
});

test("Check getVaultItems returns the profile vault", async () => {
  const res = await getVaultItems(membershipId);
  expect(res.status).toBe("ok");
  expect(typeof res.profileInventory.data.items).toBe("object");
});

test("Check getmembershipId returns membershipId", async () => {
  const res = await getmembershipId(displayName);
  expect(res.status).toBe("ok");
  expect(res[0].membershipId).toBe(membershipId);
});

test("Check getmembershipId with an invalid displayName contains an empty response", async () => {
  const displayName = "xxxxx";
  const res = await getmembershipId(displayName);
  expect(res).toHaveLength(0);
});

test("Check getCharacterIDs returns characters", async () => {
  const res = await getCharacterIDs(membershipId);
  const characterIds = [
    "2305843009300358704",
    "2305843009300358823",
    "2305843009379706723",
  ];
  expect(res.status).toBe("ok");
  expect(res.profile.data.characterIds.length).toBe(3);
  expect(res.profile.data.characterIds).toMatchObject(characterIds);
});

test("Check getCharacterIDs throws an error with an incorrect membershipId", async () => {
  const membershipId = "xxxxx";
  try {
    const res = await getCharacterIDs(membershipId);
  } catch (err) {
    expect(err.toString()).toMatch("Error: Error with request");
  }
});
