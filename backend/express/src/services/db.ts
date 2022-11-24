
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
const Job = jobDefiner(sequelize);

/** 
 * Employers table.
 */ 
const Employer = employerDefiner(sequelize);

// create table relations
Employer.hasMany(Job);
Job.belongsTo(Employer);

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
  await Employer.bulkCreate(dummyData.employers);
  await Job.bulkCreate(dummyData.jobs);
}

export default {
  sync,
  prime,
  Job,
  Employer,
}

// TODO move this to services probably