
/**
 * The Employer transfer object that our backend uses. 
 */
export interface Employer {
  id: number,
  name: string,
  numEmployees: number,
  headquarters: string
}

/**
 * The Job transfer object that our backend uses. 
 */
export interface Job {
  id: number,
  title: string,
  employerId: number,
  shortDescription: string,
  fullDescription: string
}

/**
 * The JobWithEmployer transfer object that our backend uses.
 */
export interface JobWithEmployer extends Job {
  employer: Employer
}