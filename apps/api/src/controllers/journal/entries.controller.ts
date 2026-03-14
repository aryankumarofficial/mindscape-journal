import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { addJournal } from "../../services/journal/entries.service";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const { text, ambience } = req.body;

  const journal = await addJournal({
    text,
    ambience,
    userId:req.user!.id,
  });
  res.status(201).json({
    success: true,
    journal,
    message:`Journal Added Successfully!`
  })
})
