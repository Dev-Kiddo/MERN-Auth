import express from "express";
import { getUsers, updateUser, deleteUser } from "../controllers/userController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.route("/").get(getUsers);
router.route("/:id").patch(verifyUser, updateUser);
router.route("/:id").delete(deleteUser);

export default router;
