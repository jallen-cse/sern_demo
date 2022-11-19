import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import querystring from "querystring"

/**
 * Express request using the simple querystring query parser rather
 * than the default qs' ParsedQs type.
 */
type QuerystringRequest = Request<ParamsDictionary, 
  any, any, querystring.ParsedUrlQuery>;

export default QuerystringRequest;