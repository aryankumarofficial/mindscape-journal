import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { createJournalSchema } from "../validators/journals/entries.schema";
import { create } from "../controllers/journal/entries.controller";
import { getJournals } from "../services/journal/entries.service";
const router = Router();

router.post("/", validate(createJournalSchema), create);

router.get("/:userId", getJournals);

export default router;
