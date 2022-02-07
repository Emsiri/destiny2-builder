import { getEquippedImages } from "./request.js";
import express from "express";
import cors from "cors";
const app = express();
const port = 3001;
const characterId = "2305843009300358704";

app.use(cors());

app.get("/equipped", async (req, res) => {
  const data = await getEquippedImages(characterId);
  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
