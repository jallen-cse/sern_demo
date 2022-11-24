
import swaggerJsdoc from "swagger-jsdoc";
import { employerDTOSchema } from "./models/employer.model";

import { jobDTOSchema } from "./models/job.model";

// parses inline JSDocs to generate OpenAPI document
export default swaggerJsdoc({
  apis: ['./src/routes/*.ts'],
  failOnErrors: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Jack's Full Stack Demo",
      version: '0.0.0'
    },
    components: {
      schemas: {
        Job: jobDTOSchema,
        Employer: employerDTOSchema,
        JobWithEmployer: {
          type: "object",
          properties: {
            ...jobDTOSchema.properties,
            employer: employerDTOSchema
          }
        },
        Error: {
          type: "object",
          properties: {
            status: {
              type: "integer",
              description: "The HTTP status of the error",
              required: true
            },
            message: {
              type: "string",
              description: "An indication of what went wrong",
              required: true
            }
          }
        }
      }
    }
  }
})