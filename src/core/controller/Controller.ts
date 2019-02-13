import { NextFunction, Request, Response } from "express";
import { UNPROCESSABLE_ENTITY } from "http-status";
import APIError from "../../errors/error";
import { VALIDATION_ERROR } from "../../errors/types/standard";
import { OK } from "../../messages/standard";
abstract class Controller {
  protected handleResponse = (promise: Promise<any>, req: Request, res: Response, next: NextFunction): void => {
    promise
      .then((result = { message: OK }) => res.json(result))
      .catch((error) => {
        const apiError = this.checkError(error);
        next(apiError);
      });
  }

  private checkError = (error: APIError): APIError => {
    const apiError = new APIError(error);

    if (error.name === "ValidationError") {
      apiError.status = UNPROCESSABLE_ENTITY;
      apiError.type = VALIDATION_ERROR;
    }

    return apiError;
  }
}

export default Controller;
