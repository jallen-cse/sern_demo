
/**
 * A simple error thrown from our controllers that will be caught
 * by the error handler middleware.
 */
export default class HttpError extends Error {
  status: number;

  constructor(status: number, message?: string) {
    super(message);
    this.status = status;
  }
}