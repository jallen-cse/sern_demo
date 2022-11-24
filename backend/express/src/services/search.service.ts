
import { Model, Op } from "sequelize";

import db from "./db";

export interface SearchJobsArguments {
  title: string
}

/**
 * Construct the sequelize where clause to match title keywords.
 * @param args SearchJobsArguments
 * @returns sequelize find options
 */
function buildSearchWhereClause(args: SearchJobsArguments) {  
  const titleTokens = args.title.split(' ').filter(v => v.length > 3);
  return {
    where: {
      [Op.or]: titleTokens.map(kw => { 
        return {
          title: {
            [Op.substring]: kw
          }
        }
      })
    }
  };
}

/**
 * Search for jobs like a given title.
 * @param args SearchJobsArguments
 * @returns array of jobs matching given search terms
 */
async function searchJobs(
  args: SearchJobsArguments
): Promise<Model<any, any>[]> {
  return db.Job.findAll(buildSearchWhereClause(args));
}

export default {
  searchJobs
}