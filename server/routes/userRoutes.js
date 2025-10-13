import express from "express";
import { getUsers, updateUser } from "../controllers/userController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.route("/").get(getUsers);
router.route("/:id").patch(verifyUser, updateUser);

export default router;
