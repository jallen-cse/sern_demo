
import { Sequelize } from 'sequelize';

import { jobDefiner } from '../models/job.model';
import { employerDefiner } from '../models/employer.model';

import dummyData from "./test_vals.json"

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data/database.sqlite',
  logging: msg => console.log(`[sequelize] ${msg}`)
});

/** 
 * Jobs table.
 */ 
const jobs = jobDefiner(sequelize);

/** 
 * Employers table.
 */ 
const employers = employerDefiner(sequelize);

/**
 * Helper for syncing the DB against our models.
 */
async function sync() {
  await sequelize.sync({ force: false });
}

/**
 * Helper to prime the DB with some dummy values.
 */
async function prime() {
  await employers.bulkCreate(dummyData.employers);
  await jobs.bulkCreate(dummyData.jobs);
}

export default {
  sync,
  prime,
  jobs,
  employers,
}

// TODO move this to services probably