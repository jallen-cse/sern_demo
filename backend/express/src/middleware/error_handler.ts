
import { NextFunction, Request, Response } from "express";

import HttpError from "../common/http_error";

const isProduction = process.env.NODE_ENV === "production";

const REDACT_MSG = "message redacted to hide potentially sensitive information";

/**
 * Catches all errors and packs them into JSON responses.
 * @todo use standardized error format (maybe https://jsonapi.org/format/#error-objects)
 */
export default function errorHandler(
  err: HttpError | Error | undefined,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err) {
    if (err instanceof HttpError) {
      if (err.message) {
        res.status(err.status).json({ log: err.message });
      } else {
        res.sendStatus(err.status);
      }
    } else {
      const msg = isProduction ?
        REDACT_MSG :
        err.message;
      res.status(500).json({ log: msg });
    }
  }
}