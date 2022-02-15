import { getEquippedImages } from "./request.js";
import express from "express";
import cors from "cors";
const app = express();
const characterId = "2305843009300358704";

app.use(cors());

app.get("/equipped", async (req, res) => {
  const data = await getEquippedImages(characterId);
  res.send(data);
});

// module.exports = app;

export default app;
