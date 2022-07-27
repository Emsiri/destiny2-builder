import {
  getEquipmentFromChar,
  getCharacterIDs,
  getmembershipId,
  getVaultItems,
} from "./request.js";
// import { sendRequest } from "../http/http.js";
import { sendRequest } from "../http/__mocks__/http.js";
import { jest } from "@jest/globals";
import { getEquippedImages } from "../getEquippedImages";

const membershipType = `3`;
const displayName = "Emsiri%230594";
const membershipId = "4611686018468712969";
const characterId = "2305843009300358704";

const apiKey = process.env.apiKey;
const baseUrl = `https://www.bungie.net/platform`;
const queryParams = `?components=`;
const inventory = 205;

// jest.mock("http");

test("Check returnData", async () => {
  const getCharacter = `/Destiny2/${membershipType}/Profile/${membershipId}/Character/${characterId}`;
  const res = await sendRequest(
    apiKey,
    `${baseUrl}${getCharacter}${queryParams}${inventory}`
  );
  // console.log("blahblahblah");
  console.log(res);
  console.log(res.mock);
  expect(res.response.equipment.data.items.length).toBe(17);
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
    // expect(err.toString()).toMatch("Error: Error with request");
    expect(err.toString()).toMatch(
      "Error: Error with base request returnData res is not Ok, [object Response]"
    );
  }
});

test("Check getEquipmentFromChar throws an error", async () => {
  const characterId = "xxxxx";
  const getCharacter = `/Destiny2/${membershipType}/Profile/${membershipId}/Character/${characterId}`;
  try {
    const res = await getEquipmentFromChar(fetch, characterId);
  } catch (err) {
    // expect(err.toString()).toMatch("Error: Error with request");
    expect(err.toString()).toMatch(
      "Error: Error with getEquipmentFromChar: Error with base request returnData res is not Ok, [object Response]"
    );
  }
});

test("Check getEquippedImages throws an error", async () => {
  const characterId = "xxxxx";
  try {
    const res = await getEquippedImages(fetch, characterId);
  } catch (err) {
    // expect(err.toString()).toMatch("Error: Error with request");
    expect(err.toString()).toMatch(
      "Error: Error with getEquippedImages: Error with getEquipmentFromChar: Error with base request returnData res is not Ok, [object Response]"
    );
  }
});

test("Check getEquipmentFromChar returns the equipped items", async () => {
  const res = await getEquipmentFromChar(fetch, characterId);
  expect(res.status).toBe("ok");
  expect(Object.keys(res)).toEqual([
    "equipment",
    "uninstancedItemComponents",
    "status",
  ]);
});

test("Check getEquippedImages returns the equipped image urls", async () => {
  const res = await getEquippedImages(fetch, characterId);
  expect(res.length).toBe(17);
});

test("Check getVaultItems returns the profile vault", async () => {
  const res = await getVaultItems(fetch, membershipId);
  expect(res.status).toBe("ok");
  expect(typeof res.profileInventory.data.items).toBe("object");
});

test("Check getmembershipId returns membershipId", async () => {
  const res = await getmembershipId(fetch, displayName);
  expect(res.status).toBe("ok");
  expect(res[0].membershipId).toBe(membershipId);
});

test("Check getmembershipId with an invalid displayName contains an empty response", async () => {
  const displayName = "xxxxx";
  const res = await getmembershipId(fetch, displayName);
  expect(res).toHaveLength(0);
});

test("Check getCharacterIDs returns characters", async () => {
  const res = await getCharacterIDs(fetch, membershipId);
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
    const res = await getCharacterIDs(fetch, membershipId);
  } catch (err) {
    // expect(err.toString()).toMatch("Error: Error with request");
    expect(err.toString()).toMatch(
      "Error: Error with base request returnData res is not Ok, [object Response]"
    );
  }
});
