import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { forgotSchema, loginSchema, registerSchema, resendVerificationSchema, resetSchema } from "../validators/auth.schema";
import { fetchMe, forget, login, logout, refresh, register, resend, reset, verify } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.get("/verify", verify);
router.post("/resend-verification", validate(resendVerificationSchema), resend);
router.post("/fogot", validate(forgotSchema), forget);
router.post("/reset", validate(resetSchema), reset);

router.post("/login", validate(loginSchema), login);

router.post("/logout", authMiddleware, logout);
router.post("/refresh", refresh);
router.get("/me", authMiddleware, fetchMe);


export default router;
