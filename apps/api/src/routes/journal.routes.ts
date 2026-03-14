import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { createJournalSchema } from "../validators/journals/entries.schema";
import { create } from "../controllers/journal/entries.controller";

const router = Router();

router.post("/", validate(createJournalSchema), create);



export default router;
