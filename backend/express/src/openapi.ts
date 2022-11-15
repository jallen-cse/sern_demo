
import swaggerJsdoc from "swagger-jsdoc";

// parses inline JSDocs to generate OpenAPI document
export default swaggerJsdoc({
  apis: ['./src/routes/*.ts'],
  failOnErrors: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Jack's Full Stack Demo",
      version: '0.0.0',
    }
  }
})