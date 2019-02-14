import { NextFunction, Request, Response } from "express";
import { UNPROCESSABLE_ENTITY } from "http-status";
import APIError from "../../errors/APIError";
import { VALIDATION_ERROR } from "../../errors/types/standard";
import APIResponse from "../../responses/APIResponse";
abstract class Controller {
  protected handleResponse = (promise: Promise<any>, req: Request, res: Response, next: NextFunction): void => {
    promise
      .then((result) => {
        const response = new APIResponse(result);
        res.status(response.status).json({...result, ...response});
      })
      .catch((error) => {
        const apiError = this.checkError(error);
        next(apiError);
      });
  }

  private checkError = (error: any) => {
    const apiError = new APIError(error);

    if (error.name === "ValidationError") {
      apiError.status = UNPROCESSABLE_ENTITY;
      apiError.type = VALIDATION_ERROR;
    }

    return apiError;
  }
}

export default Controller;
