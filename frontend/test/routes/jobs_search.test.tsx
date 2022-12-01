/**
 * @jest-environment jsdom
 */

import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent, cleanup, act } from "@testing-library/react";
import { describe, expect, test, beforeEach, afterEach, jest } from '@jest/globals';
// import '@testing-library/jest-dom';
// import '@testing-library/jest-dom/extend-expect'

import JobsSearch, { SaveBtn, JobCardPreview, JobCardFull, JobsSearchForm } from "../../src/routes/Jobs/Search/Search";

////////////////////////////////////////////////////////////////////////////////

afterEach(cleanup);

////////////////////////////////////////////////////////////////////////////////

// sample data for our components

const sampleJobWithEmployer0 = {
  id: 101,
  title: "Some Job Title",
  shortDescription: "some short description",
  fullDescription: "some full description",
  employerId: 202,
  employer: {
    id: 202,
    name: "Some Employer Name",
    numEmployees: 1000,
    headquarters: "Ohio"
  }
};

const sampleJobWithEmployer1 = {
  id: 102,
  title: "Other Job Title",
  shortDescription: "other short description",
  fullDescription: "other full description",
  employerId: 203,
  employer: {
    id: 203,
    name: "Other Employer Name",
    numEmployees: 1001,
    headquarters: "Montana"
  }
};

const sampleJobsWithEmployer = [
  sampleJobWithEmployer0,
  sampleJobWithEmployer1
];

////////////////////////////////////////////////////////////////////////////////

// mock the fetch api

const mockFetch = jest.fn(async (url: RequestInfo | URL): Promise<Response> => {
  const urlStr = url.toString();
  if (urlStr.includes('api/search/jobs?title=yieldsMultiple')) {
    return {
      status: 200,
      json: () => Promise.resolve(sampleJobsWithEmployer)
    } as Response;
  } else if (urlStr.includes('api/search/jobs?title=yieldsNone')) {
    return {
      status: 200,
      json: () => Promise.resolve([])
    } as Response;
  } else {
    throw new Error("failed to fetch");
  }
});

beforeEach(() => {
  mockFetch.mockClear()
});

global.fetch = mockFetch;

////////////////////////////////////////////////////////////////////////////////

describe("SaveBtn component", () => {
  test("responds to clicks (save/unsave)", async () => {
    const { findByRole, getByRole } = render(<SaveBtn jobId={101} />);
    expect((await findByRole('button')).textContent).toBe("Save");
    fireEvent.click(getByRole('button'));
    expect((await findByRole('button')).textContent).toBe("Saved");
    fireEvent.click(getByRole('button'));
    expect((await findByRole('button')).textContent).toBe("Save");
  });
});

describe("JobCardPreview component", () => {
  test("renders required details", async () => {
    const { queryByText } = render(<JobCardPreview job={sampleJobWithEmployer0} focused={false} />);
    expect(queryByText(sampleJobWithEmployer0.title)).not.toBeNull();
    expect(queryByText(sampleJobWithEmployer0.employer.name)).not.toBeNull();
    expect(queryByText(sampleJobWithEmployer0.shortDescription)).not.toBeNull();
  });

  test("highlights only when focused", async () => {
    let res = render(<JobCardPreview job={sampleJobWithEmployer0} focused={false} />);
    expect(res.container.firstElementChild?.classList.contains('blue-border')).toBe(false);   // TODO I dont like this class name check.. too breakable
    res = render(<JobCardPreview job={sampleJobWithEmployer0} focused={true} />);
    expect(res.container.firstElementChild?.classList.contains('blue-border')).toBe(true);    // TODO I dont like this class name check.. too breakable
  });
});

