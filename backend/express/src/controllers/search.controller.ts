
import { Response, NextFunction } from "express";
import querystring from "querystring"

import HttpError from "../common/http_error";
import QuerystringRequest from "../common/querystring_request";

import searchService, { SearchJobsArguments } from "../services/search.service";

// TODO consider merging jobs index route functionality to the search/jobs route.
// TODO title should be able to be provided more than once in search params

/**
 * Parse query parameters for search service arguments.
 * @param query express simply parsed query
 * @returns parsed SearchJobArguments
 * @throws {HttpError} 
 */
function getSearchArgumentsFromQuery(
  query: querystring.ParsedUrlQuery
): SearchJobsArguments {
  if (typeof query.title !== "string") {
    throw new HttpError(422, "'title' must be provided exactly once");
  } else {
    return {
      title: query.title
    }
  }
}

/**
 * Search for jobs.
 */
async function searchJobs(
  req: QuerystringRequest, 
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const jobs = await searchService.searchJobs(
      getSearchArgumentsFromQuery(req.query));
    res.status(200).json(jobs);
  } catch (err) {
    next(err);
  }
}

export default {
  searchJobs
}