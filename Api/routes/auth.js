import express from "express";
const router = express.Router();
import { signUp, signIn, googleAuth, logout } from "../Controllers/auth.js";
//CREATE A USER
router.post("/signup", signUp);
//SIGN IN
router.post("/signin", signIn);
// FACEBOOK AUTH
// TWITTER AUTH
// LINKEDIN AUTH
// GOOGLE AUTH
router.post("/logout", logout);
router.post("/google", googleAuth);

export default router;
