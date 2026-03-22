import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { createJournalSchema } from "../validators/journals/entries.schema";
import { create, getEntries, getInsights, removeJournal } from "../controllers/journal/entries.controller";
import { textAnalyzeSchema } from "../validators/journals/analyzer.schema";
import { analyze, clearTextHistory, insertJournalAnalysis, textHistory } from "../controllers/journal/analyze.controller";
const router = Router();

router.post("/", validate(createJournalSchema), create);

router.delete("/:journalId", removeJournal);

router.get("/:userId", getEntries);

router.post("/analyze", validate(textAnalyzeSchema), analyze);
router.get("/analyze", textHistory);
router.delete("/analyze", clearTextHistory);

router.post("/analyze/:journalId", insertJournalAnalysis);

router.get("/insights/:userId", getInsights);


export default router;
