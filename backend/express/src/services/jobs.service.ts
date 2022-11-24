
import { Op, Model } from "sequelize";

import db from "./db";

/**
 * Get a job by ID.
 * @param jobId job id to query
 * @returns job if found, else null
 */
async function getJob(
  jobId: number
): Promise<Model<any, any> | null> {
  return db.Job.findByPk(jobId)
}

/**
 * Get all jobs or jobs with given jobIds.
 * @param jobIds job ids to query
 * @returns array of jobs
 */
async function getJobs(
  jobIds?: number[]
): Promise<Model<any, any>[]> {
  const options = jobIds ? 
    {
      where: {
        id: {
          [Op.in]: jobIds
        }
      }
    } :
    undefined;
  return db.Job.findAll(options);
}

export default {
  getJob,
  getJobs
}