
import { Sequelize } from 'sequelize';

import { jobDefiner } from '../models/job.model';
import { employerDefiner } from '../models/employer.model';

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
  await jobs.bulkCreate([
    {
      title: "Software Engineer I",
      employerId: 100,
      description: "You will write 'hello world'"
    },
    {
      title: "Software Engineer II",
      employerId: 100,
      description: "You teach junior engineers how to write 'hello world'"
    },
    {
      title: "Talent Recruiter",
      employerId: 100,
      description: "You will find talent"
    },
    {
      title: "Systems Engineer (Embedded)",
      employerId: 100,
      description: "You will write 'hello world' in C89"
    },
    {
      title: "Security Researcher",
      employerId: 100,
      description: "You will write 'hello world' with buffer overflows"
    }
  ]);
}

export default {
  sync,
  prime,
  jobs,
  employers,
}

// TODO move this to services probably