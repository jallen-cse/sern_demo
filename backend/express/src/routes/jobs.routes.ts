
import { Router } from "express";

import jobsController from "../controllers/jobs.controller";

const jobsRouter = Router();

/**
 *  @openapi
 *  /api/jobs:
 *    get:
 *      tags: [jobs]
 *      description: Get all jobs or jobs with specified IDs.
 *      parameters:
 *        - name: jobIds
 *          in: query
 *          required: false
 *          schema:
 *            type: array
 *            items:
 *              type: number
 *          style: form
 *          explode: true
 *      responses:
 *        200:
 *          description: Returns the requested jobs.
 *        400:
 *          description: The request was ill-formed.
 */
jobsRouter.get("/", jobsController.getJobs);

/**
 *  @openapi
 *  /api/jobs/{jobId}:
 *    get:
 *      tags: [jobs]
 *      description: Get a specific job.
 *      parameters:
 *        - name: jobId
 *          in: path
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
jobsRouter.get("/:jobId", jobsController.getJob);

export default jobsRouter;