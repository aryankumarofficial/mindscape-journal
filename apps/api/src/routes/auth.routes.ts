import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../validators/auth.schema";
import { login, logout, refresh, register, verify } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.get("/auth/verify", verify);

router.post("/login", validate(loginSchema), login);

router.post("/logout", authMiddleware, logout);
router.post("/refresh",  refresh);


export default router;
