import { Router } from "express";
import {
  getUser,
  login,
  register,
} from "../../controllers/auth/authController.js";
import { protect } from "../../middlewares/auth/authorization.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/get-user", protect, getUser);

export default router;
