import express from "express";
const router = express.Router();
import { createUser, loginUser , getProfile , getUsers} from "../Controllers/user.controller.js";
import {authMiddleware , isAdmin} from "../MIddlewares/authMiddleware.js";

router.post("/signup", createUser);
router.post("/login" , loginUser);

// protected route 
router.get("/profile", authMiddleware, getProfile);


// routes for user management (admin only)
router.get("/admin/users" , authMiddleware , isAdmin , getUsers);

export default router;

