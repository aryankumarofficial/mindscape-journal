import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { clearTextAnalysisHistory, getEmotionSummery, getTextAnalysisHistory } from "../../services/journal/analysis.service";

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