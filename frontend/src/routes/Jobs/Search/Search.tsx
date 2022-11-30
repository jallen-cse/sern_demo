
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { JobWithEmployer } from "../../../models/transfer";
import { getSavedJobsIds, saveJob, unsaveJob } from "../util";

import "./Search.css"

interface JobCardFullProps {
  job: JobWithEmployer
}

/**
 * A card showing all details of a Job.
 */
export function JobCardFull(props: JobCardFullProps) {
  return <div className="card mb-3">
    <div className="card-header pt-3">
      <div id="focus-job-header-container">
        <div>
          <h4>{props.job.title}</h4>
          <Link to={`/employer/${props.job.employerId}`}>
            <h6>{props.job.employer.name}</h6>
          </Link>
        </div>
        <div>
          <SaveBtn jobId={props.job.id} />
        </div>
      </div>
    </div>
    <div className="card-body focus-job-view-card-body">
      {/* TODO we need to make sure this is sanitized; this is a great script injection point */}
      <div dangerouslySetInnerHTML={{__html: props.job.fullDescription}} /> 
    </div>
  </div>
}

interface JobCardPreviewProps {
  job: JobWithEmployer,
  focused: boolean
}

/**
 * A card showing a Job's title, employer name, and short description.
 */
export function JobCardPreview(props: JobCardPreviewProps) {
  const cardClasses = props.focused ? 
    "card mb-3 blue-border" : "card mb-3"; 
  return <div className={cardClasses}>
    <div className="card-header pt-3">
      <h4>{props.job.title}</h4>
      <h6>{props.job.employer.name}</h6>
    </div>
    <div className="card-body mb-0">
      <p className="mb-0">{props.job.shortDescription}</p>
    </div>
  </div>
}

interface SaveBtnProps {
  jobId: number
}

/**
 * A toggleable job save button.
 */
export function SaveBtn({ jobId }: SaveBtnProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getSavedJobsIds().then(jobIds => setSaved(jobIds.indexOf(jobId) !== -1));
  }, [jobId]);

  const onClick = () => {
    if (saved) {
      setSaved(false);
      unsaveJob(jobId);
    } else {
      setSaved(true);
      saveJob(jobId);
    }
  };

  const btnClasses = saved ? 
    "btn swap btn-outline-primary" :
    "btn swap btn-primary";

  return <div className="m-3">
    <button className={btnClasses} onClick={onClick}>
      { saved ? "Saved" : "Save" }
    </button>
  </div>
}

interface SearchParams {
  title: string,
  location: string,
  skills?: string[]
}

const initialParams: SearchParams = {
  title: "engineer",
  location: "",
  skills: []
};

interface JobsSearchFormProps {
  executeSearch: (params: SearchParams) => Promise<void>
}

/**
 * A collection of search parameter input fields and submission button.
 */
export function JobsSearchForm(props: JobsSearchFormProps) {
  const [params, setParams] = useState(initialParams);                            // our packed search parameters
  const [paramsChanged, setParamsChanged] = useState(true);                       // have parameters been edited since last search?

  // map seach inputs by name to update values
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setParamsChanged(true);
    const { name, value } = event.target;
    setParams({ ...params, [name]: value });
  };

  // execute a search if any inputs have changed since last call
  const executeSearch = () => {
    if (paramsChanged) {
      setParamsChanged(false);
      props.executeSearch(params);
    }
  };

  // do search if user keypress is enter
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      executeSearch();
    }
  };

  return <div>
    <div className="row">
      <div className="col-3">
        <input type="text" className="form-control" placeholder="job title"
          name="title" value={params.title} onChange={onChange} onKeyDown={handleKeyDown} />
      </div>
      <div className="col-3">
        <input type="text" className="form-control" placeholder="location (coming soon)"
          name="location" value={params.location} onChange={onChange} disabled={true} />
      </div>
      <div className="col-6">
        <input type="text" className="form-control" 
          placeholder="skills (coming soon)" disabled={true} />
      </div>
    </div>
    <button className="btn btn-primary mt-3" onClick={executeSearch}>Search</button>
  </div>
}

/**
 * Top-level Jobs Search page.
 */
export default function JobsSearch() {

  const [searched, setSearched] = useState(false);                                // have we performed a search yet?
  const [inFlight, setInFlight] = useState(false);                                // is there a search in flight?
  const [userMsg, setUserMsg] = useState(null as string | null);                  // a message if something went wrong

  const [jobs, setJobs] = useState([] as JobWithEmployer[]);                      // jobs to display
  const [focusedJob, setFocusedJob] = useState(null as JobWithEmployer | null);   // any job that user has clicked on

  // hit our backend with given search params
  const executeSearch = async (params: SearchParams) => {
    setSearched(true);
    setInFlight(true);
    
    // TODO unify origin
    const url = "http://localhost:5000/api/search/jobs?" + new URLSearchParams({
      title: params.title
    });

    try {
      const response = await fetch(url, { method: "GET" });
      const jobs = await response.json();
      setJobs(jobs);
      if (jobs.length) {
        setFocusedJob(jobs[0]);
        setUserMsg(null);
      } else {
        setFocusedJob(null);
        setUserMsg("0 jobs found. Try refining your search.");
      }
    } catch (_err) {
      setFocusedJob(null);
      setUserMsg("An error occurred while performing the search. Please try again later.");
    } finally {
      setInFlight(false);
    }
  };

  return (
    <div className="page-content">
      <h1>Jobs Search</h1>
      <hr />
      <JobsSearchForm executeSearch={executeSearch} />
      { searched ? 
        <div>
          <hr />
          { inFlight ? 
            <div className="spinner-border text-secondary" role="status" /> :
            <div className="row">
              { userMsg !== null ?
                <div>{userMsg}</div> :
                <div className="col-6 overflow-auto vh95">
                  { jobs.map((job, i) => 
                    <div key={i} className="cursor-pointer" onClick={() => setFocusedJob(job)}>
                      <JobCardPreview job={job} focused={job.id === focusedJob?.id} />
                    </div> )}
                </div> }
              { focusedJob ? 
                <div className="col-6">
                  <JobCardFull job={focusedJob} />
                </div> :
                null }
            </div> }
        </div> :
        null }
    </div>
  );
}