describe("JobCardFull component", () => {
  test("renders required details, button, & link", async () => {
    const { queryByText } = render(
      <MemoryRouter>
        <JobCardFull job={sampleJobWithEmployer0} />
      </MemoryRouter>
    );
    expect(queryByText(sampleJobWithEmployer0.title)).not.toBeNull();
    const employerNameElem = queryByText(sampleJobWithEmployer0.employer.name);
    expect(employerNameElem).not.toBeNull();
    expect(employerNameElem!.closest('a')?.getAttribute('href'))
      .toBe(`/employer/${sampleJobWithEmployer0.employerId}`);
    expect(queryByText(sampleJobWithEmployer0.fullDescription)).not.toBeNull();
    expect(queryByText('Save')).not.toBeNull();
  });
});

describe("JobsSearchForm component", () => {
  test("search is executed on button click", async () => {
    const mockfn = jest.fn(async () => {});
    const { getByText } = render(<JobsSearchForm executeSearch={mockfn} />)
    fireEvent.click(getByText('Search'));
    expect(mockfn).toHaveBeenCalled();
  });

  test("search is executed on 'Enter' key press from title field", async () => {
    const mockfn = jest.fn(async () => {});
    const { getByPlaceholderText } = render(<JobsSearchForm executeSearch={mockfn} />);
    fireEvent.keyDown(getByPlaceholderText('job title'),
      { key: "Enter", code: 13, charCode: 13 });
    expect(mockfn).toHaveBeenCalled();
  });
});

describe("JobsSearch page component", () => {
  test("renders required form inputs", async () => {
    const { queryByText, queryByPlaceholderText } = render(<JobsSearch />);
    expect(queryByText('Jobs Search')).not.toBeNull();
    expect(queryByPlaceholderText('job title')).not.toBeNull();
    // expect(queryByPlaceholderText('location')).not.toBeNull();
    // expect(queryByPlaceholderText('skills')).not.toBeNull();
    expect(queryByText('Search')).not.toBeNull();
  });

  test("error occurances during search are handled", async () => {
    const { getByText, getByPlaceholderText } = render(<JobsSearch />);
    await act(async () => {
      fireEvent.change(getByPlaceholderText('job title'), 
        { target: { value: 'yieldsError' } });
      fireEvent.click(getByText('Search'));
    });
    getByText(/An error occurred while performing the search/);
  });
  
  test("message displayed when no jobs found", async () => {
    const { getByText, getByPlaceholderText } = render(<JobsSearch />);
    // mock fetch
    await act(async () => {
      fireEvent.change(getByPlaceholderText('job title'), 
        { target: { value: 'yieldsNone' } });
      fireEvent.click(getByText('Search'));
    });
    getByText(/0 jobs found/);
  });
  
  test("job preview and focus are shown when 1 or more jobs are found", async () => {
    const { getByText, getAllByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <JobsSearch />
      </MemoryRouter>
    );
    // mock fetch
    await act(async () => {
      fireEvent.change(getByPlaceholderText('job title'), 
        { target: { value: 'yieldsMultiple' } });
      fireEvent.click(getByText('Search'));
    });
    expect(getAllByText(sampleJobWithEmployer0.title).length).toBeGreaterThan(0);
    expect(getAllByText(sampleJobWithEmployer1.title).length).toBeGreaterThan(0);
  });

  test("clicking on a preview card changes the focus card view", async () => {
    const { getByText, getAllByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <JobsSearch />
      </MemoryRouter>
    );
    // mock fetch
    await act(async () => {
      fireEvent.change(getByPlaceholderText('job title'), 
        { target: { value: 'yieldsMultiple' } });
      fireEvent.click(getByText('Search'));
    });
    // mock user click on preview card for job 0
    await act(async () => {
      for (const elem of getAllByText(sampleJobWithEmployer0.title)) {
        fireEvent.click(elem);
      }
    });
    getByText(sampleJobWithEmployer0.fullDescription);
    // mock user click on preview card for job 1
    await act(async () => {
      for (const elem of getAllByText(sampleJobWithEmployer1.title)) {
        fireEvent.click(elem);
      }
    });
    getByText(sampleJobWithEmployer1.fullDescription);
  });
});