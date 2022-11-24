
import express from "express";
import cors from "cors";
import morgan from "morgan";
import swagger from "swagger-ui-express";

import openapi from "./openapi";

import jobsRouter from "./routes/jobs.routes"; 
import searchRouter from "./routes/search.routes"; 
import errorHandler from "./middleware/error_handler";

const isProduction = process.env.NODE_ENV === "production";

const app = express();

// allow cross origin requests in development
if (!isProduction) {
  app.use(cors());
}

// add logging middleware
app.use(morgan(isProduction ? "tiny" : "dev"));

// serve generated swagger docs
app.use("/openapi", swagger.serve, swagger.setup(openapi));

// add our routers
app.use("/api/jobs", jobsRouter); 
app.use("/api/search", searchRouter);

// end-of-line error handling middleware
app.use(errorHandler);

// use the simple query parser (querystring)
app.set("query parser", "simple");

export default app;