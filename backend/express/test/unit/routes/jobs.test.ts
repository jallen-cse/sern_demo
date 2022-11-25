
import { describe, expect, test, beforeAll } from '@jest/globals';
import request from "supertest";

import app from "../../../src/app";
import db from "../../../src/services/db";

beforeAll(() => {
  return db.sync();
});

// TODO use JSON schema validator instead here
function validateJobSchema(job: any) {
  expect(job.id).toBeDefined();
  expect(job.title).toBeDefined();
  expect(job.employerId).toBeDefined();
  expect(job.shortDescription).toBeDefined();
  expect(job.fullDescription).toBeDefined();
}

////////////////////////////////////////////////////////////////////////////////

describe("get job by ID (GET '/jobs/:jobId')", () => {
  test("job exists", async () => {
    const response = await request(app).get("/api/jobs/1")
      .expect(200)
      .expect("Content-Type", /json/);
    expect(response.body.id).toBe(1);
    expect(response.body.title).toBe("Talent Acquisition Software Engineer");
    expect(response.body.employerId).toBe(1);
    expect(response.body.shortDescription).toBeDefined();
    expect(response.body.fullDescription).toBeDefined();
  });

  test("job does not exist", async () => {
    const response = await request(app).get("/api/jobs/10")
      .expect(404)
      .expect("Content-Type", /json/);
    expect(response.body.status).toBe(404);
    expect(response.body.message).toBe("job with given ID not found");
  });

  test("with non-integer job ID (float)", async () => {
    const response = await request(app).get("/api/jobs/4.2")
      .expect(422)
      .expect("Content-Type", /json/);
    expect(response.body.status).toBe(422);
    expect(response.body.message).toBe("required parameter jobId must be an integer");
  });

  test("with non-integer job ID (string)", async () => {
    const response = await request(app).get("/api/jobs/someString")
      .expect(422)
      .expect("Content-Type", /json/);
    expect(response.body.status).toBe(422);
    expect(response.body.message).toBe("required parameter jobId must be an integer");
  });
});

////////////////////////////////////////////////////////////////////////////////

describe("get multiple jobs (GET '/jobs')", () => {
  test("with no specified IDs", async () => {
    const response = await request(app).get("/api/jobs")
      .expect(200)
      .expect("Content-Type", /json/);
    expect(response.body.length).toBe(6);
    response.body.forEach(validateJobSchema);
  });

  test("with a single specified ID", async () => {
    const response = await request(app).get("/api/jobs?jobIds=1")
      .expect(200)
      .expect("Content-Type", /json/);
    expect(response.body.length).toBe(1);
    expect(response.body[0].id).toBe(1);
    validateJobSchema(response.body[0]);
  });

  test("with multiple specified IDs", async () => {
    const response = await request(app).get("/api/jobs?jobIds=1,2")
      .expect(200)
      .expect("Content-Type", /json/);
    expect(response.body.length).toBe(2);
    response.body.forEach(validateJobSchema);
  });

  test("with multiple specified IDs (non-CSV style)", async () => {
    const response = await request(app).get("/api/jobs?jobIds=1&jobIds=2")
      .expect(200)
      .expect("Content-Type", /json/);
    expect(response.body.length).toBe(2);
    response.body.forEach(validateJobSchema);
  });

  test("with some non-existent specified IDs", async () => {
    const response = await request(app).get("/api/jobs?jobIds=1,9")
      .expect(200)
      .expect("Content-Type", /json/);
    expect(response.body.length).toBe(1);
    validateJobSchema(response.body[0]);
  });

  test("with all non-existent specified IDs", async () => {
    const response = await request(app).get("/api/jobs?jobIds=9")
      .expect(200)
      .expect("Content-Type", /json/);
    expect(response.body.length).toBe(0);
  });

  test("with some non-integer specified IDs", async () => {
    const response = await request(app).get("/api/jobs?jobIds=1,someString")
      .expect(422)
      .expect("Content-Type", /json/);
    expect(response.body.status).toBe(422);
    expect(response.body.message).toBe("jobIds must be integers");
  });
});

////////////////////////////////////////////////////////////////////////////////

describe("search for jobs (GET '/search/jobs')", () => {
  test("by title", async () => {
    const response = await request(app).get("/api/search/jobs?title=developer")
      .expect(200)
      .expect("Content-Type", /json/);
    expect(response.body.length).toBe(2);
    response.body.forEach(validateJobSchema);
  });

  test("missing title", async () => {
    const response = await request(app).get("/api/search/jobs")
      .expect(422)
      .expect("Content-Type", /json/);
    expect(response.body.status).toBe(422);
    expect(response.body.message).toBe("'title' must be provided exactly once");
  });

  test("duplicated title", async () => {
    const response = await request(app).get("/api/search/jobs?title=developer&title=software")
      .expect(422)
      .expect("Content-Type", /json/);
    expect(response.body.status).toBe(422);
    expect(response.body.message).toBe("'title' must be provided exactly once");
  });  
})