import { Router } from "express";
import { hi } from "../../controllers/auth/authController";

const router = Router();

router.get("/login", hi);

export default router;
