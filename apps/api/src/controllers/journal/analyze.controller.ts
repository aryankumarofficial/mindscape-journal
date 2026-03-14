import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { clearTextAnalysisHistory, getEmotionSummery, createtJournalEmotionSummery, getTextAnalysisHistory } from "../../services/journal/analysis.service";
import { getJournalById } from "../../repositories/journal.repo";
import AppError from "../../utils/appError";
import { findUserByEmail } from "../../repositories/user.repo";

export const analyze = asyncHandler(async (req: Request, res: Response) => {

  const { text } = req.body;
  const response = await getEmotionSummery({
    text,
    userId: req.user!.id
  });

  return res.status(200).json({
    success: true,
    ...response
  })

});

export const textHistory = asyncHandler(async (req: Request, res: Response) => {
  const history = await getTextAnalysisHistory(req.user!.id);

  return res.status(200).json({
    success: false,
    history
  })

})

export const clearTextHistory = asyncHandler(async (req: Request, res: Response) => {
  await clearTextAnalysisHistory(req.user!.id);
  return res.status(200).json({
    success: true,
  })
})


export const insertJournalAnalysis = asyncHandler(async (req: Request, res: Response) => {
  const { journalId } = req.params;


  const journal = await getJournalById(journalId as string);


  if (!journal || journal.userId !== req.user!.id) {
     throw new AppError("Forbidden", 403);
   }

  const result = await createtJournalEmotionSummery(journal.text, journal.id);

  return res.status(200).json({
    success: true,
    analysis:result
  })
})
