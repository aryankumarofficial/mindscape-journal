import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { addJournal, deleteJournal, getJournals } from "../../services/journal/entries.service";
import AppError from "../../utils/appError";
import { getUserJournals } from "../../repositories/journal.repo";
import { getUserInsights } from "../../services/insight.service";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const { text, ambience } = req.body;

  const [journal] = await addJournal({
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
  console.log("userId", userId);
  console.log("typeof usrid", typeof userId);
  if (req.user!.id !== userId) {
    throw new AppError(`Forbidden`, 403);
  }

  const journals = await getJournals(userId);

  res.json({
    success: false,
    journals
  })
})

export const getInsights = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (req.user!.id !== userId) {
    throw new AppError(`Forbidden`, 403);
  }

  const insights = await getUserInsights(userId);

  return res.status(200).json({
    success: true,
    insights
  })
})

export const removeJournal = asyncHandler(async (req: Request, res: Response) => {
  const { journalId } = req.params;
  
  if (!journalId) {
    throw new AppError(`Journal Id must be required`, 400);
  }

  const response = await deleteJournal(journalId as string);

  return res.status(200).json({
    success: false,
    data: response,
    message: `Journal With ID: ${response.id} deleted Successfully`
  });
})
