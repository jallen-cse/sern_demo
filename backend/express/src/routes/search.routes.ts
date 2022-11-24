
import { Router } from "express";

import searchController from "../controllers/search.controller";

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
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/JobWithEmployer"
 *        422:
 *          description: The request was ill-formed.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Error"
 */
searchRouter.get("/jobs", searchController.searchJobs);

export default searchRouter;
