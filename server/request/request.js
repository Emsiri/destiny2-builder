import * as constants from "../utils/constants.js";

const apiKey = process.env.apiKey;
const baseUrl = `https://www.bungie.net/platform`;
const components = `?components=`;

export async function getEquipmentFromChar(httpClient, characterId) {
  const getCharacter = `/Destiny2/${constants.membershipType}/Profile/${constants.membershipId}/Character/${characterId}`;
  return await httpClient(
    apiKey,
    `${baseUrl}${getCharacter}${components}${constants.inventory}`
  );
}

export async function getCharacterIDs(httpClient, membershipId) {
  const getProfileUrl = `/Destiny2/${constants.membershipType}/Profile/${membershipId}/`;
  return await httpClient(
    apiKey,
    `${baseUrl}${getProfileUrl}${components}${constants.profiles}`
  );
}

export async function getmembershipId(httpClient, displayName) {
  const getmembershipIdUrl = `/Destiny2/SearchDestinyPlayer/${constants.membershipType}/${displayName}/`;
  return await httpClient(apiKey, `${baseUrl}${getmembershipIdUrl}`);
}

export async function getVaultItems(httpClient, membershipId) {
  const getProfileUrl = `/Destiny2/${constants.membershipType}/Profile/${membershipId}/`;
  return await httpClient(
    apiKey,
    `${baseUrl}${getProfileUrl}${components}${constants.ProfileInventories}`
  );
}
