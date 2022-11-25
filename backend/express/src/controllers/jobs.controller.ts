
import { Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import querystring from "querystring"

import HttpError from "../common/http_error";
import QuerystringRequest from "../common/querystring_request";

import jobsService from "../services/jobs.service";

/**
 * Parse 'jobId' from express params.
 * @param params express params dictionary
 * @returns number parsed jobId
 * @throws {HttpError} if values are invalid
 */
function getJobIdFromParams(params: ParamsDictionary): number {
  const jobId = Number(params.jobId);
  if (Number.isInteger(jobId)) {
    return jobId;
  } else {
    throw new HttpError(422, "required parameter jobId must be an integer");
  }
}

/**
 * Parse 'jobIds' from express query.
 * @param query express simply parsed query
 * @returns number[] parsed jobIds or undefined
 * @throws {HttpError} if values are invalid
 */
function getJobIdsFromQuery(
  query: querystring.ParsedUrlQuery
): number[] | undefined {
  const raw = query.jobIds;
  if (raw === undefined) {
    return undefined;
  } else {
    const converted = typeof raw === "string" ?
      raw.split(',').map(v => Number(v)) :
      raw.map(v => Number(v));
    if (converted.every(v => Number.isInteger(v))) {
      return converted;
    } else {
      throw new HttpError(422, "jobIds must be integers");
    }
  }
}


/**
 * Get a job by a given ID.
 */
async function getJob(
  req: QuerystringRequest, 
  res: Response,
  next: NextFunction
): Promise<void> {  
  try {
    const job = await jobsService.getJob(getJobIdFromParams(req.params));
    if (job === null) {
      next(new HttpError(404, "job with given ID not found"));
    } else {
      res.status(200).json(job);
    }
  } catch (err) {
    next(err);
  }
}

/**
 * Get all jobs or jobs with the given IDs.
 */
async function getJobs(
  req: QuerystringRequest, 
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const jobs = await jobsService.getJobs(getJobIdsFromQuery(req.query));
    res.status(200).json(jobs);
  } catch (err) {
    next(err)
  }
}

export default {
  getJob,
  getJobs
}