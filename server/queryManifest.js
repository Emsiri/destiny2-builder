import { openDb, closeDB, queryManifest } from "./db/manifest.js";
import { convertHashes } from "./utils/utilities.js";
const hash = "932578999";

const convertedHash = convertHashes(hash);
console.log(`Converted hash is: `, convertedHash);

const getManifestData = async (hash) => {
  const db = await openDb();
  const results = await queryManifest(
    db,
    "DestinyInventoryItemDefinition",
    hash
  );
  return results;
  closeDB(db);
};

getManifestData(convertedHash).then((response) => {
  console.log(response);
});
