
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
 *          description: Returns all of the requested jobs that were found.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Job"
 *        422:
 *          description: The request was semantically ill-formed (bad parameter).
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Error"
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
 *          description: Returns the requested job.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Job"
 *        404:
 *          description: A job with the requested jobId was not found.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Error"
 *        422:
 *          description: The request was semantically ill-formed (bad parameter).
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Error"
 */
jobsRouter.get("/:jobId", jobsController.getJob);

export default jobsRouter;