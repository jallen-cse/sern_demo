/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, fireEvent, cleanup, act } from "@testing-library/react";
import { describe, expect, test, afterEach } from '@jest/globals';
import { MemoryRouter, Route, Routes } from "react-router-dom";

import NavBar from "../../src/components/navbar";

////////////////////////////////////////////////////////////////////////////////

afterEach(cleanup);

////////////////////////////////////////////////////////////////////////////////

describe("NavBar component", () => {
  test("route responds to clicks", async () => {
    const testTextHome = "PAGE HOME";
    const testTextJobsSearch = "PAGE JOBS SEARCH";
    // const testTextJobsSaved = "PAGE JOBS SAVED";
    
    const { getByText, queryByText } = render(
      <MemoryRouter >
        <NavBar />
        <Routes>
          <Route path='/' element={<div>{testTextHome}</div>} />
          <Route path='/home' element={<div>{testTextHome}</div>} />
          <Route path='/jobs/search' element={<div>{testTextJobsSearch}</div>} />
          {/* <Route path='/jobs/saved' element={<div>{testTextJobsSaved}</div>} /> */}
        </Routes>
      </MemoryRouter>
    );
    
    await act(async () => {
      fireEvent.click(getByText("Search Jobs"));
    });
    expect(queryByText(testTextJobsSearch)).not.toBeNull();
    
    // await act(async () => {
    //   fireEvent.click(getByText("Saved Jobs"));
    // });
    // expect(queryByText(testTextJobsSaved)).not.toBeNull();
    
    await act(async () => {
      fireEvent.click(getByText("Home"));
    });
    expect(queryByText(testTextHome)).not.toBeNull();
  });
});