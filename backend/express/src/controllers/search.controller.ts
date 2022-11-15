
import { Request, Response, NextFunction } from "express";

/**
 * Search for jobs.
 */
export async function searchJobs(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  res.status(200).send(`search by with params ${JSON.stringify(req.params)}`);
  next();
}