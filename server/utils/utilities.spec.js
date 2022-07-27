import { convertHashes } from "./utilities.js";

test("should convert hashes correctly", () => {
  const hash = 4068264807;
  expect(convertHashes(hash)).toEqual(-226702489);
});
