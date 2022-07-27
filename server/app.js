import { getEquippedImages } from "./getEquippedImages.js";
import express from "express";
import { sendRequest } from "./http/http.js";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/v1/health", (req, res) => {
  res.send("Healthy");
});

app.get(`/v1/equippedImages/:characterId`, async (req, res, next) => {
  try {
    const data = await getEquippedImages(sendRequest, req.params.characterId);
    res.json({
      statusMessage: "Ok",
      length: data.length,
      data,
    });
  } catch (err) {
    next(err);
  }
});

export default app;
