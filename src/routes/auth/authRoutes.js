import { Router } from "express";
import {
  getUser,
  login,
  register,
} from "../../controllers/auth/authController.js";
import { protect } from "../../middlewares/auth/authorization.js";
import { verifyUser } from "../../controllers/verifyUser/verifyUser.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/get-user", protect, getUser);
router.get("/verify/:token", verifyUser);
export default router;
