import { getEquippedImages } from "./getEquippedImages.js";
import express from "express";
import { sendRequest } from "./http/http.js";
import cors from "cors";
import { connectDB } from "./db/db.js";
import { register, login, updateUser, deleteUser } from "./auth/auth.js";
import cookieParser from "cookie-parser";
import { adminAuth, userAuth } from "./middleware/auth.js";

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Middleware
app.use("/v1/auth", register);
// app.use("/v1/auth", login);
// app.use("/v1/auth", updateUser);
// app.use("/v1/auth", deleteUser);

app.get("/v1/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/v1/basic", userAuth, (req, res) => res.send("User Route"));

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
