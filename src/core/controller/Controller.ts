import { NextFunction, Request, Response } from "express";

class Controller {
  protected handleResponse = (promise: Promise<any>, req: Request, res: Response, next: NextFunction): void => {
    promise
      .then((result = { message: "OK" }) => res.json(result))
      .catch((error) => res.status(500) && next(error));
  }
}

export default Controller;
