import { express } from "express";
const router = express.Router();
import { register, login, updateUser, deleteUser } from "./auth";
import { adminAuth } from "./middleware/auth.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser").put(adminAuth, updateUser);
router.route("/deleteUser").delete(adminAuth, deleteUser);

export { router };
