import { NextFunction, Request, Response } from "express";
import { NOT_FOUND as NOT_FOUND_STATUS } from "http-status";
import APIError from "../../../errors/error";
import { NOT_FOUND as NOT_FOUND_Type } from "../../../errors/types/standard";
import IError from "./IError";

class ErrorMiddleware implements IError {
  public handleError = (err: APIError, req: Request, res: Response, next: NextFunction) => {
    this.handleResponse(err, res);
  }

  public handleNotFound = (req: Request, res: Response, next: NextFunction) => {
    const err = new APIError({
      message: "Not found",
      status: NOT_FOUND_STATUS,
      type: NOT_FOUND_Type,
    });

    this.handleResponse(err, res);
  }

  public handleResponse = (err: APIError, res: Response) => {
    const apiError = new APIError(err);

    const response = {
      code: apiError.status,
      errors: apiError.errors,
      message: apiError.message,
      stack: apiError.stack,
      type: apiError.type,
    };

    /*
    if (env !== 'development') {
      delete response.stack;
    }
    */

    res.status(apiError.status);
    res.json(response);
  }
}

export default new ErrorMiddleware();
