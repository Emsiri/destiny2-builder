import { getEquippedImages } from "./request.js";
import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.get(`/v1/equipped/:characterId`, async (req, res) => {
  const data = await getEquippedImages(req.params.characterId);
  res.json({
    statusMessage: "Ok",
    length: data.length,
    data,
  });
});

export default app;
