import { NextFunction, Request, Response } from "express";
import { NOT_FOUND as NOT_FOUND_STATUS } from "http-status";
import { NODE_ENV } from "../../../config/config";
import APIError from "../../../errors/error";
import { NOT_FOUND as NOT_FOUND_Type } from "../../../errors/types/standard";
import IError from "./IError";

class ErrorMiddleware implements IError {
  public handleError = (err: APIError, req: Request, res: Response, next: NextFunction): void => {
    this.handleResponse(err, res);
  }

  public handleNotFound = (req: Request, res: Response, next: NextFunction): void => {
    const err = new APIError({
      message: "Not found",
      status: NOT_FOUND_STATUS,
      type: NOT_FOUND_Type,
    });

    this.handleResponse(err, res);
  }

  public handleResponse = (err: APIError, res: Response): void => {
    const response = new APIError(err);

    if (NODE_ENV !== "development") {
      delete response.stack;
    }

    res.status(response.status);
    res.json(response);
  }
}

export default new ErrorMiddleware();
