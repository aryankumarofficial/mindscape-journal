import { Router } from "express";

import authRoutes from "./auth.routes";
import journalRoutes from "./journal.routes";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", (_, res) => {
  res.json({
    message: "API Server Running successfully",
    info:`check health checkpoint at /health`
  });
});


router.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime()>=60?process.uptime()>=3600?`${process.uptime()/3600} HRS ${process.uptime()%3600} MIN ${process.uptime()%60} SEC`:`${process.uptime()/60} MIN ${process.uptime()%60} SEC`:`${process.uptime()} SEC`,
    timestamp: new Date(Date.now())
  });
});

router.use("/auth", authRoutes);
router.use("/journal",authMiddleware,journalRoutes)

export default router;
