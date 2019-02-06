import { NextFunction, Request, Response } from "express";
import APIError from "../../errors/error";

abstract class Controller {
  protected handleResponse = (promise: Promise<any>, req: Request, res: Response, next: NextFunction): void => {
    promise
      .then((result = { message: "OK" }) => res.json(result))
      .catch((error) => {
        const apiError = new APIError(error);
        if (error.name === "ValidationError") {
          apiError.status = 200;
        }
        next(apiError);
      });
  }
}

export default Controller;
