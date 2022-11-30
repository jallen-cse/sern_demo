

const JOBS_KEY = "jobs";

// TODO implement users and authentication, then keep track of this on back end

/**
 * Save a jobId. Returns a promised boolean, true 
 * if save was successful; else false.
 */
export async function saveJob(jobId: number): Promise<boolean> {
  var jobIds;
  const serializedJobs = localStorage.getItem(JOBS_KEY);
  if (serializedJobs === null) {
    jobIds = [];
  } else {
    try {
      // TODO what if we have junk in this var?
      jobIds = JSON.parse(serializedJobs);
    } catch (err: unknown) {
      return false;
    }
  }
  jobIds.push(jobId);
  localStorage.setItem(JOBS_KEY, JSON.stringify(jobIds));
  return true;
}

/**
 * Unsave a jobId.
 */
export async function unsaveJob(jobId: number): Promise<void> {
  const serializedJobs = localStorage.getItem(JOBS_KEY);
  if (serializedJobs === null) {
    return;
  }
  try {
    // TODO what if we have junk in this var?
    const jobIds: number[] = JSON.parse(serializedJobs);
    localStorage.setItem(JOBS_KEY, JSON.stringify(
      jobIds.filter(n => n !== jobId)));
  } catch (err: unknown) {
    return;
  }
}

/**
 * Read saved jobIds and return them as an array.
 */
export async function getSavedJobsIds(): Promise<number[]> {
  const serializedJobs = localStorage.getItem(JOBS_KEY);
  if (serializedJobs === null) {
    return [];
  } else {
    try {
      // TODO what if we have junk in this var?
      return JSON.parse(serializedJobs);
    } catch (err: unknown) {
      // TODO probably want to propagate error here
      return [];  
    }
  }
};

