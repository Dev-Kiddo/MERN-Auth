import express from "express";
import { GSignin, signIn, signUp, signOut } from "../controllers/authController.js";

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/GSignin").post(GSignin);
router.route("/signout").get(signOut);

export default router;
