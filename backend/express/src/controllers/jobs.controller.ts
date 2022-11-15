
import { Request, Response, NextFunction } from "express";

/**
 * Get a job by a given ID.
 */
export async function getJob(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  const jobId = req.params.jobId;
  res.status(200).send(`job with id ${jobId}`);
  next();
}

/**
 * Get all jobs or jobs with the given IDs.
 */
export async function getJobs(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  const jobIds = req.params.jobIds;
  res.status(200).send(`jobs with ids ${jobIds}`);
  next();
}
