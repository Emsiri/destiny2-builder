import {
  returnData,
  getEquipmentFromChar,
  getEquippedImages,
} from "./request.js";

const membershipType = `3`;
const displayName = "Emsiri%230594";
const destinyMembershipId = "4611686018468712969";
const characterId = "2305843009300358704";

const apiKey = process.env.apiKey;
const baseUrl = `https://www.bungie.net/platform`;
const searchDestinyPlayer = `/Destiny2/SearchDestinyPlayer/${membershipType}/${displayName}/`;
const getProfile = `/Destiny2/${membershipType}/Profile/${destinyMembershipId}/`;
const queryParams = `?components=`;
const inventory = 205;

test("Check returnData", async () => {
  const getCharacter = `/Destiny2/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}`;
  const res = await returnData(
    apiKey,
    `${baseUrl}${getCharacter}${queryParams}${inventory}`
  );
  expect(res.status).toBe("ok");
  expect(res.equipment.data.items.length).toBe(17);
});

test("Check returnData throws an error", async () => {
  const characterId = "xxxxx";
  const getCharacter = `/Destiny2/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}`;
  try {
    const res = await returnData(
      apiKey,
      `${baseUrl}${getCharacter}${queryParams}${inventory}`
    );
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
  expect(res.Message).toBe("Ok");
});

test("Check getProfile returns memberShipID", async () => {
  const res = await getCharacterIDs(displayName);
  expect(res.length).toBe(1);
  expect(res.Message).toBe("Ok");
  expect(res.Response.membershipId).toBe(membershipId);
});

test("Check getProfile returns characters", async () => {
  const res = await getCharacterIDs(membershipId);
  const characterIds = [
    "2305843009300358704",
    "2305843009300358823",
    "2305843009379706723",
  ];
  expect(res.Message).toBe("Ok");
  expect(res.length).toBe(1);
  expect(res.Response.profile.data.characterIds.length).toBe(3);
  expect(res.Response.profile.data.characterIds).toMatchObject(characterIds);
});
