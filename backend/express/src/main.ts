
import express from "express";
import cors from "cors";
import morgan from "morgan";
import swagger from "swagger-ui-express";

import openapi from "./openapi";

const isProduction = process.env.NODE_ENV === "production";

const PORT = 5000;

const app = express();

// allow cross origin requests in development
if (!isProduction) {
  app.use(cors());
}

// add logging middleware
app.use(morgan(isProduction ? "tiny" : "dev"));

// serve generated swagger docs
app.use('/openapi', swagger.serve, swagger.setup(openapi));

// start server on port 5000
app.listen(PORT, () => {
  console.log(`Serving SERN Demo backend on port ${PORT}`);
});