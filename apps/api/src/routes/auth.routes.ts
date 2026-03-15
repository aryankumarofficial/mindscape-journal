import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { forgotSchema, loginSchema, registerSchema, resendVerificationSchema } from "../validators/auth.schema";
import { forget, login, logout, refresh, register, resend, verify } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.get("/auth/verify", verify);
router.post("/resend-verification", validate(resendVerificationSchema), resend);
router.post("/fogot", validate(forgotSchema), forget);

router.post("/login", validate(loginSchema), login);

router.post("/logout", authMiddleware, logout);
router.post("/refresh",  refresh);


export default router;
