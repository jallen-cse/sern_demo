
import { Router } from "express";

import { searchJobs } from "../controllers/search.controller";

const searchRouter = Router();

/**
 *  @openapi
 *  /api/search/jobs:
 *    get:
 *      tags: [search]
 *      description: Search for jobs.
 *      parameters:
 *        - in: query
 *          name: title
 *          required: true
 *          schema:
 *            type: string
 *        - in: query
 *          name: location
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Returns any jobs that match the search parameters.
 *        400:
 *          description: The request was ill-formed.
 */
searchRouter.get("/jobs", searchJobs);

export default searchRouter;
