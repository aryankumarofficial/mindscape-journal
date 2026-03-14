import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { addJournal } from "../../services/journal/entries.service";
import AppError from "../../utils/appError";
import { getUserJournals } from "../../repositories/journal.repo";

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

export const getEntries = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (req.user!.id !== userId) {
    throw new AppError(`Forbidden`, 403);
  }
  
  const journals = await getUserJournals(userId);
  
  res.json({
    success: false,
    journals
  })
  
})
