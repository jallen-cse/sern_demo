
import { Router } from "express";

import { getJobs, getJob } from "../controllers/jobs.controller";

const jobsRouter = Router();

/**
 *  @openapi
 *  /api/jobs:
 *    get:
 *      tags: [jobs]
 *      description: Get all jobs or jobs with specified IDs.
 *      parameters:
 *        - in: query
 *          name: jobIds
 *          required: false
 *          schema:
 *            type: array
 *            items:
 *              type: number
 *          style: form
 *          explode: false
 *      responses:
 *        200:
 *          description: Returns the requested jobs.
 *        400:
 *          description: The request was ill-formed.
 */
jobsRouter.get("/", getJobs);

/**
 *  @openapi
 *  /api/jobs/{jobId}:
 *    get:
 *      tags: [jobs]
 *      description: Get a specific job.
 *      parameters:
 *        - in: path
 *          name: jobId
 *          required: true
 *          schema:
 *            type: number
 *      responses:
 *        200:
 *          description: Returns the requested jobs.
 *        400:
 *          description: The request was ill-formed.
 *        404:
 *          description: A job with the given jobId was not found.
 */
jobsRouter.get("/:jobId", getJob);



export default jobsRouter;