import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { getEmotionSummery } from "../../services/journal/analysis.service";

export const analyze = asyncHandler(async (req: Request, res: Response) => {

  const response = await getEmotionSummery(req.body);

  return res.status(200).json({
    success: true,
    ...response
  })

})
